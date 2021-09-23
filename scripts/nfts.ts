// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import fs from 'fs'
import { create, IPFS } from 'ipfs-core'
import https from 'https'
import axios from 'axios'

const sleep = async (ms: number) => {
  new Promise<void>((res) => {
    setTimeout(res, ms)
  })
}
async function main() {
  // Deploy NFTS
  const ipfs = await create()
  const pinToArweave = async (cid: string): Promise<string> => {
    const fetchTest = await axios.get(`https://ipfs.io/ipfs/${cid}`)
    if (fetchTest.status === 200) {
      const response = await axios.post<
        any,
        { data: { arweaveId: string; ipfsHash: string; statusCode: number } }
      >(`https://ipfs2arweave.com/permapin/${cid}`)
      const { arweaveId } = response.data
      return arweaveId
    } else {
      await sleep(5000)
      const result = await pinToArweave(cid)
      return result
    }
  }

  const uploadImage = async (fileName: string): Promise<string> => {
    const file = fs.readFileSync(fileName)
    const result = await ipfs.add(file)
    const cid = result.cid.toString()
    return cid
  }

  const uploadMetadata = async (imageCID: string): Promise<string> => {
    if (!ipfs) {
      throw 'IPFS is not connected.'
    }
    const metadata = {
      name: 'SOLNSOP',
      description: 'Sol&Sop Wedding NFT',
      image: `ipfs://${imageCID}`,
    }
    const result = await ipfs.add(JSON.stringify(metadata))
    const cid = result.cid.toString()
    fs.writeFileSync(cid, JSON.stringify(metadata))
    return cid
  }

  const filenames = Array(32)
    .fill(undefined)
    .map((_, i) => `./nfts/${i + 1}.jpg`)
  const metadata = []
  const cidsToPin = []
  for (const filename of filenames) {
    const imageCID = await uploadImage(filename)
    const metadataCID = await uploadMetadata(imageCID)
    metadata.push(metadataCID)
    cidsToPin.push(imageCID)
    // cidsToPin.push(metadataCID)
  }
  console.log('Pin metadata. ipfs2arweave is not supporting JSON pinning :(')
  for (const metadataCID of metadata) {
    await ipfs.pin.add(metadataCID)
    console.log(metadataCID)
  }
  for (const cid of cidsToPin) {
    await ipfs.pin.add(cid)
    console.log(`Pinned ${cid} @ local ipfs`)
  }
  for (const cid of cidsToPin) {
    const arweaveId = await pinToArweave(cid)
    console.log(`Pinned ${cid} @ ${arweaveId}`)
  }

  await ipfs.stop()
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

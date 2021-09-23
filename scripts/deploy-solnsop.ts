// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre from 'hardhat'

async function main() {
  // We get the contract to deploy
  const SolNSop = await hre.ethers.getContractFactory('SolNSop')
  const vows = `혼인 서약서

저희 두 사람은 부부로서 이더리움 위에 다음 내용을 약속합니다.

나 임완섭은 권솔을 아내로 맞아 오늘의 약속을 지킬 것을 약속합니다.

하나. 매일 꼭 끌어안고 사랑한다고 말하겠습니다.
둘. 아프지않고 오랫동안 옆에 있을수 있도록 꾸준히 운동하며 건강을 챙기겠습니다.
셋. 매년 결혼기념일마다 함께 여행하고 소중한 기억을 기록으로 남기겠습니다.
넷. 사는 동안 어떤 어려움이 닥치더라도 두 손 꼭잡고 함께 하겠습니다.

나 권솔은 임완섭을 남편으로 맞아 오늘의 약속을 지킬 것을 약속합니다.

하나. 매일 꼭 끌어안고 사랑한다고 말하겠습니다.
둘. 함께 나이들어 가는 우리 일상이 풍요로울 수 있게 늘 배우고 깨치겠습니다.
셋. 몸과 마음이 아프거나 힘들때 언제든 와서 쉴 곳이 될 수 있도록 노력하겠습니다. 
넷. 나의 남편, 언젠가 생길 아이의 아빠일 뿐 아니라 임완섭으로서도 살수 있게 배려하겠습니다.
`
  const verifierAddress = '0x3b702fe5D3C9FA2A1c22F6fdd8Cc28EF75c21c59'
  const solNsop = await SolNSop.deploy(
    verifierAddress, // verifier address
    vows,
    [
      'QmZWefnSHXRAecScFJXqtbizvYFkokLa9PoyyUQAFhx7MY',
      'QmRb9aane3Bh52D98LScVAwYfDUPGgAFsbNLbC9sRfGyye',
      'QmaZUJwi3oaYX3rLHUyW44UtfW7z2UYxcjztEpdAPxincZ',
      'QmetZcHAUnTCy6s3RVHLPZmuFTrt45KPHhBQk6RbCa2Sa7',
      'QmZgYZAptN8h8Q4fE1FEQW129Tv1pqLQsA2meNrthMtZGk',
      'QmVPTEoBbiUx1LM38V2CfYn3cvPcQrErgLKVtCww7ydNY1',
      'QmU7BNMoeyob496yMw7CQa1XW2ubMjJLGWNuJqN2e4XmPo',
      'QmSHrQUMS3UWsdN7V2K8MM3FEuXpGryYxHhZbjUoayEcML',
      'QmZLgsaR61hVwzpRa7z8mMVmRNGi2cf1XCitXAcTaYRBzR',
      'QmRGiCBYABxzngDy9CRKpjwanCKTgQQPWJLZDCYT3MJihS',
      'QmNnwNwWEsr15tu9JLfLmmAsgRMMBod2Ua3gAadN7QFKeY',
      'QmQzu7S1gixFB5wQigwLWJ4vxZvmM3FA9vHZVNpmUSGVnu',
      'QmRy5Zrgja1BxjxCuRnpokMwAZvQbB1Cp5LJFSnCvWba1m',
      'QmQ9XMT1PPDeocUD6njBKCNdANPBL7jsd34ssLQAXUrEbj',
      'QmRbnyx6ijNnR2FTJBJxcRwAocwYCcjYJmPuath47yk7wk',
      'QmPAoTCFLjwtQgG8jmiFe7p1uaVuRHfDXQzVbZwwVJwoHJ',
      'QmRtRFWcuEKJ6yhXeLsh4fSLeigHvqAA8x2BbynbTXTRNt',
      'QmTxBqVYDEy7rQTEXxbhmhxxn7LN3NF63ufxJJdxWc2VAw',
      'QmTqwSHEBi9jRuaZGTYkc7LCQmVh2i3jiViESztCYk3NoW',
      'QmNVAn6mfhi9YW8WodmUZnGovBxnaemRgTPpEiK8hsqLA7',
      'QmecAG17RV1TrYWiXc9M2RX9q6pSgvPr4aQF7T8augh7GF',
      'QmeBLwScCnayurwKuk4aNwQDi3FZsfzp14fPh2RWafHn8i',
      'QmeyzKziFSgwnmwDKqkuUhkcrtKK8A1Np8QNertcdbfDsj',
      'QmZ7ZUJvdsYvUTfNRQyXZcXBmFL9k6ujP4hE4KPbYdHQ7U',
      'QmbqQeoks9tUTgnGAixAqt5N1MbTc4ZyDnXxfBAa8XbgX5',
      'QmWQ9y5YB4aB68Yf9vJ9PXFyRjDuxUHZvPrehU7rDyVZUn',
      'Qmf7oCbVwVHa2jzG5QneNk7aEaTnTeAzwm5L1XPggYKf1Q',
      'QmXdRa9z21gCoksMrjn5xusTWZaSu2n8w9K1g3aPE3Le5z',
      'QmXPYeUdGZkWs9TNUdFFUPLzdytxXrs1T8Qzn1RsvyGnPB',
      'QmNvmHkcFqJbiAwvBSLEGmywgJg58aMR7tRqJky2yiAMB6',
      'QmaWetV59XT8LrJGQMQFqevsYLzCiCCNaQxwZ7NpSQAQTi',
      'QmUakn3LLwMskCGdqAoNp8S5KfGjhFFA4nWeQSVMk5d2ge',
    ]
  )
  await solNsop.deployed()
  console.log('Verifier deployed to:', verifierAddress)
  console.log('Sol&Sop deployed to:', solNsop.address)
  console.log('Deployed Vows:', await solNsop.vows())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

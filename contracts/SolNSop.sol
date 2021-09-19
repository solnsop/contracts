//SPDX-License-Identifier: Unlicense
pragma solidity >=0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {Verifier} from "./Verifier.sol";

contract SolNSop is ERC721 {
    using ECDSA for bytes32;

    Verifier public claimVerifier;

    address private _deployer;
    mapping(uint256 => string) private _uris;

    event Congrats(string message);

    constructor(address claimVerifier_) ERC721("Sol&Sop", "SNS") {
        claimVerifier = Verifier(claimVerifier_);
        _deployer = msg.sender;
    }

    receive() external payable {
        if (msg.value > 0) {
            payable(_deployer).transfer(msg.value);
        }
    }

    function mint(
        uint256 tokenId,
        uint256[2] memory a,
        uint256[2][2] memory b,
        uint256[2] memory c,
        string memory metadataURI,
        bytes memory signature,
        string memory message
    ) public payable {
        require(
            keccak256(abi.encodePacked(tokenId, metadataURI)).recover(
                signature
            ) == _deployer,
            "Not an approved metadataURI"
        );
        uint256[2] memory inputs;
        inputs[0] = tokenId;
        inputs[1] = uint256(uint160(msg.sender));
        require(
            claimVerifier.verifyProof(a, b, c, inputs),
            "SNARK proof failed"
        );
        emit Congrats(message);
        _uris[tokenId] = metadataURI;
        _mint(msg.sender, tokenId);
        if (msg.value > 0) {
            payable(_deployer).transfer(msg.value);
        }
    }

    function rescueERC20(address erc20) public {
        IERC20(erc20).transfer(
            _deployer,
            IERC20(erc20).balanceOf(address(this))
        );
    }

    function isClaimed(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return _uris[tokenId];
    }
}

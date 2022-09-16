// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Rewards is ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;


    constructor() ERC721 ("PolyReward", "PR") {}

    function getReward(address member, string memory tokenURI) public{
        uint256 newItemId = _tokenIds.current();
        _mint(member, newItemId);
        _setTokenURI(newItemId, tokenURI);

        _tokenIds.increment();
    }











}
// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "usingtellor/contracts/UsingTellor.sol";

contract Lock is ERC721URIStorage, UsingTellor{

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bytes32 public tellorID=0xe0be2083a71c8336ffb546a4f573fa0bbbfd6463288436251bbb1176f4316733;
    mapping(address=>uint) public findTokenId;
    mapping(uint=>uint) public timeLeft;
    string constant public metadataFirst="ipfs://bafkreig27raiklvq333c772ayu2trdmse7ehwgpbca4td3mvinrreeol4a";
    string constant public metadataFinal="ipfs://bafkreigdnzutrjojjtz34andgy5uvqvlvj2g3gudzcjq6od7uugxqv2kie";


    constructor() ERC721("PolyReward", "PR") UsingTellor(payable(0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A)) { 
       
    }

    function getFirstReward() external {
        require(findTokenId[msg.sender]==0,"Already has a reward" );
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataFirst);
        findTokenId[msg.sender]=newItemId;
        timeLeft[newItemId]= 3 *15+block.number;

        _tokenIds.increment();
    }

    function upGradeReaward() external{
        require(findTokenId[msg.sender]>0, "You do not have a reward");

        uint256 _token=findTokenId[msg.sender];

        (bool ifRetrive, bytes memory _value, ) = getDataBefore(tellorID, block.timestamp-5 seconds);
        if(!ifRetrive) return;
        uint256 _uintvalue=abi.decode(_value, (uint256));
        if(_uintvalue>= timeLeft[_token]){
            _setTokenURI(findTokenId[msg.sender], metadataFirst);
        }else{
            _setTokenURI(findTokenId[msg.sender], metadataFinal);
        }
    }














}
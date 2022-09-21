// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "usingtellor/contracts/UsingTellor.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@tableland/evm/contracts/ITablelandTables.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract Rewards is ERC721URIStorage, UsingTellor, ERC721Holder, Ownable{

    ITablelandTables private _tableland;
    string private _metadataTable;
    uint256 private _metadataTableId;
    string private _tablePrefix = "PolyGlot";
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    bytes32 public tellorID=0xb0e60547e9b5622ecbdc47222269ac6890bdf45de29cb7b1628af4d50fae3638;
    mapping(address=>uint) public findTokenId;
    mapping(address=>uint) public readCount;
    mapping(uint=>uint) public timeLeft;
    string constant private metadataFirst="ipfs://bafkreig27raiklvq333c772ayu2trdmse7ehwgpbca4td3mvinrreeol4a";
    string constant private metadataFinal="ipfs://bafkreigdnzutrjojjtz34andgy5uvqvlvj2g3gudzcjq6od7uugxqv2kie";
   
    string private _baseURIString = "https://testnet.tableland.network/query?s=";
		

    event Yes(uint tokenId, string message);
    event No(uint tokenId, string message);

    constructor() ERC721("PGReward", "PGR") UsingTellor(payable(0x7B8AC044ebce66aCdF14197E8De38C1Cc802dB4A)){ 

       _tableland=ITablelandTables(0x4b48841d4b32C4650E4ABc117A03FE8B51f38F68);

       _metadataTableId = _tableland.createTable(
        address(this),
        string.concat(
          "PolyGlot Reward",
		    _tablePrefix,
			"_",
          Strings.toString(block.chainid),
          " (id int, member address, n_doc_read int);"
        )
      );

       _metadataTable = string.concat(
        _tablePrefix,
		"_",
        Strings.toString(block.chainid),
        "_",
        Strings.toString(_metadataTableId)
      );
    }

    function getFirstReward() external {
        require(findTokenId[msg.sender]==0,"Already has a reward" );
        
         _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, metadataFirst);
        findTokenId[msg.sender]=newItemId;
        timeLeft[newItemId]= 3 *15+block.number;
        readCount[msg.sender]=1;
        _tableland.runSQL(
        address(this),
        _metadataTableId,
        string.concat(
            "INSERT INTO ",
            _metadataTable,
            " (id, member, n_doc_read) VALUES (",
            Strings.toString(newItemId),
            ", ",
           Strings.toHexString(uint256(uint160(msg.sender)), 20),
            ", ",
            Strings.toString(readCount[msg.sender]),
            ")"
        )
        );
    }

    function upGradeReaward() external{
        require(findTokenId[msg.sender]>0, "You do not have a reward");

        uint tokenId=findTokenId[msg.sender];
        uint x=readCount[msg.sender]++;
        _tableland.runSQL(
        address(this),
        _metadataTableId,
        string.concat(
        "UPDATE ",
        _metadataTable,
        " SET n_doc_read = ",
        Strings.toString(x),
        " WHERE id = ",
        Strings.toString(tokenId),
        ";"
        )
        );
    }

    function getFinalReaward() external{
        require(findTokenId[msg.sender]>0, "You do not have a reward");

        uint256 _token=findTokenId[msg.sender];

        (bool ifRetrive, bytes memory _value, ) = getDataBefore(tellorID, block.timestamp-5 seconds);
        if(!ifRetrive) return;
        uint256 _uintvalue=abi.decode(_value, (uint256));
        if(_uintvalue>= timeLeft[_token]){
            _setTokenURI(_token, metadataFinal);
            emit Yes(_token, "it updated");
        }else{
            emit No(_token, "no update");
        }
       
    }
        













}
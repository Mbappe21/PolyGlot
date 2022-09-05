// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MainContract{

    address payable owner;
    
    mapping(address=>bool) public isValidator;
    mapping(address=>bool) public isTranslator;
    mapping(address=>bool) public isMember;

    struct Validator{
        address payable validator;
        uint validatorId;
        uint language;
        uint nOfValations;
    }

    struct Translator{
        address payable translator;
        uint translatorId;
        uint language;
        uint nOfTranslations;
    }

    struct Member{
        address member;
        uint language;
    }

    struct Request{
        uint requestId;
        address payable client;
        address payable translator;
        uint amount;
        address currency;
        uint language;
        bool completed;

    }

    


    constructor() payable{
        owner=payable(msg.sender);
    }



    function becomeValidator() external{

    }

    function becomeTranslator() external{

    }

    function becomeMember() external{

    }

    function requestTranslation() public{

    }

    function approveTranslator() public{

    }

    function verifyTranslation() public onlyValidator{

    }

    function challengeTranslation() public{

    }

    function payRequest() public{

    }

    function getReward() internal{

    }

    function checkRole() public view returns(bool){

    }

    function checkNotation() public view returns(bool){

    }

    function deposit() external payable onlyOwner{}

    function withdraw(uint amount) public onlyOwner{
        require(amount<address(this).balance, "Not enough ETH");

        (bool success, )= owner.call{value: amount}("");
        require(success, "Failed to withdraw ETH" );
    }

    modifier onlyOwner() {
        require (msg.sender == owner, "You are not the Owner");
        _;
    }

    modifier onlyValidator() {
        require(isValidator[msg.sender]==true, "You are not a Validator");
        _;
    }

    modifier onlyTranslator() {
        require(isValidator[msg.sender]==true, "You are not a Translator");
        _;
    }

    modifier onlyMember(){
        require(isMember[msg.sender]==true, "You are not a Member");
        _;
    }









}
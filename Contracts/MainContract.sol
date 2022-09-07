// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MainContract{

    address payable owner;
    address payable temporaryAddress;
    address [] nullAddress;
    string matic="";
    string usdt="";
    string [] currencies=[matic, usdt];
    uint [] languages=[1,2,3];
    uint nOfValidators;
    uint nOfTranslators;
    uint nOfMembers;
    uint nOfRequests;
    
    mapping(address=>bool) public isValidator;
    mapping(address=>bool) public isTranslator;
    mapping(address=>bool) public isMember;
    mapping(uint=>Request) public findRequest;
    mapping(uint=>bool) public isClient;
    mapping(address=> mapping(uint=>bool)) public isFluent;
    mapping(address=> mapping(uint=>bool)) public hasValidated;
    mapping(address=>Translator) public findTranslator;
    mapping(address=>Validator) public findValidator;


    struct Validator{
        address payable validator;
        uint validatorId;
        uint [] language;
        uint nOfValidations;
    }

    struct Translator{
        address payable translator;
        uint translatorId;
        uint [] language;
        uint nOfTranslations;
    }

    struct Member{
        address member;
        uint [] language;
    }

    struct Request{
        uint requestId;
        address payable client;
        address payable translator;
        uint timeFrame;
        uint amount;
        string currency;
        uint docLang;
        uint langNeeded;
        address [] pendingTranslators;
        address [] validatorApprovals;
        bool completed;

    }

    constructor() payable{
        owner=payable(msg.sender);
    }
 

    function addLanguage() external onlyOwner{
        languages.push(languages.length);
    }

    function addValidator(address payable addr, uint[] calldata lang) external onlyOwner{
        nOfValidators+=1;
        Validator memory newValidator;
        newValidator= Validator(addr, nOfValidators, lang, 0);
        isValidator[addr]=true;
        findValidator[addr]=newValidator;

        for (uint i; i<lang.length; i++){
            isFluent[addr][lang[i]]=true;
        }
    }

    function addTranslator(address payable addr, uint[] calldata lang) external onlyValidator{
        nOfTranslators+=1;
        Translator memory newTranslator;
        newTranslator= Translator(addr, nOfTranslators, lang, 0);
        isTranslator[addr]=true;
        findTranslator[addr]=newTranslator;

        for (uint i; i<lang.length; i++){
            isFluent[addr][lang[i]]=true;
        }
    }

    function addMember(address payable addr, uint[] calldata lang) external{
        nOfMembers+=1;
        Member memory newMember;
        newMember=Member(addr,lang);
        isMember[addr]=true;
    }

    function requestTranslation(uint amount, uint timeFrame, uint currencyPlace, uint doclang, uint langNeeded) public payable{
        
        string memory currency=currencies[currencyPlace];
        nOfRequests+=1;
        address payable client=payable(msg.sender);
        //IERC20 TRANSFER

        Request memory newRequest;
        newRequest=Request(nOfRequests, client, temporaryAddress, timeFrame, amount, currency, doclang, langNeeded, nullAddress, nullAddress, false);
        findRequest[nOfRequests]=newRequest;
        isClient[nOfRequests]=true;
    }
    mapping(address=>bool) isPendingTranslator;

    function proposeTranslation(uint requestId) public onlyTranslator{
        require(isFluent[msg.sender][findRequest[requestId].docLang]==true);
        require(isFluent[msg.sender][findRequest[requestId].langNeeded]==true);

        findRequest[requestId].pendingTranslators.push(msg.sender);
    }

    function approveTranslator(uint requestId, uint chosenTranslator) public{
        require(isClient[requestId]==true, "This is not your request");

        findRequest[requestId].translator= payable(findRequest[requestId].pendingTranslators[chosenTranslator]);
    }

    function submitTranslation() public onlyTranslator{
        //Potentially  Event checker
    }

    function verifyTranslation(uint requestId) public onlyValidator{
        require(isFluent[msg.sender][findRequest[requestId].docLang]==true);
        require(isFluent[msg.sender][findRequest[requestId].langNeeded]==true);
        require(hasValidated[msg.sender][requestId]==false );

        hasValidated[msg.sender][requestId]=true;
        findRequest[requestId].validatorApprovals.push(msg.sender);

        if(findRequest[requestId].validatorApprovals.length>2){
            payRequest(requestId);
        }


    }

    function challengeTranslation(uint requestId) public{
        
    }

    function payRequest(uint requestId) private{
        
        //IERC20 TRANSFER

        address payable validatedTranslator=findRequest[requestId].translator;
        findTranslator[validatedTranslator].nOfTranslations+=1;

        for (uint i=0; i<findRequest[requestId].validatorApprovals.length; i++){
            findValidator[findRequest[requestId].validatorApprovals[i]].nOfValidations+=1;
        }

    }

    function getReward() internal{

    }

    function checkRole() public view returns(bool){

    }

    function checkNotation() public view returns(bool){

    }

    function addFluency() public{

    }

    function deposit() external payable onlyOwner{}

    function withdraw(uint amount) public payable onlyOwner{
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
// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

contract MainContract{

    address payable owner;
    address payable temporaryAddress;
    address [] nullAddress;
    string matic="";
    string usdt="";
    string [] currencies;
    uint [] languages=[1,2,3];
    uint nOfValidators;
    uint nOfTranslators;
    uint nOfMembers;
    uint nOfRequests;
    uint rewardFee=2500000000000000;
    uint timeToValidate=11520; //48 hours
    
    mapping(address=>bool) public isValidator;
    mapping(address=>bool) public isTranslator;
    mapping(address=>bool) public isMember;
    mapping(uint=>Request) public findRequest;
    mapping(uint=>bool) public isClient;
    mapping(address=> mapping(uint=>bool)) public isFluent;
    mapping(address=> mapping(uint=>bool)) public hasValidated;
    mapping(address=> mapping(uint=>bool)) public hasDenied;
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
        address payable [] validatorApprovals;
        address payable [] validatorDenials;
        uint stage;

    }

    constructor() payable{
        owner=payable(msg.sender);
    }
 
    //function addCurency() public{}

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

    function becomeMember(address payable addr, uint[] calldata lang) external payable{
        require(msg.value>7000000000000000, "You must deposit 0.007ETH");

        nOfMembers+=1;
        Member memory newMember;
        newMember=Member(addr,lang);
        isMember[addr]=true;
    }

    function requestTranslation( uint chosenTime, uint currencyPlace, uint doclang, uint langNeeded) public payable{
        require(msg.value>7000000000000000, "You must deposit at least 0.007ETH");

        uint amount=msg.value;
        string memory currency=currencies[currencyPlace];
        nOfRequests+=1;
        address payable client=payable(msg.sender);
        //IERC20 TRANSFER

        Request memory newRequest;
        newRequest=Request(nOfRequests, client, temporaryAddress, chosenTime+block.timestamp, amount, currency, doclang, langNeeded, nullAddress, nullAddress, nullAddress, 0);
        findRequest[nOfRequests]=newRequest;
        isClient[nOfRequests]=true;
    }

    function proposeTranslation(uint requestId) public onlyTranslator onlyFluent(requestId) cannotGoBack(requestId){

        findRequest[requestId].pendingTranslators.push(msg.sender);
        findRequest[requestId].stage=1;
    }

    function approveTranslator(uint requestId, uint chosenTranslator) public cannotGoBack(requestId){
        require(isClient[requestId]==true, "This is not your request");

        findRequest[requestId].translator= payable(findRequest[requestId].pendingTranslators[chosenTranslator]);
        findRequest[requestId].stage=2;
    }

    function submitTranslation(uint requestId) public payable onlyTranslator cannotGoBack(requestId){
        //Potentially  Event checker
        require(findRequest[requestId].translator==msg.sender, "This is not your request");
        findRequest[requestId].stage=3;
        findRequest[requestId].timeFrame+=timeToValidate;

        if(findRequest[requestId].timeFrame - block.timestamp<0){
            findRequest[requestId].stage=5;
            rejectTranslation(requestId);
        }
    }

    function verifyTranslation(uint requestId) public onlyValidator onlyFluent(requestId) onlyNewValidator(requestId) cannotGoBack(requestId){
        hasValidated[msg.sender][requestId]=true;
        findRequest[requestId].validatorApprovals.push(msg.sender);

        if(findRequest[requestId].validatorApprovals.length>2){
            findRequest[requestId].stage=4;
            payRequest(requestId);
        }

    }

    function denyTranslation(uint requestId) public onlyValidator onlyFluent(requestId) onlyNewValidator(requestId) cannotGoBack(requestId){
        hasDenied[msg.sender][requestId]=true;
        findRequest[requestId].validatorDenials.push(msg.sender);

        if(findRequest[requestId].validatorDenials.length>1 ||findRequest[requestId].timeFrame - block.timestamp<0){
            findRequest[requestId].stage=5;
            rejectTranslation(requestId);
        }
    }

    function challengeTranslation(uint requestId) public {
        require(isClient[requestId]=true, "You are not the client of this request");
        require(findRequest[requestId].timeFrame-block.timestamp>0);
        findRequest[requestId].stage=3;

    }

    function rejectTranslation(uint requestId) public payable cannotGoBack(requestId){
         require(findRequest[requestId].stage==5);
         
        uint amount=findRequest[requestId].amount;
        (bool sent, ) = findRequest[requestId].client.call{value:amount}("");
        require(sent, "Failed to send back ETH");

        if(findRequest[requestId].validatorDenials.length>1){
            address payable aValidator=findRequest[requestId].validatorDenials[0];
            address payable bValidator=findRequest[requestId].validatorDenials[1];

        (bool sent1, ) = aValidator.call{value:rewardFee}("");
        (bool sent2, ) = bValidator.call{value:rewardFee}("");
        require(sent1, "Failed to send ETH to 1st Validator");
        require(sent2, "Failed to send ETH to 2nd Validator");     
        } 
    }

    function payRequest(uint requestId) public payable cannotGoBack(requestId){
        require(findRequest[requestId].stage==4);
        //IERC20 TRANSFER

        address payable validatedTranslator=findRequest[requestId].translator;
        findTranslator[validatedTranslator].nOfTranslations+=1;

        for (uint i=0; i<findRequest[requestId].validatorApprovals.length; i++){
            address payable approvedValidator=findRequest[requestId].validatorApprovals[i];

            findValidator[approvedValidator].nOfValidations+=1;
            approvedValidator.call{value:rewardFee}("");
        }
    }

    function getReward() internal{

    }

    function checkRole() public view returns(bool){

    }

    function checkNotation() public view returns(bool){

    }

    function addFluency(uint id, uint lang) public{

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

    modifier onlyFluent(uint requestId){
        require(isFluent[msg.sender][findRequest[requestId].docLang]==true);
        require(isFluent[msg.sender][findRequest[requestId].langNeeded]==true);
        _;

    }

    modifier onlyNewValidator(uint requestId){
        require(hasValidated[msg.sender][requestId]==false );
        require(hasDenied[msg.sender][requestId]==false );
        _;
    }

    modifier cannotGoBack(uint requestId){
        require(findRequest[requestId].stage>=findRequest[requestId].stage, "This function can no longer be used" );
        _;
    }









}
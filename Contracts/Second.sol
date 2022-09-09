// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Second{

    address payable owner;
    string [] currencies=["MATIC", "USDT"];
    uint [] languages=[1,2,3];
    uint nOfValidators;
    uint nOfTranslators;
    uint nOfMembers;
    uint nOfRequests;
    uint rewardFee=2500000000000000;
    uint timeToValidate=40; //10 MIN
    
    mapping(address=>bool) public isValidator;
    mapping(address=>bool) public isTranslator;
    mapping(address=>bool) public isMember;
    mapping(uint=>bool) public isClient;
    mapping(address=> mapping(uint=>bool)) public isFluent;
    mapping(address=> mapping(uint=>bool)) public hasValidated;
    mapping(address=> mapping(uint=>bool)) public hasDenied;
    mapping(address=>Translator) public findTranslator;
    mapping(address=>Validator) public findValidator;
    mapping(address=>Member) public findMember;
    mapping(uint=>Request) public findRequest;
    mapping(uint => address payable []) public hasVRequest;
    mapping(uint => address payable []) public hasDRequest;
    mapping(uint =>address []) public allPendingTranslators;
    
    struct Validator{
        address payable validator;
        uint validatorId;
        uint nOfSpokenlanguages;
        uint nOfRequests;
        uint nOfChallenges;
    }

    struct Translator{
        address payable translator;
        uint translatorId;
        uint nOfSpokenlanguages;
        uint nOfTranslations;
        uint nOfApprovals;
        uint nOfDenials;
    }

    struct Member{
        address payable member;
        uint memberId;
        uint nOfSpokenlanguages;
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
        uint pendingTranslators;
        uint nOfApprovals;
        uint nOfDenials;
        bool challenged;
        uint stage;

    }

        event NewLanguage(uint idLanguage, string language);
        event NewValidator(uint validatorId, uint spokenlanguage1, uint spokenlanguage2);
        event NewTranslator(uint translatorId, uint spokenlanguage1, uint spokenlanguage2);
        event NewMember(uint memberId, uint spokenlanguage1, uint spokenlanguage2);
        event NewTranslation(uint requestId, uint docLang, uint langNeeded);
        event NewPendingTranslator(uint requestId, address indexed pendTrans);
        event TranslatorApproved(uint requestId, address indexed translator);
        event TranslationSubmitted(uint requestId, uint docLang, uint langNeeded);
        event ValidatorVoted(uint requestId, uint nOfApprovals, uint nOfDenials);
        event TranslationValidated(uint requestId);
        event TranslationDenied(uint requestId);
        event TranslationChallenged(uint requestId);
        event RequestClosed(uint requestId);

    constructor() payable{
        owner=payable(msg.sender);
    }
 
    //function addCurency() public{}

    function addLanguage(string memory language) external onlyOwner{
        languages.push(languages.length);
        emit NewLanguage(languages.length, language) ;
    }

    function addValidator(address payable addr, uint spokenlanguage1, uint spokenlanguage2) external onlyOwner{
        require(isValidator[addr]==false);
        nOfValidators+=1;
        Validator memory newValidator;
        newValidator= Validator(addr, nOfValidators, 2, 0, 0);
        isValidator[addr]=true;
        findValidator[addr]=newValidator;

            isFluent[addr][spokenlanguage1]=true;
            isFluent[addr][spokenlanguage2]=true;
        emit NewValidator(nOfValidators, spokenlanguage1, spokenlanguage2);
    }

    function addTranslator(address payable addr, uint spokenlanguage1, uint spokenlanguage2) external onlyValidator{
        require(isTranslator[addr]==false);
        nOfTranslators+=1;
        Translator memory newTranslator;
        newTranslator= Translator(addr, nOfTranslators, 2, 0, 0, 0);
        isTranslator[addr]=true;
        findTranslator[addr]=newTranslator;

        isFluent[addr][spokenlanguage1]=true;
        isFluent[addr][spokenlanguage2]=true;
       
        emit NewTranslator(nOfTranslators, spokenlanguage1, spokenlanguage2);
    }

    function becomeMember(address payable addr, uint spokenlanguage1, uint spokenlanguage2) external payable{
        require(isMember[addr]==false);
        require(msg.value==7000000000000000, "You must deposit 0.007ETH");

        nOfMembers+=1;
        Member memory newMember;
        newMember=Member(addr, nOfMembers, 2);
        isMember[addr]=true;
        isFluent[addr][spokenlanguage1]=true;
        isFluent[addr][spokenlanguage2]=true;
        findMember[addr]=newMember;

        emit NewMember(nOfMembers, spokenlanguage1, spokenlanguage2);
    }

    function requestTranslation( uint timeFrame, uint currencyPlace, uint doclang, uint langNeeded) public payable{
        require(msg.value>7000000000000000, "You must deposit at least 0.007ETH");

        string memory currency=currencies[currencyPlace];
        nOfRequests+=1;
        address payable client=payable(msg.sender);
        address payable temporaryAddress;

        //IERC20 TRANSFER

        Request memory newRequest;
        newRequest=Request(nOfRequests, client, temporaryAddress, timeFrame, msg.value, currency, doclang, langNeeded, 0, 0, 0,false, 0);
        findRequest[nOfRequests]=newRequest;
        isClient[nOfRequests]=true;
        emit NewTranslation(nOfRequests, findRequest[nOfRequests].docLang, findRequest[nOfRequests].langNeeded);
    }

    function proposeTranslation(uint requestId) public onlyTranslator onlyFluent(requestId) {
        require(findRequest[requestId].stage==0, "This function is not available");
        allPendingTranslators[requestId].push(msg.sender);
        findRequest[requestId].stage=1;
        findRequest[requestId].pendingTranslators+=1;
        emit NewPendingTranslator(requestId, msg.sender);
    }

    function approveTranslator(uint requestId, uint chosenTranslatorPosition) public {
        require(isClient[requestId]==true, "This is not your request");
        require(findRequest[requestId].stage==1, "This function is not available");
        findRequest[requestId].translator= payable(allPendingTranslators[requestId][chosenTranslatorPosition]);
        findRequest[requestId].stage=2;
        findRequest[requestId].timeFrame+=block.timestamp;
        emit TranslatorApproved(requestId, findRequest[requestId].translator);
    }

    function submitTranslation(uint requestId) public payable onlyTranslator {
        //Potentially  Event checker
        require(findRequest[requestId].translator==msg.sender, "This is not your request");
        require(findRequest[requestId].stage==2, "This function is not available");
        findRequest[requestId].stage=3;
        findRequest[requestId].timeFrame+=timeToValidate;

        if(findRequest[requestId].timeFrame - block.timestamp<0){
            findRequest[requestId].stage=5;
            rejectTranslation(requestId);
        }else{
            emit TranslationSubmitted(requestId, findRequest[requestId].docLang, findRequest[requestId].langNeeded);
        }
    }

    function verifyTranslation(uint requestId) public onlyValidator onlyFluent(requestId) onlyNewValidator(requestId) {
        require(findRequest[requestId].stage==3, "This function is not available");
        require(findRequest[requestId].translator!=msg.sender, "The translator cannot validate his own work");
        if(findRequest[requestId].timeFrame - block.timestamp<0){
            findRequest[requestId].stage=5;
            rejectTranslation(requestId);
        }
        hasValidated[msg.sender][requestId]=true;
        hasVRequest[requestId].push(payable(msg.sender));
        findTranslator[findRequest[requestId].translator].nOfApprovals+=1;
       
        emit ValidatorVoted(requestId, findRequest[requestId].nOfApprovals, findRequest[requestId].nOfDenials);

        if(findRequest[requestId].nOfApprovals>1){
            findRequest[requestId].stage=4;
            findRequest[requestId].timeFrame+=20; // 5 mins
            emit TranslationValidated(requestId);
            
        }

    }

    function denyTranslation(uint requestId) public onlyValidator onlyFluent(requestId) onlyNewValidator(requestId) {
        require(findRequest[requestId].stage==3, "This function is not available");
        hasDenied[msg.sender][requestId]=true;
        hasDRequest[requestId].push(payable(msg.sender));
        findTranslator[findRequest[requestId].translator].nOfDenials+=1;

        if(findRequest[requestId].nOfDenials>0 ||findRequest[requestId].timeFrame - block.timestamp<0){
            findRequest[requestId].stage=5;
            rejectTranslation(requestId);
        }else{
            emit ValidatorVoted(requestId, findRequest[requestId].nOfApprovals, findRequest[requestId].nOfDenials);
        }

    }

    function challengeTranslation(uint requestId) public {
        require(isClient[requestId]=true, "You are not the client of this request");
        require(findRequest[requestId].timeFrame-block.timestamp>0, "Sorry, you can no longer challenge the request");
        require(findRequest[requestId].stage ==4, "This function is not available");
        require(findRequest[requestId].challenged=false, "This Request was already challenged");

        findRequest[requestId].challenged=true;
        findRequest[requestId].timeFrame=block.timestamp+timeToValidate;
        findRequest[requestId].stage=3;
        if(findRequest[requestId].nOfApprovals>0){
            uint nOfApprovers=findRequest[requestId].nOfApprovals;
            for(uint i=0; i<nOfApprovers; i++){
                findValidator[hasVRequest[requestId][i]].nOfChallenges+=1;
            }
        }
        emit TranslationChallenged(requestId);
    }

    function rejectTranslation(uint requestId) public payable {
         require(findRequest[requestId].stage==5);
         
        uint amount=findRequest[requestId].amount;
        (bool sent, ) = findRequest[requestId].client.call{value:amount}("");
        require(sent, "Failed to send back ETH");

        if(findRequest[requestId].nOfDenials>0){
            for(uint i=0; i<findRequest[requestId].nOfDenials; i++){
            address payable aValidator;
            aValidator=hasDRequest[requestId][i];
            findValidator[aValidator].nOfRequests+=1;
            (bool sent1, ) = aValidator.call{value:rewardFee}("");
            require(sent1, "Failed to send ETH to Validator");  
            }
        }
        emit TranslationDenied(requestId);
        emit RequestClosed(requestId);
    }

    function payRequest(uint requestId) public payable {
        require(findRequest[requestId].stage==4, "This function is not available");
        require(findRequest[requestId].timeFrame-block.timestamp<0, "The pay is not yet available");

        findRequest[requestId].stage=6;
        //IERC20 TRANSFER

        address payable validatedTranslator=findRequest[requestId].translator;
        findTranslator[validatedTranslator].nOfTranslations+=1;
        (bool sent1, ) =validatedTranslator.call{value:rewardFee}("");
        require(sent1, "Failed to pay Translator");
       
        for(uint i=0; i<findRequest[requestId].nOfApprovals; i++){
            address payable aValidator;
            aValidator=hasVRequest[requestId][i];
            findValidator[aValidator].nOfRequests+=1;
            (bool sent, ) =aValidator.call{value:rewardFee}("");
            require(sent, "Failed to send back ETH");
        }
        emit RequestClosed(requestId);
    }

    // function getReward() internal{}

    // function checkRole() public view returns(bool){}

    // function checkNotation() public view returns(bool){}

    function addFluency(address addr, uint languageId) public onlyOwner{
        require(isValidator[addr]==true||isTranslator[addr]==true||isMember[addr]==true, "No role");
        require(isFluent[addr][languageId]==false, "Already fluent");

        isFluent[addr][languageId]=true;
        if(isValidator[addr]==true){
            findValidator[addr].nOfSpokenlanguages+=1;
        }else if(isTranslator[addr]==true){
            findTranslator[addr].nOfSpokenlanguages+=1;
        }else if(isMember[addr]==true){
            findMember[addr].nOfSpokenlanguages+=1;
        }
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
}
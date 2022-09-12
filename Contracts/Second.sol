// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Fourteen{

    address payable owner;
    address nullAddress;
    uint nOfValidators;
    uint nOfTranslators;
    uint nOfMembers;
    uint nOfRequests; 
    uint nOfPendingTranslators;
    uint voteId;

    mapping(address=>Translator) public findTranslator;
    mapping(address=> PendingTranslator) findPendingTranslator;
    mapping(address=>Member) public findMember;
    mapping(uint=>Request) public findRequest;
    mapping(address=>mapping(uint=>bool)) hasWorked;
    mapping(address=>mapping(uint=>bool)) hasApproved;
    mapping(address=>mapping(uint=>bool)) hasDenied;
    mapping(address=>mapping(uint=>bool)) hasCollected;
    mapping(uint=>Vote)findVote;


    struct Translator{
        address translator;
        uint translatorId;
        bool english;
        bool french;
        bool lingala;
        uint nOfRequests;
        bool validator;
    }

    struct PendingTranslator{
        address translator;
        uint pendingTranslatorId;
        bool english;
        bool french;
        bool lingala;
        uint nOfRequests;
        uint approvals;
        uint denials;
    }

    struct Vote{
        uint voteId;
        Translator translator;
        uint yes;
        uint no;
    }

    struct Member{
        address member;
        uint memberId;
        bool english;
        bool french;
        bool lingala;
    }

    struct Request{
        uint requestId;
        uint amount;
        string description;
        address client;
        address translator;
        bool english;
        bool french;
        bool lingala;
        bool accepted;
        uint approvals;
        uint denials;
        uint stage;
    }

        event NewTranslationRequest(Request request);
        event TranslatorAcceptedRequest(Request request);
        event TranslationSubmitted(Request request);
        event TranslationApproved(Request request);
        event TranslationDenied(Request request);
        event RequestClosed(Request request);
        event NewPendingTranslator(PendingTranslator translator);
        event NewTranslator(Translator translator);
        event NewApplicationForValidator(Translator translator);

    constructor() payable{
        owner=payable(msg.sender);
    }


    function applyForTranslatorRole(bool english, bool french, bool lingala) external returns(uint){
        require(findPendingTranslator[msg.sender].pendingTranslatorId==0);
        nOfPendingTranslators+=1;
        PendingTranslator memory newPendingtranslator;
        newPendingtranslator= PendingTranslator(msg.sender, nOfPendingTranslators, english, french, lingala, 0,0,0);
        findPendingTranslator[msg.sender]=newPendingtranslator;
        emit NewPendingTranslator(newPendingtranslator);

        return nOfPendingTranslators;
    }

    function voteTranslator(address pendingTrans, bool vote) external onlyValidator{
        require(findPendingTranslator[pendingTrans].nOfRequests>2, "Translator doesn't have enough Requests");
        require(findTranslator[pendingTrans].translatorId==0, "Role already granted");
        
        if(vote==true){
             findPendingTranslator[pendingTrans].approvals+=1;
            if(findPendingTranslator[pendingTrans].approvals>2){
                addTranslator(pendingTrans);
            }
        }else{
            findPendingTranslator[pendingTrans].denials+=1;
        }
    }

    function addTranslator(address addr) private {
        PendingTranslator memory pendingTranslator=findPendingTranslator[addr];

        nOfTranslators+=1;
        Translator memory newTranslator;
        newTranslator=Translator(addr, nOfTranslators, pendingTranslator.english, pendingTranslator.french, pendingTranslator.lingala, 0, false);
        findTranslator[addr]=newTranslator;
        emit NewTranslator(newTranslator);
    }

    function applyForValidatorRole() external onlyTranslator returns(uint){
        require(findTranslator[msg.sender].validator==false, "Role already granted");
        require(findTranslator[msg.sender].nOfRequests>4, "You don't have enough Requests");

        voteId++;
        Vote memory newVote;
        newVote=Vote(voteId,findTranslator[msg.sender], 0, 0);
        emit NewApplicationForValidator(findTranslator[msg.sender]);
        return voteId;
    }

    function voteValidator(address translator, uint _voteId, bool vote) external onlyValidator{
        require(findTranslator[translator].translatorId==0, "Role already granted");
        
        if(vote==true){
            findVote[_voteId].yes++;
            if(findVote[_voteId].yes >2){
                addValidator(translator);
            }
        }else{
            findVote[_voteId].no++;
        }
    }

    function addValidator(address translator) private{
        findTranslator[translator].validator=true;
    }

    function becomeMember(address addr, bool english, bool french, bool lingala) external payable{
        require(findMember[addr].memberId==0, "Role already granted");
        require(msg.value==7000000000000000, "You must deposit 0.007ETH");
        nOfMembers+=1;
        Member memory newMember;
        newMember=Member(addr, nOfMembers, english, french, lingala);
        findMember[addr]=newMember;
    }


    function requestTranslation(string calldata description, bool english, bool french, bool lingala) external payable{
        require(msg.value>7000000000000000, "You must deposit at least 0.007ETH");

        nOfRequests+=1;
        Request memory newRequest;

        newRequest=Request(nOfRequests, msg.value, description, msg.sender,nullAddress, english, french, lingala, false, 0, 0, 1);
        findRequest[nOfRequests]=newRequest;

        emit NewTranslationRequest(newRequest);
    }

    function giveTestTranslation(address pendingTrans, string calldata description, bool english, bool french, bool lingala) external onlyValidator{
        require(findMember[pendingTrans].memberId>0, "Not a pending Translator");
        nOfRequests+=1;
        Request memory newTest;

        newTest=Request(nOfRequests, 0, description, nullAddress, pendingTrans, english, french, lingala, true, 0, 0, 2);
        findRequest[nOfRequests]=newTest;
    }

    function acceptTranslation(uint requestId) external onlyTranslator{
        findRequest[requestId].accepted=true;
        findRequest[requestId].translator=msg.sender;
        findRequest[requestId].stage=2;
         emit TranslatorAcceptedRequest(findRequest[requestId]);
    }

    function submitTranslation(uint requestId) external {
        require(findRequest[requestId].translator==msg.sender, "This is not your request");
        require(findRequest[requestId].stage==2, "This function is not available");
 
            findRequest[requestId].stage=3;
            emit TranslationSubmitted(findRequest[requestId]);
    }

    function ApproveTranslation(uint requestId) external onlyValidator {
        require(findRequest[requestId].stage==3, "This function is not available");
        
            hasApproved[msg.sender][requestId]=true;
            findRequest[requestId].approvals+=1;
            emit TranslationApproved(findRequest[requestId]);
        
            if(findRequest[requestId].approvals>1){ //Chaneg for test
                findRequest[requestId].stage=4;
                emit RequestClosed(findRequest[requestId]);
            }
    }

    function denyTranslation(uint requestId) external onlyValidator {
        require(findRequest[requestId].stage==3, "This function is not available");

        hasDenied[msg.sender][requestId]=true;
        findRequest[requestId].denials+=1;
       emit TranslationDenied(findRequest[requestId]);
    
        if(findRequest[requestId].denials>1){ //Chaneg for test
            findRequest[requestId].stage=5;
            emit RequestClosed(findRequest[requestId]);
        }
    }

    function recollectFunds(uint requestId) external hasNotCollected(requestId){
        require(findRequest[requestId].stage==5, "This function is not available");
        require(findRequest[requestId].client==msg.sender,"This is not your Request");

        hasCollected[msg.sender][requestId]=true ;
        uint amount=findRequest[requestId].amount;
        (bool sent, ) = payable(msg.sender).call{value:amount}("");
        require(sent, "Failed to send back ETH");
        
        emit RequestClosed(findRequest[requestId]);
    }

    function collectRequest(uint requestId) external hasNotCollected(requestId){
        require(findRequest[requestId].stage==4, "This function is not available");

        hasCollected[msg.sender][requestId]=true;
        findPendingTranslator[findRequest[requestId].translator].nOfRequests+=1;
    }

    function getPaidAfterApproval (uint requestId) external hasNotCollected(requestId){
        require(findRequest[requestId].stage==4, "This function is not available");
        require(hasApproved[msg.sender][requestId]==true, "You have not validated this request" );

        hasCollected[msg.sender][requestId]=true ;
        address payable validator=payable(msg.sender);
        (bool sent1, ) =validator.call{value:2500000000000000}("");
        require(sent1, "Failed to pay validating Validator");
    }

    function getPaidAfterDenial (uint requestId)external hasNotCollected(requestId){
        require(findRequest[requestId].stage==5, "This function is not available");
        require(hasDenied[msg.sender][requestId]==true, "You have not denied this request" );

        hasCollected[msg.sender][requestId]=true ;
        address payable validator=payable(msg.sender);
        (bool sent1, ) =validator.call{value:2500000000000000}("");
        require(sent1, "Failed to pay validating Validator");
    }

    function getPaidTranslator(uint requestId) external hasNotCollected(requestId) onlyTranslator{
        require(findRequest[requestId].stage==4, "This function is not available");
        require(findRequest[requestId].translator==msg.sender, "You have not worked on this request");

        hasCollected[msg.sender][requestId]=true ;
        (bool sent3, )=payable(msg.sender).call{value:2500000000000000}("");
        require(sent3, "Failed to pat translator");
    }

    function deposit() external payable onlyOwner{}

    function withdraw(uint amount) external onlyOwner{
        require(amount<address(this).balance, "Not enough ETH");

        (bool success2, )= owner.call{value: amount}("");
        require(success2, "Failed to withdraw ETH" );
    }
  
    function changeRequest(
        uint requestId,
        uint denials,
        uint approvals,
        uint _stage) external{
        findRequest[requestId].requestId=requestId;
        findRequest[requestId].stage=_stage;
        findRequest[requestId].client=msg.sender;
        findRequest[requestId].translator=msg.sender;
        findRequest[requestId].amount=3000000;
        findRequest[requestId].english=true;
        findRequest[requestId].french=true;
        findRequest[requestId].lingala=true;
        findRequest[requestId].approvals=approvals;
        findRequest[requestId].denials=denials;
    }

    function changeRole(uint id, uint n, bool validator) public returns(string memory){
        findTranslator[msg.sender].translator=msg.sender;
        findTranslator[msg.sender].translatorId=id;
        findTranslator[msg.sender].nOfRequests=n;
        findTranslator[msg.sender].validator=validator;
        return "Well done mate";
    }


    function changePendingRole(uint id, uint yes, uint no) public returns (string memory){
        findVote[voteId].voteId=id;
        findVote[voteId].yes=yes;
        findVote[voteId].no=no;
        findVote[voteId].translator=findTranslator[msg.sender];
        return "Good luck mate";
    }

    modifier onlyOwner() {
        require (msg.sender == owner, "You are not the Owner");
        _;
    }

    modifier onlyValidator() {
        require(findTranslator[msg.sender].validator==true, "You are not a Validator");
        _;
    }

    modifier onlyTranslator() {
        require(findTranslator[msg.sender].translatorId>0, "You are not a Translator");
        _;
    }

    modifier hasNotCollected(uint requestId){
        require(hasCollected[msg.sender][requestId]==false, "You have already used this function");
     _;
    }

}
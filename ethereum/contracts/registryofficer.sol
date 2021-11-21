pragma solidity ^0.4.19;

contract RegistryofficerManager 
{
    uint public registryofficercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public registryofficermanagermap;
    address public storeaddress;
    //this array stores the list of address of registryofficers
    address [] public  registryofficeraddress;
    
    function registerregistryofficer 
    (
        string  firstname ,
        string  lastname ,
        uint phone ,
        address eth, 
        string govtid
    ) 
    public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     Registryofficer newofficer = new Registryofficer(firstname,lastname,phone,eth,govtid);
     registryofficeraddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newofficer);
     registryofficermanagermap[msg.sender]=storeaddress;
     registryofficercount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        
        //require(eth == msg.sender);
        
        return registryofficermanagermap[eth];
    }
}

contract Registryofficer {
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    string public govid;
    string public firstname;
    string public lastname;
   
    
    function Registryofficer
    (
        string  firnam, 
        string lasnam, 
        uint phone,
        address eth, 
        string govtid) public
    {
        phonenum=phone;
        id= eth;
        firstname= firnam;
        lastname= lasnam;
        govid=govtid;
        
    }
    
    function showdetails() public view returns
    (
        string ,string ,uint,address,string
        
    )
    {
        return(firstname,lastname,phonenum,id,govid);
    }
    
     struct Requestdetails {
        address buyerid;
        address sellerid;
        uint landid;
        address lawyerid;
        address registryofficerid;
        address blroid;
        string registryofficerstatus;
        string blrostatus;
        uint buyerposition;
        uint sellerposition;
        uint lawyerposition;
        uint ispending;
    }
    
     Requestdetails [] public requests;
     string [] public deed_hash;
    
    uint public requestcount=0;
    
     function createrequest
    (
        address buyid,
        address sellid,
        uint lanid,
        address lawid,
        address officerid,
        uint buyerpos,
        uint sellerpos,
        uint lawyerpos,
        string _deed_hash
    ) 
    public 
    {
        Requestdetails memory newrequest =  Requestdetails({
           buyerid: buyid,
           sellerid: sellid,
           landid: lanid,
           lawyerid: lawid,
           registryofficerstatus: "Pending",
           blrostatus: "Nil",
           registryofficerid: officerid,
           blroid: 0x0000000000000000000000000000000000000000,
           buyerposition: buyerpos,
           sellerposition: sellerpos,
           lawyerposition: lawyerpos,
           ispending: 1
           } );
           requestcount++;
           deed_hash.push(_deed_hash);
           requests.push(newrequest);
    }
    
    
    function changestatusbyblro
    (
        address lawid,
        address officerid,
        address blroid,
        uint position,
        string newstatus
    )
    public
    {
        //require(position < requestcount);
        
        // require(lawid == requests[position].lawyerid);
        
        //require(requests[position].registryofficerid == officerid)
        
        //require(requests[position].blroid == blroid)
        
        //require(msg.sender == blroid);
        
        requests[position].blrostatus = newstatus;
    }
    
    
    function approve
    (
        address officerid,
        uint position
    )
    public 
    {
        requests[position].ispending=0;
        requests[position].registryofficerstatus="Approved";
        requests[position].blroid=officerid;
        requests[position].blrostatus="Pending";
        
    }
    
    function reject
    (
        uint position
    )
    public
    {
        requests[position].ispending=0;
        requests[position].registryofficerstatus="Rejected";
    }
    
}
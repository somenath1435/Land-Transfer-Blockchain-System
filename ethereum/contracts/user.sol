pragma solidity ^0.4.19;

contract UserManager {
    
    uint public usercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address) public usermanagermap;
    address public storeaddress;
    
    function registeruser (
        string  firstname ,
        string  lastname ,
        uint phone ,
        uint aadhar,
        address eth, 
        uint bank) 
        public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     User newuser = new User(firstname,lastname,phone,aadhar,eth,bank);
     checker[msg.sender]=true;
     storeaddress=address(newuser);
     usermanagermap[msg.sender]=storeaddress;
     usercount++;
    }
    
    function getstoreaddress (address eth) public view returns (address){
        
        //require(eth == msg.sender);
        
        return usermanagermap[eth];
    }
    
    
}

contract User {
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    uint public aadharnum;
    uint public banknum;
    string public firstname;
    string public lastname;
   
    
    function User
    (
        string  firnam, 
        string lasnam, 
        uint phone, 
        uint aadhar,
        address eth, 
        uint bank) public
    {
        phonenum=phone;
        aadharnum= aadhar;
        banknum= bank;
        id= eth;
        firstname= firnam;
        lastname= lasnam;
        
        
    }
    
    function showdetails() public view returns
    (
        string ,string ,uint,uint ,address,uint
    )
    {
        return(firstname,lastname,phonenum,aadharnum,id,banknum);
    }
    
    //See this struct properly 
    
    struct Requestdetails {
        address buyerid;
        address sellerid;
        uint landid;
        address lawyerid;
        address registryofficerid;
        address blroid;
        string lawyerstatus;
        string registryofficerstatus;
        string blrostatus;
    }
    
    Requestdetails [] public requests;
    
    uint public requestcount=0;
    
    function createrequest
    (
        address buyid,
        address sellid,
        uint lanid,
        address lawid
    ) 
    public 
    {
        Requestdetails memory newrequest =  Requestdetails({
           buyerid: buyid,
           sellerid: sellid,
           landid: lanid,
           lawyerid: lawid,
           lawyerstatus: "Pending",
           registryofficerstatus:"Nil",
           blrostatus: "Nil",
           registryofficerid: 0x0000000000000000000000000000000000000000,
           blroid: 0x0000000000000000000000000000000000000000
           } );
           requestcount++;
           
           requests.push(newrequest);
    }
    
    function changestatusbylawyer
    (
        address lawid,
        uint position,
        string newstatus,
        address registryoffid
    )
    public
    {
        //require(position < requestcount);
        
        // require(lawid == requests[position].lawyerid);
        
        //require(msg.sender == lawid);
        requests[position].lawyerstatus = newstatus;
        requests[position].registryofficerid = registryoffid;
        requests[position].registryofficerstatus="Pending";
    }
    
    
    function changestatusbyregistryofficer
    (
        address lawyer,
        address officerid,
        uint position,
        string newstatus,
        address blroid
    )
    public
    {
        //require(position < requestcount);
        
        // require(lawid == requests[position].lawyerid);
        
        //require(requests[position].registryofficerid == officerid)
        
         //require(msg.sender == officerid);
         
        requests[position].registryofficerstatus = newstatus;
        requests[position].blroid = blroid;
        requests[position].blrostatus="Pending";
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
}
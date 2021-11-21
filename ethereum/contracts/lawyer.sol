pragma solidity ^0.4.19;

contract LawyerManager 
{
    uint public lawyercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public lawyermanagermap;
    address public storeaddress;
    //this array stores the list of address of lawyers
    address [] public  lawyeraddress;
    function registerlawyer 
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
     
     Lawyer newlawyer = new Lawyer(firstname,lastname,phone,eth,govtid);
     lawyeraddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newlawyer);
     lawyermanagermap[msg.sender]=storeaddress;
     lawyercount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        
        //require(eth == msg.sender);
        
        return lawyermanagermap[eth];
    }
    
}

contract Lawyer 
{
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    string public govid;
    string public firstname;
    string public lastname;
   
    
    function Lawyer
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
        string lawyerstatus;
        string registryofficerstatus;
        string blrostatus;
        uint buyerposition;
        uint sellerposition;
        uint ispending;
    }
    
    Requestdetails [] public requests;
    string [] deed_hash;
    uint public requestcount=0;
    
     function createrequest
    (
        address buyid,
        address sellid,
        uint lanid,
        address lawid,
        uint buyerpos,
        uint sellerpos
    ) 
    public 
    {
        Requestdetails memory newrequest =  Requestdetails({
           buyerid: buyid,
           sellerid: sellid,
           landid: lanid,
           lawyerid: lawid,
           lawyerstatus: "Pending",
           registryofficerstatus: "Nil",
           blrostatus: "Nil",
           registryofficerid: 0x0000000000000000000000000000000000000000,
           blroid: 0x0000000000000000000000000000000000000000,
           buyerposition: buyerpos,
           sellerposition: sellerpos,
           ispending: 1
           } );
           requestcount++;
           
           requests.push(newrequest);
           deed_hash.push("Not Applicable");
    }
    
     function approvebyregistryofficer
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
    
     function rejectbyregistryofficer
    (
        address lawyer,
        address officerid,
        uint position,
        string newstatus
    )
    public
    {
        //require(position < requestcount);
        
        // require(lawid == requests[position].lawyerid);
        
        //require(requests[position].registryofficerid == officerid)
        
        //require(msg.sender == officerid);
        
        requests[position].registryofficerstatus = newstatus;

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
        uint position,
        string _deed_hash
    )
    public 
    {
        requests[position].ispending=0;
        requests[position].lawyerstatus="Approved";
        requests[position].registryofficerid=officerid;
        requests[position].registryofficerstatus="Pending";
        deed_hash[position] = _deed_hash;
    }
    
    function reject
    (
        uint position
    )
    public
    {
        requests[position].ispending=0;
        requests[position].lawyerstatus="Rejected";
    }
    
}
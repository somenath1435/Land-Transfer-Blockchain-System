pragma solidity ^0.4.19;

contract LawyerManager {
    
    uint public lawyercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public lawyermanagermap;
    address public storeaddress;
    //this array stores the list of address of lawyers
    address [] public  lawyeraddress;
    function registerlawyer (
        string  firstname ,
        string  lastname ,
        uint phone ,
        address eth, 
        string govtid) 
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
    
    function getstoreaddress (address eth) public view returns (address){
        
        //require(eth == msg.sender);
        
        return lawyermanagermap[eth];
    }
    
    
}

contract Lawyer {
    
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
        string registryofficerstatus;
        string blrostatus;
        
        uint buyerposition;
        uint sellerposition;
        bool ispending;
    }
    
     Requestdetails [] requests;
    
    uint public requestcount=0;
    
     function createrequest
    (
        address buyid,
        address sellid,
        uint lanid,
        address lawid,
        
        uint buyerposition,
        uint sellerposition
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
           registryofficerid: buyid,
           blroid: buyid,
           buyerposition: buyerposition,
           sellerposition: sellerposition,
           ispending: false
           
           
           } );
           requestcount++;
           
           //requests.push(newrequest);
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
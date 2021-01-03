pragma solidity ^0.4.19;

contract UserManager {
    
    uint public usercount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public usermanagermap;
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
        aadhar= aadharnum;
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
}
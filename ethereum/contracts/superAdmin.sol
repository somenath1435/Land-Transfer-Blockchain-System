pragma solidity >=0.4.17 <0.9.0;

contract Super_AdminManager 
{
    uint public Super_Admincount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public Super_Adminmanagermap;
    address public storeaddress;
    //this array stores the list of address of blro
    address [] public  Super_Adminaddress;
    
    function register_Super_Admin 
    (
        string  firstname ,
        string  lastname ,
        uint phone ,
        address eth, 
        string govtid,
        string govt_organisation,
        string govt_position
    ) 
    public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     Super_Admin newofficer = new Super_Admin(firstname,lastname,phone,eth,govtid,govt_organisation,govt_position);
     Super_Adminaddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newofficer);
     Super_Adminmanagermap[msg.sender]=storeaddress;
     Super_Admincount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        //require(eth == msg.sender);
        
        return Super_Adminmanagermap[eth];
    }       
}

contract Super_Admin
{
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    string public govid;
    string public firstname;
    string public lastname;
    string public govt_organisation;
    string public govt_position;
    
    function Super_Admin
    (
        string  firnam, 
        string lasnam, 
        uint phone,
        address eth, 
        string govtid,
        string _govt_organisation,
        string _govt_position
    ) 
    public
    {
        phonenum=phone;
        id= eth;
        firstname= firnam;
        lastname= lasnam;
        govid=govtid;
        govt_organisation = _govt_organisation;
        govt_position = _govt_position;
        
    }
    
    function showdetails() public view returns
    (
        string ,string ,uint,address,string,string,string
        
    )
    {
        return(firstname,lastname,phonenum,id,govid,govt_organisation,govt_position);
    }
    
}
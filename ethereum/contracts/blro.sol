pragma solidity ^0.4.19;

contract BlroManager {
    
    uint public blrocount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public blromanagermap;
    address public storeaddress;
    //this array stores the list of address of blro
    address [] public  blroaddress;
    
    function registerblroofficer (
        string  firstname ,
        string  lastname ,
        uint phone ,
        address eth, 
        string govtid) 
        public  
    {
     require(eth == msg.sender);
     require(!checker[msg.sender]);
     
     Blro newofficer = new Blro(firstname,lastname,phone,eth,govtid);
     blroaddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newofficer);
     blromanagermap[msg.sender]=storeaddress;
     blrocount++;
    }
    
    function getstoreaddress (address eth) public view returns (address){
        
        //require(eth == msg.sender);
        
        return blromanagermap[eth];
    }
    
    uint public landcount=0;
    struct Land {
        uint landid;
        string state;
        string city;
        uint pincode;
        address ownerid;
        uint price;
        string khaatanumber;
        uint areaofland;
        string landmark;
        address registeredbyblro;
    }
    
    address [][100] public ownerlist;
    uint [] public ownerlistsize;
    Land [] public lands;
    //This array stores the status of the land that it is sellable or not
    // 0 means not sellable 1 means sellable
    uint [] public is_sellable;
    
    function registerland 
    (
        string state1,
        string city1,
        uint pincode1,
        address ownerid1,
        uint price1,
        string khaatanumber1,
        uint areaofland1,
        string landmark1,
        address registeredbyblro1
    )
    public
    {
        Land memory newland = Land ({
           landid: landcount,
           state: state1,
           city: city1,
           pincode: pincode1,
           ownerid: ownerid1,
           price: price1,
           khaatanumber: khaatanumber1,
           areaofland: areaofland1,
           landmark: landmark1,
           registeredbyblro: registeredbyblro1
           
        
        }) ;
        
        lands.push(newland);
        ownerlist[landcount].push(ownerid1);
        ownerlistsize.push(1);
        landcount++;
        is_sellable.push(0);
        
        
    }
    
    function showwoners (uint landid) public view returns (address [] memory)
    {
        address [] storage owners;
        uint siz=ownerlistsize[landid];
        for(uint i=0; i<siz; i++)
        {
            owners.push(ownerlist[landid][i]);
        }
        return owners;
    }
    
    function transferland
    (
        uint landid,
        address buyerid
    )
    public
    {
        lands[landid].ownerid=buyerid;
        ownerlist[landid].push(buyerid);
        ownerlistsize[landid]++;
    }
    //This function to change status of a particular land
    function change_status_land(uint landid) public
    {
        is_sellable[landid]=1-is_sellable[landid];
    }
    
    
}

contract Blro {
    
    //This is the unique id for each user 
    address  public id ;
    uint public phonenum;
    string public govid;
    string public firstname;
    string public lastname;
   
    
    function Blro
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
        string blrostatus;
        uint buyerposition;
        uint sellerposition;
        uint lawyerposition;
        uint registryofficerposition;
        uint ispending;
    }
    
     Requestdetails [] public requests;
    
    uint public requestcount=0;
    
     function createrequest
    (
        address buyid,
        address sellid,
        uint lanid,
        address lawid,
        address officerid,
        address blrid,
        uint buyerpos,
        uint sellerpos,
        uint lawyerpos,
        uint registryofficerpos
    ) 
    public 
    {
        Requestdetails memory newrequest =  Requestdetails({
           buyerid: buyid,
           sellerid: sellid,
           landid: lanid,
           lawyerid: lawid,
           blrostatus: "Pending",
           registryofficerid: officerid,
           blroid: blrid,
           buyerposition: buyerpos,
           sellerposition: sellerpos,
           lawyerposition: lawyerpos,
           registryofficerposition: registryofficerpos,
           ispending: 1
           } );
           requestcount++;
           
           requests.push(newrequest);
    }
    
    function approve
    (
        uint position
    )
    public 
    {
        requests[position].ispending=0;
        requests[position].blrostatus="Approved";
        
        //Land transfer will happen here
        
    }
    
    function reject
    (
        uint position
    )
    public
    {
        requests[position].ispending=0;
        requests[position].blrostatus="Rejected";
    }
    
   
    
}
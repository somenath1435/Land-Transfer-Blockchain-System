pragma solidity >=0.4.17 <0.9.0;

contract BlroManager 
{
    uint public blrocount=0;
    mapping (address  => bool) public checker;
    mapping (address => address)public blromanagermap;
    address public storeaddress;
    //this array stores the list of address of blro
    address [] public  blroaddress;
    
    function registerblroofficer 
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
     
     Blro newofficer = new Blro(firstname,lastname,phone,eth,govtid);
     blroaddress.push(eth);
     checker[msg.sender]=true;
     storeaddress=address(newofficer);
     blromanagermap[msg.sender]=storeaddress;
     blrocount++;
    }
    
    function getstoreaddress (address eth) public view returns (address)
    {
        //require(eth == msg.sender);
        
        return blromanagermap[eth];
    }
    
    uint public landcount=0;
    //Array to differentiate between active and non active lands
    uint [] public is_active;
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
    
    struct Land_Details {
        string latitude;
        string longitude;
        bool is_disputed;
        string last_transaction_date;
        string type_of_land;
    }
    
    
    address [][100] public ownerlist;
    uint [] public ownerlistsize;
    Land [] public lands;
    Land_Details [] public lands_details;
    
    //This array stores the status of the land that it is sellable or not
    // 0 means not sellable 1 means sellable
    uint [] public is_sellable;
    string [] public north;
    string [] public south;
    string [] public east;
    string [] public west;
    string [] public registration_hash;
    uint [] public parent_land;
    
    function registerland 
    (
        string _state,
        string _city,
        uint _pincode,
        address _ownerid,
        uint _price,
        string _khaatanumber,
        uint _areaofland,
        string _landmark,
        address _registeredbyblro,
        string _registration_hash
       
    )
    public
    {
        Land memory newland = Land ({
           landid: landcount,
           state: _state,
           city: _city,
           pincode: _pincode,
           ownerid: _ownerid,
           price: _price,
           khaatanumber: _khaatanumber,
           areaofland: _areaofland,
           landmark: _landmark,
           registeredbyblro: _registeredbyblro
        
        }) ;
        parent_land.push(landcount);
        lands.push(newland);
        ownerlist[landcount].push(_ownerid);
        ownerlistsize.push(1);
        landcount++;
        is_sellable.push(0);
        is_active.push(1);
        registration_hash.push(_registration_hash);
    }
    
    function register_partial_land 
    (
        string _state,
        string _city,
        uint _pincode,
        address _ownerid,
        uint _price,
        string _khaatanumber,
        uint _areaofland,
        string _landmark,
        address _registeredbyblro,
        uint parent_land_id
       
    )
    public
    {
        Land memory newland = Land ({
           landid: landcount*10000,
           state: _state,
           city: _city,
           pincode: _pincode,
           ownerid: _ownerid,
           price: _price,
           khaatanumber: _khaatanumber,
           areaofland: _areaofland,
           landmark: _landmark,
           registeredbyblro: _registeredbyblro
        
        }) ;
        
        lands.push(newland);
        ownerlist[landcount].push(_ownerid);
        ownerlistsize.push(1);
        landcount++;
        is_sellable.push(0);
        parent_land.push(parent_land_id);
        is_active.push(0);
        registration_hash.push("0x000000000000000");
    }

    function register_land_details
    (
        string _latitude,
        string _longitude,
        string _east_neighbour,
        string _west_neighbour,
        string _north_neighbour,
        string _south_neighbour,
        bool _is_disputed,
        string _last_transaction_date,
        string _type_of_land
    )
    public 
    {
        Land_Details memory newland = Land_Details ({
        latitude: _latitude,
        longitude: _longitude,
        is_disputed: _is_disputed,
        last_transaction_date: _last_transaction_date,
        type_of_land: _type_of_land
        
        }) ;
        lands_details.push(newland);
        north.push(_north_neighbour);
        south.push(_south_neighbour);
        east.push(_east_neighbour);
        west.push(_west_neighbour);
    }
    
    function showwoners (uint landid) public view returns (address [] memory)
    {
        return ownerlist[landid];
    }
    
    function transferland
    (
        uint _landid,
        address buyerid,
        string _present_date,
        uint current_price
    )
    public
    {
        lands[_landid].ownerid=buyerid;
        lands[_landid].price = current_price;
        ownerlist[_landid].push(buyerid);
        lands_details[_landid].last_transaction_date = _present_date;
        ownerlistsize[_landid]++;
        is_sellable[_landid]=0;
        
        //Case when partial land is being transfeered
        if(lands[_landid].landid != _landid)
        {
            is_active[_landid]=1;
            lands[_landid].landid= _landid;
            lands[_landid].registeredbyblro = msg.sender;
        }
        lands[_landid].landid= _landid;
    }
    //This function to change status of a particular land
    function change_status_land(uint landid) public
    {
        is_sellable[landid]=1-is_sellable[landid];
    }
        
}

contract Blro 
{
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
     string [] public deed_hash;
    
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
        uint registryofficerpos,
        string _deed_hash
    ) 
    public 
    {
        Requestdetails memory newrequest =  Requestdetails
        ({
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
         });
           requestcount++;
           deed_hash.push(_deed_hash);
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
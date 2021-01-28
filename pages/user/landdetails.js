import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class LandDetails extends Component {
  state = {
    states: "",
    city: "",
    pincode: "",
    ownerid: "",
    price: "",
    khaatanumber: "",
    areaofland: "",
    landmark: "",
    landid: "",
    isSellable: "",
    blroid: "",
    errorMessage: "",
    isLoading: false
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try{
      const land = await factory.methods.lands(this.props.id).call();
      const issellable=  await factory.methods.is_sellable(this.props.id).call();
      console.log(land);
      console.log(issellable);

      this.setState({
        landid:land[0],
        states:land[1],
        city:land[2],
        pincode:land[3],
        ownerid:land[4],
        price:land[5],
        khaatanumber:land[6],
        areaofland:land[7],
        landmark:land[8],
        blroid:land[9],
        isSellable:issellable
      });
    }catch(err){
      console.log(err);
      this.setState({errorMessage:err.message});
    }
  }

  renderDetails() {
    //replace data here
    const items = [
      {
        header: "Land ID",
        description: this.state.landid,
      },
      {
        header: "State",
        description: this.state.states,
      },
      {
        header: "City",
        description: this.state.city,
      },
      {
        header: "Pincode",
        description: this.state.pincode,
      },
      {
        header: "Owner ID",
        description: this.state.ownerid,
      },
      {
        header: "Price",
        description: this.state.price,
      },
      {
        header: "Khaata Number",
        description: this.state.khaatanumber,
      },
      {
        header: "Area of Land",
        description: this.state.areaofland,
      },
      {
        header: "Landmark",
        description: this.state.landmark,
      },
      {
        header: "Registered by BLRO ID",
        description: this.state.blroid,
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  OnClicked = async (e)=>{
    e.preventDefault();
    try{
      this.setState({isLoading:true});
      const accounts = await web3.eth.getAccounts();

      await factory.methods.change_status_land(this.props.id).send({from:accounts[0]});
      Router.pushRoute(`/user/${this.props.address}`);
    }catch(err){
      console.log(err);
      this.setState({errorMessage:err.message});
    }
    this.setState({isLoading:false});
  };

  render() {
    const isOwner = (this.state.ownerid===this.props.address);
    return (
      <Layout>
        <div>
          <h1>Land Details will be shown here!</h1>

          {this.renderDetails()}

          {this.state.errorMessage && (
          <Message error header="Oops!" content={this.state.errorMessage} />
          )}

          <br/><br/>
          <Link route={`/user/${this.props.address}/alllands/${this.props.id}/landowners`}>
            <a>
            <Button content="See Owner History" primary />
            </a>
          </Link>

          {isOwner && this.state.isSellable==="0" && (
            <Button primary onClick={this.OnClicked} loading={this.state.isLoading}>
              Make Land Sellable
            </Button>
          )}

          {isOwner && this.state.isSellable==="1" && (
            <Button primary onClick={this.OnClicked} loading={this.state.isLoading}>
              Make Land Non-Sellable
            </Button>
          )}  

          <br/><br/>
        </div>
      </Layout>
    );
  }
}

export default LandDetails;

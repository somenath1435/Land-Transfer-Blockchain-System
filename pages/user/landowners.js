import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class LandOwners extends Component {
  state = {
    data:[],
    count: 0,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try{
      let arr=[];
      const size=await factory.methods.ownerlistsize(this.props.id).call();
      this.setState({count:size});
      const ownerlist= await factory.methods.showwoners(this.props.id).call();
      console.log(ownerlist);
      for(let i=0;i<ownerlist.length;i++)
      {
        if(ownerlist[i]!=="0x0000000000000000000000000000000000000000")
          arr.push(ownerlist[i]);
      }
      this.setState({data:arr});
    }catch(err){
      console.log(err);
      this.setState({errorMessage:err.message});
    }
  }

  renderDetails() {
    const items= this.state.data.map((addr,index)=>{
      return {header: addr};
    })

    return <Card.Group items={items} itemsPerRow="1" />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>Land Owners will be shown here!</h1>
          <h3>{this.state.count} Owners found for this land</h3>

          {this.renderDetails()}

          {this.state.errorMessage && (
          <Message error header="Oops!" content={this.state.errorMessage} />
          )}

          <br/><br/>
        </div>
      </Layout>
    );
  }
}

export default LandOwners;

import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

class HomePage extends Component {

  /*static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
     await factory.methods.registeruser(
       "som","asd",123,1234,"0x2Ebc36ec812349B37ae073d2Bc5E256773A436A2",1234)
       .send({
         from: accounts[2]
       }
     );
    //console.log(campaigns);
    
    return {  };
  }*/


  /*async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    console.log("123454");
     await factory.methods.registeruser(
       "som","asd",123,1234,"0xBE558BAB78ca948cBCf99523Ec4154635a09A56F",1234)
       .send({
         from: accounts[0]
       }
     );
     const cnt = await factory.methods.usercount().call();
     console.log(cnt);

     const cnt1 = await factory.methods.getstoreaddress(accounts[0]).call();
     console.log(cnt1);
    return {};
  }*/

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/page1">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          <h1>Some data will be updated here</h1>
          {this.props.campaigns}
        </div>
      </Layout>
      
    );
  }
}

export default HomePage;

import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import LandRows from "../../components/LandRows";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class MyLands extends Component {
  state = {
    mylandcount: 0,
    lands: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount(){
    try{
      const count = await factory.methods.landcount().call();
      let arr=[];
      let myland=0;
      for(let i=0;i<count;i++)
      {
        const land= await factory.methods.lands(i).call();
        if(land[4]===this.props.address)
        {
          land.pindex=i;
          arr.push(land);
          myland++;
        }
      }
      this.setState({lands:arr,mylandcount:myland});
    }catch(err){
      console.log(err);
    }
  }

  renderRows() {

    return this.state.lands.map((land, index) => {
      return (
        <LandRows
          key={index}
          id={land.pindex}
          landid={land[0]}
          states={land[1]}
          city={land[2]}
          area={land[7]}
          address={this.props.address}
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1>All Lands will be shown here!</h1>
          <h2>
            Total {this.state.mylandcount} Lands found for user {this.props.address}
          </h2>

          <Table>
            <Header>
              <Row>
                <HeaderCell>Land ID</HeaderCell>
                <HeaderCell>State</HeaderCell>
                <HeaderCell>City</HeaderCell>
                <HeaderCell>Area</HeaderCell>
                <HeaderCell>Details</HeaderCell>
              </Row>
            </Header>
            <Body>{this.renderRows()}</Body>
          </Table>

        </div>
      </Layout>
    );
  }
}

export default MyLands;

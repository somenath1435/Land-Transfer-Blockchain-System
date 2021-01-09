import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import LandRows from "../../components/LandRows";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class AllLands extends Component {
  state = {
    landcount: 0,
    lands: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount(){
    try{
      const count = await factory.methods.landcount().call();
      this.setState({landcount:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const land= await factory.methods.lands(i).call();
        arr.push(land);
      }
      this.setState({lands:arr});
    }catch(err){
      console.log(err);
    }
  }

  renderRows() {

    return this.state.lands.map((land, index) => {
      return (
        <LandRows
          key={index}
          id={index}
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
            Total {this.state.landcount} Lands found
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

export default AllLands;
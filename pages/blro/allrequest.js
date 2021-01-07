import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import Blro from '../../ethereum/blroinstance';
import factory from "../../ethereum/factory_blro";

class AllRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount(){
    try{
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const blro= Blro(addr);
      const count = await blro.methods.requestcount().call();
      this.setState({requestcount:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const req= await blro.methods.requests(i).call();
        arr.push(req);
      }
      this.setState({requests:arr});
    }catch(err){
      console.log(err);
    }
  }

  renderRows() {

    return this.state.requests.map((req, index) => {
      return (
        <RequestRows
          key={index}
          id={index}
          buyerid={req[0]}
          sellerid={req[1]}
          landid={req[2]}
          address={this.props.address}
          caller="blro"
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1>All requests will be shown here!</h1>
          <h1>
            {this.state.requestcount} Requests found for BLRO {" "}
            {this.props.address}
          </h1>

          <Table>
            <Header>
              <Row>
                <HeaderCell>Request ID</HeaderCell>
                <HeaderCell>Buyer ID</HeaderCell>
                <HeaderCell>Seller Id</HeaderCell>
                <HeaderCell>Land ID</HeaderCell>
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

export default AllRequest;

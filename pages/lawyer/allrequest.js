import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import Lawyer from '../../ethereum/lawyerinstance';
import factory from "../../ethereum/factory_lawyer";

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
      const lawyer= Lawyer(addr);
      const count = await lawyer.methods.requestcount().call();
      this.setState({requestcount:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const req= await lawyer.methods.requests(i).call();
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
          caller="lawyer"
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
            {this.state.requestcount} Requests found for Lawyer{" "}
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

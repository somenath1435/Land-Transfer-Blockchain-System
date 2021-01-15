import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import RegOff from '../../ethereum/registryofficerinstance';
import factory from "../../ethereum/factory_registryofficer";

class PendingRequest extends Component {
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
      const regoff= RegOff(addr);
      const count = await regoff.methods.requestcount().call();
      let arr=[]
      let pendingcount=0;
      for(let i=0;i<count;i++)
      {
        let req= await regoff.methods.requests(i).call();
        req.pindex=i;
        console.log(req);
        const ispending = req[11];
        if(ispending === "1")
        {
          arr.push(req);
          pendingcount++;
        } 
      }
      this.setState({requests:arr,requestcount:pendingcount});
    }catch(err){
      console.log(err);
    }
  }

  renderRows() {

    return this.state.requests.reverse().map((req, index) => {
      return (
        <RequestRows
          key={index}
          id={req.pindex}
          buyerid={req[0]}
          sellerid={req[1]}
          landid={req[2]}
          address={this.props.address}
          caller="regoff"
        />
      );
    });
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1>All pending requests will be shown here!</h1>
          <h2>
            {this.state.requestcount} Pending Requests found for Registry Officer{" "}
            {this.props.address}
          </h2>

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

export default PendingRequest;

import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import Lawyer from '../../ethereum/lawyerinstance';
import factory from "../../ethereum/factory_lawyer";

class RequestDetails extends Component {
  state = {
    buyerid: "",
    sellerid: "",
    landid: "",
    lawyerid: "",
    regoffid: "",
    blroid: "",
    lawyerstatus: "",
    regoffstatus: "",
    blrostatus: "",
    buyerposition: 0,
    sellerposition: 0,
    ispending: 1
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try{
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const lawyer= Lawyer(addr);
      const req = await lawyer.methods.requests(this.props.id).call();
      console.log(req);

      this.setState({buyerid:req[0],sellerid:req[1],landid:req[2],lawyerid:req[3],regoffid:req[4],blroid:req[5],lawyerstatus:req[6],regoffstatus:req[7],blrostatus:req[8],buyerposition:req[9],sellerposition:req[10],ispending:req[11]});
    }catch(err){
      console.log(err);
    }
  }

  renderDetails() {
    //replace data here
    const items = [
      {
        header: "Buyer ID",
        description: this.state.buyerid,
      },
      {
        header: "Seller ID",
        description: this.state.sellerid,
      },
      {
        header: "Land ID",
        description: this.state.landid,
      },
      {
        header: "Lawyer ID",
        description: this.state.lawyerid,
      },
      {
        header: "Registry Officer ID",
        description: this.state.regoffid,
      },
      {
        header: "BLRO ID",
        description: this.state.blroid,
      },
      {
        header: "Lawyer Status",
        description: this.state.lawyerstatus,
      },
      {
        header: "Registry Officer Status",
        description: this.state.regoffstatus,
      },
      {
        header: "BLRO Status",
        description: this.state.blrostatus,
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  onApprove = async () => {
    console.log("Approved");
  };

  onReject = async ()=>{
    console.log("Rejected");
  };

  render() {
    const isDisabled = (this.state.ispending)===0;
    return (
      <Layout>
        <div>
          <h1>Request Details will be shown here!</h1>

          {this.renderDetails()}

          <br/><br/>

          <Button positive onClick={this.onApprove} disabled={isDisabled}>
            Approve Request
          </Button>

          <Button negative onClick={this.onReject} disabled={isDisabled}>
            Reject Request
          </Button>

        </div>
      </Layout>
    );
  }
}

export default RequestDetails;

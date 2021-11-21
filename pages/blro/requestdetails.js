import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import Lawyer from "../../ethereum/lawyerinstance";
import lawyerfactory from "../../ethereum/factory_lawyer";
import RegOff from "../../ethereum/registryofficerinstance";
import regofffactory from "../../ethereum/factory_registryofficer";
import User from "../../ethereum/userinstance";
import userfactory from "../../ethereum/factory_user";
import Blro from "../../ethereum/blroinstance";
import blrofactory from "../../ethereum/factory_blro";
import CheckOwner from "../../components/checkowner";

class RequestDetails extends Component {
  state = {
    buyerid: "",
    sellerid: "",
    landid: "",
    lawyerid: "",
    regoffid: "",
    blroid: "",
    blrostatus: "",
    buyerposition: 0,
    sellerposition: 0,
    lawyerposition: 0,
    registryofficerposition: 0,
    ispending: 1,
    rejectloading: false,
    approveloading: false,
    errorMessage: "",
    url: "",
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try {
      const addr = await blrofactory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const blro = Blro(addr);
      const req = await blro.methods.requests(this.props.id).call();
      const url = await blro.methods.deed_hash(this.props.id).call();
      console.log(req);

      this.setState({
        buyerid: req[0],
        sellerid: req[1],
        landid: req[2],
        lawyerid: req[3],
        regoffid: req[4],
        blroid: req[5],
        blrostatus: req[6],
        buyerposition: req[7],
        sellerposition: req[8],
        lawyerposition: req[9],
        registryofficerposition: req[10],
        ispending: req[11],
        url: url,
      });
    } catch (err) {
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
        header: "BLRO Status",
        description: this.state.blrostatus,
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  getCostIndex = async (year) => {
    const y = parseInt(year);
    switch (y) {
      case 2001:
        return 100;
      case 2002:
        return 105;
      case 2003:
        return 109;
      case 2004:
        return 113;
      case 2005:
        return 117;
      case 2006:
        return 122;
      case 2007:
        return 129;
      case 2008:
        return 137;
      case 2009:
        return 148;
      case 2010:
        return 167;
      case 2011:
        return 184;
      case 2012:
        return 200;
      case 2013:
        return 220;
      case 2014:
        return 240;
      case 2015:
        return 254;
      case 2016:
        return 264;
      case 2017:
        return 272;
      case 2018:
        return 280;
      case 2019:
        return 289;
      case 2020:
        return 301;
      case 2021:
        return 317;
      default:
        return 320;
    }
  };

  getNewMarketValue = async (pDate, cDate, price) => {
    const currentDate = new Date(cDate);
    const currentYear = currentDate.getFullYear();
    console.log(currentYear);
    const prevDate = new Date(pDate);
    const prevYear = prevDate.getFullYear();
    console.log(prevYear);
    const oldIndex = await this.getCostIndex(prevYear);
    console.log(oldIndex);
    const newIndex = await this.getCostIndex(currentYear);
    console.log(newIndex);
    const ratio = newIndex / oldIndex;
    console.log(ratio);
    const newPrice = parseInt(ratio * price);
    console.log(newPrice);
    return newPrice;
  };

  onApprove = async () => {
    this.setState({ approveloading: true, errorMessage: "" });
    try {
      const buyeradd = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
      const buyer = User(buyeradd);
      const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      const seller = User(selleradd);
      const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      const lawyer = Lawyer(lawyeradd);
      const regoffadd = await regofffactory.methods.getstoreaddress(this.state.regoffid).call();
      const regoff = RegOff(regoffadd);
      const blroadd = await blrofactory.methods.getstoreaddress(this.state.blroid).call();
      const blro = Blro(blroadd);

      const land = await blrofactory.methods.lands(this.state.landid).call();
      const landdetails = await blrofactory.methods.lands_details(this.state.landid).call();
      const currentPrice = parseInt(land.price);
      const pDate = landdetails.last_transaction_date;

      const date = new Date();
      const cDate = date.toLocaleDateString();
      console.log(cDate);

      const newPrice = await this.getNewMarketValue(pDate, cDate, currentPrice);
      console.log(newPrice);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      console.log("props id is " + this.props.id);

      await buyer.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.buyerposition,
          "Approved"
        )
        .send({ from: accounts[0] });

      await seller.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.sellerposition,
          "Approved"
        )
        .send({ from: accounts[0] });

      await lawyer.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.lawyerposition,
          "Approved"
        )
        .send({ from: accounts[0] });

      await regoff.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.registryofficerposition,
          "Approved"
        )
        .send({ from: accounts[0] });

      await blro.methods.approve(this.props.id).send({ from: accounts[0] });

      await blrofactory.methods
        .transferland(this.state.landid, this.state.buyerid, cDate, newPrice)
        .send({ from: accounts[0] });

      Router.replaceRoute(`/blro/${this.props.address}/allrequest`);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ approveloading: false });
  };

  onReject = async () => {
    this.setState({ rejectloading: true, errorMessage: "" });
    try {
      const buyeradd = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
      const buyer = User(buyeradd);
      const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      const seller = User(selleradd);
      const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      const lawyer = Lawyer(lawyeradd);
      const regoffadd = await regofffactory.methods.getstoreaddress(this.state.regoffid).call();
      const regoff = RegOff(regoffadd);
      const blroadd = await blrofactory.methods.getstoreaddress(this.state.blroid).call();
      const blro = Blro(blroadd);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      console.log("props id is " + this.props.id);

      await buyer.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.buyerposition,
          "Rejected"
        )
        .send({ from: accounts[0] });

      await seller.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.sellerposition,
          "Rejected"
        )
        .send({ from: accounts[0] });

      await lawyer.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.lawyerposition,
          "Rejected"
        )
        .send({ from: accounts[0] });

      await regoff.methods
        .changestatusbyblro(
          this.state.lawyerid,
          this.state.regoffid,
          this.state.blroid,
          this.state.registryofficerposition,
          "Rejected"
        )
        .send({ from: accounts[0] });

      await blro.methods.reject(this.props.id).send({ from: accounts[0] });

      Router.replaceRoute(`/blro/${this.props.address}/allrequest`);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ rejectloading: false });
  };

  showProposal = (e) => {
    e.preventDefault();
    try {
      window.open(this.state.url);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  render() {
    const isDisabled = this.state.ispending === "0";
    return (
      <Layout>
        <div>
          <h1>Request Details will be shown here!</h1>

          <Button primary floated="right" onClick={this.showProposal} content="Show Land Transfer Deed" />

          {this.renderDetails()}

          <br />
          <br />

          <Button negative onClick={this.onReject} disabled={isDisabled} loading={this.state.rejectloading}>
            Reject Request
          </Button>

          <Button positive onClick={this.onApprove} disabled={isDisabled} loading={this.state.approveloading}>
            Approve Request
          </Button>

          <br />
          <br />

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          {isDisabled && <h2>This request is already {this.state.blrostatus}</h2>}
        </div>
        <br />
        <br />
        {!isDisabled && <CheckOwner />}
        <br />
        <br />
      </Layout>
    );
  }
}

export default RequestDetails;

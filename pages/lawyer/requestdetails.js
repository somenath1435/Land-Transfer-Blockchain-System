import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import RequestRows from "../../components/RequestRows";
import web3 from "../../ethereum/web3";
import Lawyer from '../../ethereum/lawyerinstance';
import lawyerfactory from "../../ethereum/factory_lawyer";
import RegOff from '../../ethereum/registryofficerinstance';
import regofffactory from "../../ethereum/factory_registryofficer";
import User from '../../ethereum/userinstance';
import userfactory from "../../ethereum/factory_user";

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
    ispending: 1,
    rejectloading: false,
    approveloading: false,
    errorMessage: "",
    newregoff:""
  };

  static async getInitialProps(props) {
    const {address,id} = props.query;
    return { address, id };
  }

  async componentDidMount() {
    try{
      const addr = await lawyerfactory.methods.getstoreaddress(this.props.address).call();
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
    this.setState({approveloading:true, errorMessage: ""});
    try{
      const newregoffid=this.state.newregoff;
      if(newregoffid==="") 
        this.setState({ errorMessage: "Enter valid Registry Officer ID while approval" });
      else
      {
        //do api calls
        console.log("Approved with regoff id: "+newregoffid);

        const buyeradd = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
        const buyer = User(buyeradd);
        const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
        const seller = User(selleradd);
        const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
        const lawyer = Lawyer(lawyeradd);
        console.log(lawyeradd);
        console.log(lawyer);
        const regoffadd = await regofffactory.methods.getstoreaddress(this.state.regoffid).call();
        console.log("deply regoff addr: "+regoffadd);
        const regoff = RegOff(regoffadd);
        console.log(regoff);

        const accounts = await web3.eth.getAccounts();
        console.log("accounts[0] is "+accounts[0]);
        console.log("props id is "+this.props.id);
        
        await buyer.methods.approvebylawyer(this.state.lawyerid,this.state.buyerposition,"Approved",newregoffid).send({from:accounts[0]});

        await seller.methods.approvebylawyer(this.state.lawyerid,this.state.sellerposition,"Approved",newregoffid).send({from:accounts[0]});

        await lawyer.methods.approve(newregoffid,this.props.id).send({from:accounts[0]});
        
        await regoff.methods.createrequest(
          this.state.buyerid,
          this.state.sellerid,
          this.state.landid,
          this.state.lawyerid,
          newregoffid,
          this.state.buyerposition,
          this.state.sellerposition,
          this.props.id
        ).send({from:accounts[0]});

        Router.replaceRoute(`/lawyer/${this.props.address}/allrequest`);

      }
    }catch(err){
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({approveloading:false});
  };

  onReject = async ()=>{
    this.setState({rejectloading:true, errorMessage: ""});
    try{
      const buyeradd = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
      console.log(buyeradd);
      const buyer = User(buyeradd);
      console.log(buyer);
      const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      const seller = User(selleradd);
      console.log(selleradd);
      console.log(seller);
      const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      const lawyer = Lawyer(lawyeradd);
      console.log(lawyeradd);
      console.log(lawyer);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is "+accounts[0]);
      
      await buyer.methods.rejectbylawyer(this.state.lawyerid,this.state.buyerposition,"Rejected").send({from:accounts[0]});
      await seller.methods.rejectbylawyer(this.state.lawyerid,this.state.sellerposition,"Rejected").send({from:accounts[0]});
      await lawyer.methods.reject(this.props.id).send({from:accounts[0]});

      Router.replaceRoute(`/lawyer/${this.props.address}/allrequest`);
    }catch(err){
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({rejectloading:false});
  };

  render() {
    const isDisabled = (this.state.ispending)==="0";
    return (
      <Layout>
        <div>
          <h1>Request Details will be shown here!</h1>

          {this.renderDetails()}

          <br/><br/>

          <Button negative onClick={this.onReject} disabled={isDisabled} 
            loading={this.state.rejectloading}>
            Reject Request
          </Button>

          <Button positive onClick={this.onApprove} disabled={isDisabled}
            loading={this.state.approveloading}>
            Approve Request
          </Button>

          <br/><br/>

          <Input
              value={this.state.newregoff}
              placeholder="Enter Registry Officer ID during approval"
              disabled={isDisabled}
              fluid={true}
              onChange={(event) =>
                this.setState({ newregoff: event.target.value })
              }
          />

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          {isDisabled && <h2>This request is already {this.state.lawyerstatus}</h2>}

        </div>
      </Layout>
    );
  }
}

export default RequestDetails;

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
    regoffstatus: "",
    blrostatus: "",
    buyerposition: 0,
    sellerposition: 0,
    lawyerposition: 0,
    ispending: 1,
    rejectloading: false,
    approveloading: false,
    errorMessage: "",
    newblro:""
  };

  static async getInitialProps(props) {
    const {address,id} = props.query;
    return { address, id };
  }

  async componentDidMount() {
    try{
      const addr = await regofffactory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const regoff= RegOff(addr);
      const req = await regoff.methods.requests(this.props.id).call();
      console.log(req);

      this.setState({buyerid:req[0],sellerid:req[1],landid:req[2],lawyerid:req[3],regoffid:req[4],blroid:req[5],regoffstatus:req[6],blrostatus:req[7],buyerposition:req[8],sellerposition:req[9],lawyerposition:req[10],ispending:req[11]});
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
      const newblroid=this.state.newblro;
      if(newblroid==="") 
        this.setState({ errorMessage: "Enter valid BLRO ID while approval" });
      else
      {
        //do api calls
        console.log("Approved with blro id: "+newblroid);

        const buyeradd = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
        const buyer = User(buyeradd);
        const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
        const seller = User(selleradd);
        const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
        const lawyer = Lawyer(lawyeradd);
        const regoffadd = await regofffactory.methods.getstoreaddress(this.state.regoffid).call();
        const regoff = RegOff(regoffadd);
        const blroadd = await blrofactory.methods.getstoreaddress(this.state.newblro).call();
        const blro = Blro(blroadd);

        const accounts = await web3.eth.getAccounts();
        console.log("accounts[0] is "+accounts[0]);
        console.log("props id is "+this.props.id);
        
        await buyer.methods.approvebyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.buyerposition,"Approved",newblroid)
        .send({from:accounts[0]});

        await seller.methods.approvebyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.sellerposition,"Approved",newblroid)
        .send({from:accounts[0]});

        await lawyer.methods.approvebyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.lawyerposition,"Approved",newblroid)
        .send({from:accounts[0]});
        
        await regoff.methods.approve(newblroid,this.props.id)
        .send({from:accounts[0]});

        await blro.methods.createrequest(
          this.state.buyerid,
          this.state.sellerid,
          this.state.landid,
          this.state.lawyerid,
          this.state.regoffid,
          newblroid,
          this.state.buyerposition,
          this.state.sellerposition,
          this.state.lawyerposition,
          this.props.id
        ).send({from:accounts[0]});

        Router.replaceRoute(`/regoff/${this.props.address}/allrequest`);

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
      const buyer = User(buyeradd);
      const selleradd = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      const seller = User(selleradd);
      const lawyeradd = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      const lawyer = Lawyer(lawyeradd);
      const regoffadd = await regofffactory.methods.getstoreaddress(this.state.regoffid).call();
      const regoff = RegOff(regoffadd);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is "+accounts[0]);
      
      await buyer.methods.rejectbyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.buyerposition,"Rejected").send({from:accounts[0]});

      await seller.methods.rejectbyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.sellerposition,"Rejected").send({from:accounts[0]});

      await lawyer.methods.rejectbyregistryofficer(this.state.lawyerid,this.state.regoffid,this.state.lawyerposition,"Rejected").send({from:accounts[0]});

      await regoff.methods.reject(this.props.id).send({from:accounts[0]});

      Router.replaceRoute(`/regoff/${this.props.address}/allrequest`);
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
              value={this.state.newblro}
              placeholder="Enter BLRO ID during approval"
              disabled={isDisabled}
              fluid={true}
              onChange={(event) =>
                this.setState({ newblro: event.target.value })
              }
          />

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          {isDisabled && <h2>This request is already {this.state.regoffstatus}</h2>}

          <br/><br/>
          {!isDisabled && <CheckOwner/>}
          <br/><br/>

        </div>
      </Layout>
    );
  }
}

export default RequestDetails;

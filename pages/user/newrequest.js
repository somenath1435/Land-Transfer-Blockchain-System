import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import lawyerfactory from "../../ethereum/factory_lawyer"
import userfactory from "../../ethereum/factory_user"
import User from "../../ethereum/userinstance";
import Lawyer from "../../ethereum/lawyerinstance";

class NewRequest extends Component {

  state = {
    buyerid: "",
    sellerid: "",
    landid: "",
    lawyerid: "",
    errorMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    console.log(this.state.buyerid);
    console.log(this.state.sellerid);
    console.log(this.state.landid);
    console.log(this.state.lawyerid);

    try {

      const accounts = await web3.eth.getAccounts();
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts[0] is "+accounts[0]);
      const st=this.state;
      
      const buyerdeployedaddress = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
      console.log(buyerdeployedaddress);
      const buyerinstance= User(buyerdeployedaddress);

      const sellerdeployedaddress = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      console.log(sellerdeployedaddress);
      const sellerinstance= User(sellerdeployedaddress);

      const lawyerdeployedaddress = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      console.log(lawyerdeployedaddress);
      const lawyerinstance= Lawyer(lawyerdeployedaddress);

      const buyerpos= await buyerinstance.methods.requestcount().call();
      console.log(buyerpos);
      const sellerpos= await sellerinstance.methods.requestcount().call();
      console.log(sellerpos);

      await buyerinstance.methods.createrequest(st.buyerid,st.sellerid,st.landid,st.lawyerid).send({from: accounts[0]});

      await sellerinstance.methods.createrequest(st.buyerid,st.sellerid,st.landid,st.lawyerid).send({from: accounts[0]});

      await lawyerinstance.methods.createrequest(st.buyerid,st.sellerid,st.landid,st.lawyerid,buyerpos,sellerpos).send({from: accounts[0]});

      Router.replaceRoute(`/user/${this.state.sellerid}/allrequest`);
      
      // Router.replaceRoute(`/user/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      buyerid: "",
      sellerid: "",
      landid: "",
      lawyerid: "",
    });
  };
  
  render() {
    return (
      <Layout>
        <h1>Requests will be created here!</h1>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Enter Buyer ID</label>
            <Input
              value={this.state.buyerid}
              onChange={(event) =>
                this.setState({ buyerid: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Seller ID</label>
            <Input
              value={this.state.sellerid}
              onChange={(event) =>
                this.setState({ sellerid: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Land ID</label>
            <Input
              value={this.state.landid}
              onChange={(event) => this.setState({ landid: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter Lawyer ID</label>
            <Input
              value={this.state.lawyerid}
              onChange={(event) =>
                this.setState({ lawyerid: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Create Request
          </Button>
        </Form>
        
      </Layout>
    );
  }
}

export default NewRequest;

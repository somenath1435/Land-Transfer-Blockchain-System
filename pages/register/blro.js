import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro"

class Blro extends Component {
  state = {
    firstname: "",
    lastname: "",
    phone: "",
    ethaddress: "",
    govtid: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      //write
      console.log(this.state.firstname);
      console.log(this.state.lastname);
      console.log(this.state.phone);
      console.log(this.state.ethaddress);
      console.log(this.state.govtid);

      const accounts = await web3.eth.getAccounts();
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts[0] is "+accounts[0]);
      const st=this.state;
      await factory.methods.registerblroofficer(st.firstname,st.lastname,st.phone,st.ethaddress,st.govtid)
      .send({from: accounts[0]}); 

      Router.replaceRoute(`/blro/${this.state.ethaddress}`);
      // Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      firstname: "",
      lastname: "",
      phone: "",
      ethaddress: "",
      govtid: "",
    });
  };

  render() {
    return (
      <Layout>
        <h1>BLRO Registration Page</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Enter BLRO First Name</label>
            <Input
              value={this.state.firstname}
              onChange={(event) =>
                this.setState({ firstname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter BLRO Last Name</label>
            <Input
              value={this.state.lastname}
              onChange={(event) =>
                this.setState({ lastname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter BLRO Phone Number</label>
            <Input
              value={this.state.phone}
              onChange={(event) => this.setState({ phone: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter BLRO Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) =>
                this.setState({ ethaddress: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter BLRO Government ID</label>
            <Input
              value={this.state.govtid}
              onChange={(event) =>
                this.setState({ govtid: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Register!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default Blro;

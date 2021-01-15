import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Router, Link } from "../../routes";
import factory from "../../ethereum/factory_user";
import web3 from "../../ethereum/web3";

class User extends Component {
  state = {
    ethaddress: "",
    errorMessage: "",
    loading: false,
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      //write
      console.log(this.state.ethaddress);
      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is "+accounts[0]);
      if(this.state.ethaddress!==accounts[0]) throw Error("Input Ethereum address is different from Metamask account address");
      const checker = await factory.methods.checker(this.state.ethaddress).call();
      if(checker==false) throw Error("This Address is not registered");

      Router.replaceRoute(`/user/${this.state.ethaddress}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, ethaddress: "" });
  };

  render() {
    return (
      <Layout>
        <h1>User Login Page</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Enter User Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) =>
                this.setState({ ethaddress: event.target.value })
              }
            />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Login!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default User;

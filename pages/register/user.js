import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link , Router} from "../../routes";
import factory from '../../ethereum/factory_user'
import web3 from "../../ethereum/web3";

class User extends Component {
  state = {
    firstname: "",
    lastname: "",
    phone: "",
    adhaar: "",
    ethaddress: "",
    bankcif: "",
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
      console.log(this.state.adhaar);
      console.log(this.state.ethaddress);
      console.log(this.state.bankcif);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is "+accounts[0]);
      const st=this.state;
      await factory.methods.registeruser(st.firstname,st.lastname,st.phone,st.adhaar,st.ethaddress,st.bankcif)
      .send({from: accounts[0]}); 

      Router.replaceRoute(`/user/${this.state.ethaddress}`);
      
      // Router.replaceRoute(`/user/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      firstname: "",
      lastname: "",
      phone: "",
      adhaar: "",
      ethaddress: "",
      bankcif: "",
    });
  };

  render() {
    return (
      <Layout>
        <h1>User Registration Page</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Enter User First Name</label>
            <Input
              value={this.state.firstname}
              onChange={(event) =>
                this.setState({ firstname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter User Last Name</label>
            <Input
              value={this.state.lastname}
              onChange={(event) =>
                this.setState({ lastname: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter User Phone Number</label>
            <Input
              value={this.state.phone}
              onChange={(event) => this.setState({ phone: event.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Enter User Adhaar Number</label>
            <Input
              value={this.state.adhaar}
              onChange={(event) =>
                this.setState({ adhaar: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter User Ethereum Address</label>
            <Input
              value={this.state.ethaddress}
              onChange={(event) =>
                this.setState({ ethaddress: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Enter User Bank CIF</label>
            <Input
              value={this.state.bankcif}
              onChange={(event) =>
                this.setState({ bankcif: event.target.value })
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

export default User;

import React, { Component } from "react";
import { Card, Button, Segment, Header, Icon } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory_user";

class HomePage extends Component {
  render() {
    return (
      <Layout>
        <div>
          <Segment placeholder color="black" size="massive" textAlign="center" raised>Welcome to Land Transfer Blockchain System</Segment>

          <br />
          <br />

          <Segment placeholder color="grey">
            <Header icon>
              Please register as User or Lawyer or Registry Officer or Blro
            </Header>
            <Link route="/register">
              <Button content="Go to Registration Page" primary floated="right"/>
            </Link>
          </Segment>

          <Segment placeholder color="grey">
            <Header icon>
              Already Registered? Please login as User or Lawyer or Registry Officer or Blro
            </Header>
            <Link route="/login">
              <Button content="Go to Login Page" primary floated="right"/>
            </Link>
          </Segment>
        </div>
      </Layout>
    );
  }
}

export default HomePage;

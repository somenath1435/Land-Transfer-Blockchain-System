import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";

class NewRequest extends Component {

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  render() {
    return (
      <Layout>
        <h1>Requests will be created here!</h1>

      </Layout>
    );
  }
}

export default NewRequest;

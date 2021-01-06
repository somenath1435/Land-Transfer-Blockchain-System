import React, { Component } from "react";
import { Card, Button, Form, Input, Message, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";

class ShowRegOff extends Component {

  state={
    regoffcount:0,
    data: []
  }

  static async getInitialProps(props) {
    const address=props.query.address;
    return { address };
  }

  render() {
    return (
      <Layout>
        <h1>All Registry Officers will be shown here!</h1>
        <h1>There are currently {this.state.regoffcount} Registry Officers available</h1>       
      </Layout>
    );
  }
}

export default ShowRegOff;

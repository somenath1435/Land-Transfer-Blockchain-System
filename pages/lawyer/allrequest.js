import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";

class AllRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>All requests will be shown here!</h1>
          <h1>
            {this.state.requestcount} Requests found for Lawyer{" "}
            {this.props.address}
          </h1>

        </div>
      </Layout>
    );
  }
}

export default AllRequest;

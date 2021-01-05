import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_lawyer"

class NewRequest extends Component {
  
  render() {
    return (
      <Layout>
        <h1>Requests will be created here!</h1>
        
      </Layout>
    );
  }
}

export default NewRequest;

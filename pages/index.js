import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

class HomePage extends Component {

  


  

  render() {
    return (
      <Layout>
        <div>
          <h3>Open Campaigns</h3>

          <Link route="/page1">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary
              />
            </a>
          </Link>

          <h1>Some data will be updated here</h1>
          {this.props.campaigns}
        </div>
      </Layout>
      
    );
  }
}

export default HomePage;

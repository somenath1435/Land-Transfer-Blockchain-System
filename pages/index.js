import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import factory from "../ethereum/factory";
class HomePage extends Component {

  static async getInitialProps() {
    const campaigns = await factory.methods.cntuser().call();
    console.log(campaigns);
    console.log("1234");
    return { campaigns };
  }
  render() {
    /*return (
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
        </div>
      </Layout>
      
    );*/
    return <div>{this.props.campaigns}</div>;
  }
}

export default HomePage;

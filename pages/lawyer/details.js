import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link } from "../../routes";

class LawyerDetails extends Component {
  static async getInitialProps(props) {
    //call api

    const { address } = props.query;
    return { address };
  }

  renderCampaigns() {
    //replace data here
    const items = [
      {
        header: "First Name",
        description: "Somenath",
      },
      {
        header: "Last Name",
        description: "Sarkar",
      },
      {
        header: "Phone Number",
        description: "999999999",
      },
      {
        header: "Lawyer Government ID",
        description: "ID12345",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Lawyer Details for address {this.props.address}</h3>

          {this.renderCampaigns()}

          <br/>
          <br/>
          
          <Link route={`/lawyer/${this.props.address}/requests`}>
            <a>
              <Button content="See Requests" primary />
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default LawyerDetails;

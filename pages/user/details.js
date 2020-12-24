import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";

class UserDetails extends Component {
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
        header: "Adhaar Number",
        description: "12345678",
      },
      {
        header: "Bank CIF",
        description: "CIF12345",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>User Details for address {this.props.address}</h3>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default UserDetails;

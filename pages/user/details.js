import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from '../../ethereum/user1';
import factory from '../../ethereum/factory'
class UserDetails extends Component {

  static async getInitialProps(props) {
    //call api
    const add=props.query.address;
    return { add};
  }

  async componentDidMount() {

    const addr = await factory.methods.getstoreaddress(this.props.add).call();
    
    console.log(addr);
    console.log("1234");
    const user1= User1(addr);
    const summary = await user1.methods.showdetails().call();
    console.log(summary);
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

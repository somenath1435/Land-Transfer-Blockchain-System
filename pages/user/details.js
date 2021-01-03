import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from '../../ethereum/user1';
import factory from '../../ethereum/factory'
class UserDetails extends Component {

  state={
    fname:"",
    lname:"",
    phone:"",
    adhaar:"",
    bankcif:"",
    eth:""
  }

  static async getInitialProps(props) {
    //call api
    const add=props.query.address;
    return { add };
  }

  async componentDidMount() {

    const addr = await factory.methods.getstoreaddress(this.props.add).call();
    
    console.log(addr);
    console.log("1234");
    const user1= User1(addr);
    const summary = await user1.methods.showdetails().call();
    console.log(summary);
    console.log(summary[0]);
    this.setState({fname:summary[0],lname:summary[1],phone:summary[2],adhaar:summary[3],eth:summary[4],bankcif:summary[5]});
  }

  renderCampaigns() {
    //replace data here
    const items = [
      {
        header: "First Name",
        description: this.state.fname,
      },
      {
        header: "Last Name",
        description: this.state.lname,
      },
      {
        header: "Phone Number",
        description: this.state.phone,
      },
      {
        header: "Adhaar Number",
        description: this.state.adhaar,
      },
      {
        header: "Bank CIF",
        description: this.state.bankcif,
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>User Details for address {this.props.add}</h3>

          {this.renderCampaigns()}
        </div>
      </Layout>
    );
  }
}

export default UserDetails;

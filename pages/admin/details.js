import React, { Component } from "react";
import { Card, Button, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link } from "../../routes";
import Admin from "../../ethereum/superAdmininstance";
import factory from "../../ethereum/factory_superAdmin";
class AdminDetails extends Component {
  state = {
    fname: "",
    lname: "",
    phone: "",
    govtid: "",
    eth: "",
    govtorg: "",
    govtpos: "",
    errorMessage: "",
  };

  static async getInitialProps(props) {
    //call api

    const { address } = props.query;
    return { address };
  }

  async componentDidMount() {
    try {
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const admin = Admin(addr);
      const summary = await admin.methods.showdetails().call();
      console.log(summary);

      this.setState({
        fname: summary[0],
        lname: summary[1],
        phone: summary[2],
        govtid: summary[4],
        eth: summary[3],
        govtorg: summary[5],
        govtpos: summary[6],
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
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
        header: "Admin Government ID",
        description: this.state.govtid,
      },
      {
        header: "Admin Government Organization",
        description: this.state.govtorg,
      },
      {
        header: "Admin Government Position",
        description: this.state.govtpos,
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Admin Details for address {this.props.address}</h3>

          {this.renderCampaigns()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
          <Link route={`/admin/${this.props.address}/searchlands`}>
            <a>
              <Button content="Search Lands" primary />
            </a>
          </Link>

          <br />
          <br />
          <Link route={`/admin/${this.props.address}/searchuser`}>
            <a>
              <Button content="Search User" primary />
            </a>
          </Link>

          
        </div>
      </Layout>
    );
  }
}

export default AdminDetails;

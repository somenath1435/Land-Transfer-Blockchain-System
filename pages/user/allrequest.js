import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_user";
import User from "../../ethereum/userinstance";

class AllRequest extends Component {
  state = {
    requestcount: 0,
    requests: [],
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount() {
    try {
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      console.log(addr);
      const user = User(addr);
      const count = await user.methods.requestcount().call();
      console.log(count);
      this.setState({ requestcount: count });
      let arr = [];
      for (let i = 0; i < count; i++) {
        const req = await user.methods.requests(i).call();
        arr.push(req);
      }
      this.setState({ requests: arr });
    } catch (err) {
      console.log(err);
    }
  }

  displayRequests() {
    const items = this.state.requests.map((req, index) => {
      const headers = (
        <List>
          <List.Item>BuyerID: {req[0]}</List.Item>
          <List.Item>SellerID: {req[1]}</List.Item>
          <List.Item>LandID: {req[2]}</List.Item>
        </List>
      );

      const met = (
        <List>
          <List.Item>LawyerID: {req[3]}</List.Item>
          <List.Item>RegistryOfficerID: {req[4]}</List.Item>
          <List.Item>BlroID: {req[5]}</List.Item>
        </List>
      );

      const desc = (
        <List>
          <List.Item>Lawyer Status: {req[6]}</List.Item>
          <List.Item>Registry Offier Status: {req[7]}</List.Item>
          <List.Item>Blro Status: {req[8]}</List.Item>
        </List>
      );

      return {
        key: index,
        header: headers,
        description: desc,
        meta: met,
        fluid: true,
      };
    });

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>All requests will be shown here!</h1>
          <h1>
            {this.state.requestcount} Requests found for User{" "}
            {this.props.address}
          </h1>

          {this.displayRequests()}
        </div>
      </Layout>
    );
  }
}

export default AllRequest;

import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";
import lawyerfactory from "../../ethereum/factory_lawyer";
import userfactory from "../../ethereum/factory_user";
import User from "../../ethereum/userinstance";
import Lawyer from "../../ethereum/lawyerinstance";
import { post } from "axios";

class NewPartialRequest extends Component {
  state = {
    states: "",
    city: "",
    pincode: "",
    ownerid: "",
    price: 0,
    pid: "",
    khaatanumber: "",
    areaofland: "",
    landmark: "",
    latitude: "",
    longitude: "",
    type_of_land: "",
    north: "",
    south: "",
    east: "",
    west: "",
    last_transaction_date: "",
    buyerid: "",
    lawyerid: "",
    sellerid: "",
    landid: 0,
    errorMessage: "",
    SuccessMessage: "",
    errorMessage2: "",
    SuccessMessage2: "",
    loading: false,
    loading2: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", SuccessMessage: "" });

    try {
      // throw Error("Success! Continue with sale request");
      console.log(this.state.states);
      // this.setState({ SuccessMessage: "Please Continue with sale request" });
      const accounts = await web3.eth.getAccounts();
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts[0] is " + accounts[0]);
      const date = new Date();
      const cDate = date.toLocaleDateString();

      await factory.methods
        .register_partial_land(
          this.state.states,
          this.state.city,
          this.state.pincode,
          this.state.ownerid,
          this.state.price,
          this.state.khaatanumber,
          this.state.areaofland,
          this.state.landmark,
          "0x0000000000000000000000000000000000000000",
          this.state.pid
        )
        .send({ from: accounts[0] });

      await factory.methods
        .register_land_details(
          this.state.latitude,
          this.state.longitude,
          this.state.east,
          this.state.west,
          this.state.north,
          this.state.south,
          false,
          this.state.last_transaction_date,
          this.state.type_of_land
        )
        .send({ from: accounts[0] });

      alert("Please Continue with sale request");
      // Router.pushRoute(`/blro/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      loading2: false,
      states: "",
      city: "",
      pincode: 0,
      ownerid: "",
      price: 0,
      pid: "",
      khaatanumber: "",
      areaofland: 0,
      landmark: "",
      latitude: "",
      longitude: "",
      type_of_land: "",
      north: "",
      south: "",
      east: "",
      west: "",
      last_transaction_date: "",
      buyerid: "",
      lawyerid: "",
      sellerid: "",
      landid: 0,
    });
  };

  onSubmit2 = async (event) => {
    event.preventDefault();

    this.setState({ loading2: true, errorMessage2: "", SuccessMessage: "", SuccessMessage2: "", errorMessage2: "" });

    try {
      console.log("aa");
      const accounts = await web3.eth.getAccounts();
      // const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log("accounts[0] is " + accounts[0]);
      const count = await factory.methods.landcount().call();
      console.log(count);
      const landcount = parseInt(count);
      this.setState({ sellerid: this.props.address, landid: landcount - 1 });
      const st = this.state;

      const buyerdeployedaddress = await userfactory.methods.getstoreaddress(this.state.buyerid).call();
      console.log(buyerdeployedaddress);
      const buyerinstance = User(buyerdeployedaddress);

      const sellerdeployedaddress = await userfactory.methods.getstoreaddress(this.state.sellerid).call();
      console.log(sellerdeployedaddress);
      const sellerinstance = User(sellerdeployedaddress);

      const lawyerdeployedaddress = await lawyerfactory.methods.getstoreaddress(this.state.lawyerid).call();
      console.log(lawyerdeployedaddress);
      const lawyerinstance = Lawyer(lawyerdeployedaddress);
      console.log("bb");
      const buyerpos = await buyerinstance.methods.requestcount().call();
      console.log(buyerpos);
      const sellerpos = await sellerinstance.methods.requestcount().call();
      console.log(sellerpos);
      console.log("cc");
      console.log(this.props.address);
      console.log(landcount);
      console.log("dd");

      await buyerinstance.methods
        .createrequest(st.buyerid, this.props.address, landcount - 1, st.lawyerid)
        .send({ from: accounts[0] });

      await sellerinstance.methods
        .createrequest(st.buyerid, this.props.address, landcount - 1, st.lawyerid)
        .send({ from: accounts[0] });

      await lawyerinstance.methods
        .createrequest(st.buyerid, this.props.address, landcount - 1, st.lawyerid, buyerpos, sellerpos)
        .send({ from: accounts[0] });

      alert("Sale request Successful!");
      // console.log(this.state.buyerid);
      // this.setState({ SuccessMessage2: "Sale request Successful!" });
      // throw Error("Sale request Successful!");
    } catch (err) {
      this.setState({ errorMessage2: err.message });
    }

    this.setState({
      loading: false,
      loading2: false,
      states: "",
      city: "",
      pincode: 0,
      ownerid: "",
      price: 0,
      pid: "",
      khaatanumber: "",
      areaofland: 0,
      landmark: "",
      latitude: "",
      longitude: "",
      type_of_land: "",
      north: "",
      south: "",
      east: "",
      west: "",
      last_transaction_date: "",
      buyerid: "",
      lawyerid: "",
      sellerid: "",
      landid: 0,
    });
  };

  render() {
    return (
      <Layout>
        <h1>Partial Land Sale Page</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter State</label>
              <Input
                value={this.state.states}
                required={true}
                onChange={(event) => this.setState({ states: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter City</label>
              <Input
                value={this.state.city}
                required={true}
                onChange={(event) => this.setState({ city: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Owner ID</label>
              <Input
                value={this.state.ownerid}
                required={true}
                onChange={(event) => this.setState({ ownerid: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Pincode</label>
              <Input
                value={this.state.pincode}
                required={true}
                onChange={(event) => this.setState({ pincode: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Parent Land ID</label>
              <Input
                value={this.state.pid}
                required={true}
                onChange={(event) => this.setState({ pid: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Khaata Number</label>
              <Input
                value={this.state.khaatanumber}
                required={true}
                onChange={(event) => this.setState({ khaatanumber: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Area of Land (in square metre)</label>
              <Input
                value={this.state.areaofland}
                required={true}
                onChange={(event) => this.setState({ areaofland: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter LandMark</label>
              <Input
                value={this.state.landmark}
                required={true}
                onChange={(event) => this.setState({ landmark: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Latitude</label>
              <Input
                value={this.state.latitude}
                required={true}
                onChange={(event) => this.setState({ latitude: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Longitude</label>
              <Input
                value={this.state.longitude}
                required={true}
                onChange={(event) => this.setState({ longitude: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Land (to the North)</label>
              <Input
                value={this.state.north}
                required={true}
                onChange={(event) => this.setState({ north: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Land (to the South)</label>
              <Input
                value={this.state.south}
                required={true}
                onChange={(event) => this.setState({ south: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Land (to the East)</label>
              <Input
                value={this.state.east}
                required={true}
                onChange={(event) => this.setState({ east: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Land (to the West)</label>
              <Input
                value={this.state.west}
                required={true}
                onChange={(event) => this.setState({ west: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Type of Land</label>
              <Input
                value={this.state.type_of_land}
                required={true}
                onChange={(event) => this.setState({ type_of_land: event.target.value })}
              />
            </Form.Field>
            <Form.Field>
              <label>Enter Date (mm/dd/yyyy)</label>
              <Input
                value={this.state.last_transaction_date}
                required={true}
                onChange={(event) => this.setState({ last_transaction_date: event.target.value })}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Enter Price</label>
              <Input
                value={this.state.price}
                required={true}
                onChange={(event) => this.setState({ price: event.target.value })}
              />
            </Form.Field>
          </Form.Group>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Message success header="Success!" content={this.state.SuccessMessage} />
          <Button primary loading={this.state.loading}>
            Register Partial Land!
          </Button>
        </Form>

        <br />
        <br />
        <Form onSubmit={this.onSubmit2} error={!!this.state.errorMessage2}>
          <Form.Field>
            <label>Enter Buyer ID</label>
            <Input value={this.state.buyerid} onChange={(event) => this.setState({ buyerid: event.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Enter Lawyer ID</label>
            <Input value={this.state.lawyerid} onChange={(event) => this.setState({ lawyerid: event.target.value })} />
          </Form.Field>

          <Message error header="Oops!" content={this.state.errorMessage2} />
          <Message success header="Success!" content={this.state.SuccessMessage2} />
          <Button primary loading={this.state.loading2}>
            Create Request
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default NewPartialRequest;

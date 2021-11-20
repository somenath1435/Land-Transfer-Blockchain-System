import React, { Component } from "react";
import { Card, Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class RegisterLand extends Component {
  state = {
    states: "",
    city: "",
    pincode: "",
    ownerid: "",
    price: "",
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
    errorMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "" });

    try {
      //write
      console.log(this.state.states);

      const accounts = await web3.eth.getAccounts();
      console.log("accounts[0] is " + accounts[0]);
      await factory.methods
        .registerland(
          this.state.states,
          this.state.city,
          this.state.pincode,
          this.state.ownerid,
          this.state.price,
          this.state.khaatanumber,
          this.state.areaofland,
          this.state.landmark,
          this.props.address
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

      Router.pushRoute(`/blro/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({
      loading: false,
      states: "",
      city: "",
      pincode: 0,
      ownerid: "",
      price: 0,
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
    });
  };

  render() {
    return (
      <Layout>
        <h1>Land Registration Page</h1>
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
              <label>Enter Price</label>
              <Input
                value={this.state.price}
                required={true}
                onChange={(event) => this.setState({ price: event.target.value })}
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

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
            Register Land!
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default RegisterLand;

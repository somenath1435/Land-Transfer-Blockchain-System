import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table, Dropdown } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import LandRows from "../../components/LandRows";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class SearchLands extends Component {
  state = {
    states: "",
    city: "",
    pincode: "",
    minprice: "",
    maxprice: "",
    landtype: "",
    minareaofland: "",
    maxareaofland: "",
    errorMessage: "",
    loading: false,
    isClicked: false,
    lands: [],
    landdetails: [],
    isSearchSuccessful: false,
    temp: [],
    searchcount: 0,
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    return { address };
  }

  async componentDidMount() {
    try {
      const count = await factory.methods.landcount().call();
      let arr = [];
      let arr2 = [];
      let sellablecount = 0;
      for (let i = 0; i < count; i++) {
        const isSellable = await factory.methods.is_sellable(i).call();
        if (isSellable === "1") {
          const land = await factory.methods.lands(i).call();
          const landdetails = await factory.methods.lands_details(i).call();
          land.pindex = i;
          arr.push(land);
          arr2.push(landdetails.type_of_land);
          sellablecount++;
        }
      }
      this.setState({ lands: arr, landdetails: arr2 });
    } catch (err) {
      console.log(err);
    }
  }

  renderRows() {
    return this.state.temp.map((land, index) => {
      return (
        <LandRows
          key={index}
          id={land.pindex}
          landid={land[0]}
          states={land[1]}
          city={land[2]}
          area={land[7]}
          address={this.props.address}
        />
      );
    });
  }

  searchLand() {
    let temp = this.state.lands;

    const { states, city, pincode, minprice, maxprice, minareaofland, maxareaofland, landtype } = this.state;

    let count = 0;

    temp = temp.filter((land) => {
      const currentPrice = parseInt(land.price);
      console.log(currentPrice);
      const currentCity = land.city;
      const currentState = land.state;
      const currentPincode = parseInt(land.pincode);
      const currentArea = parseInt(land.areaofland);
      const currentType = this.state.landdetails[land.landid];
      console.log(currentType);
      if (minprice !== "" && currentPrice < parseInt(minprice)) return false;
      if (maxprice !== "" && currentPrice > parseInt(maxprice)) return false;
      if (minareaofland !== "" && currentArea < parseInt(minareaofland)) return false;
      if (maxareaofland !== "" && currentArea > parseInt(maxareaofland)) return false;
      if (city !== "" && currentCity !== city) return false;
      if (states !== "" && currentState !== states) return false;
      if (pincode !== "" && currentPincode !== parseInt(pincode)) return false;
      if(landtype !== "" && currentType!== landtype) return false;
      count++;
      return true;
    });
    // console.log(temp);
    this.setState({ temp: temp, isSearchSuccessful: true, searchcount: count });
  }

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ isClicked: true, temp: [], loading: true, searchcount: 0 });

    this.searchLand();

    this.setState({ loading: false });

    // console.log(
    //   "clicked" +
    //     this.state.states +
    //     " " +
    //     this.state.city +
    //     " " +
    //     this.state.pincode +
    //     " " +
    //     this.state.landtype +
    //     " " +
    //     this.state.minprice +
    //     " " +
    //     this.state.maxprice +
    //     " " +
    //     this.state.minareaofland +
    //     " " +
    //     this.state.maxareaofland +
    //     " "
    // );
  };

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h1>Search Lands here!</h1>

          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
            <Form.Group widths="equal">
              <Form.Field>
                <label>Enter State</label>
                <Input
                  value={this.state.states}
                  required={false}
                  onChange={(event) => this.setState({ states: event.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter City</label>
                <Input
                  value={this.state.city}
                  required={false}
                  onChange={(event) => this.setState({ city: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Enter Type of Land</label>
                <Input
                  value={this.state.landtype}
                  required={false}
                  onChange={(event) => this.setState({ landtype: event.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter Pincode</label>
                <Input
                  value={this.state.pincode}
                  required={false}
                  onChange={(event) => this.setState({ pincode: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Enter Minimum Price</label>
                <Input
                  value={this.state.minprice}
                  required={false}
                  onChange={(event) => this.setState({ minprice: event.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter Maximum Price</label>
                <Input
                  value={this.state.maxprice}
                  required={false}
                  onChange={(event) => this.setState({ maxprice: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <Form.Group widths="equal">
              <Form.Field>
                <label>Enter Minimum Area of Land (in square metre)</label>
                <Input
                  value={this.state.minareaofland}
                  required={false}
                  onChange={(event) => this.setState({ minareaofland: event.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <label>Enter Maximum Area of Land (in square metre)</label>
                <Input
                  value={this.state.maxareaofland}
                  required={false}
                  onChange={(event) => this.setState({ maxareaofland: event.target.value })}
                />
              </Form.Field>
            </Form.Group>

            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button primary loading={this.state.loading}>
              Search Land!
            </Button>
          </Form>

          {this.state.isClicked && <h1>Search results are:</h1>}
          {this.state.isSearchSuccessful && <h2>{this.state.searchcount} search found</h2>}
          {this.state.isSearchSuccessful && (
            <Table>
              <Header>
                <Row>
                  <HeaderCell>Land ID</HeaderCell>
                  <HeaderCell>State</HeaderCell>
                  <HeaderCell>City</HeaderCell>
                  <HeaderCell>Area</HeaderCell>
                  <HeaderCell>Details</HeaderCell>
                </Row>
              </Header>
              <Body>{this.renderRows()}</Body>
            </Table>
          )}
        </div>
      </Layout>
    );
  }
}

export default SearchLands;

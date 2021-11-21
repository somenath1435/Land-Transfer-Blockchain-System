import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class LandDetails extends Component {
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
    is_disputed: false,
    landid: "",
    isSellable: "",
    blroid: "",
    errorMessage: "",
    isLoading: false,
    marketValue: 0,
    url: "",
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try {
      const land = await factory.methods.lands(this.props.id).call();
      const issellable = await factory.methods.is_sellable(this.props.id).call();
      console.log(land);
      console.log(issellable);

      const landdetails = await factory.methods.lands_details(this.props.id).call();
      console.log(landdetails);

      const north = await factory.methods.north(this.props.id).call();
      const south = await factory.methods.south(this.props.id).call();
      const east = await factory.methods.east(this.props.id).call();
      const west = await factory.methods.west(this.props.id).call();

      const currentPrice = parseInt(land.price);
      const pDate = landdetails.last_transaction_date;

      const date = new Date();
      const cDate = date.toLocaleDateString();

      const newPrice = await this.getNewMarketValue(pDate, cDate, currentPrice);
      console.log(newPrice);

      const hash = await factory.methods.registration_hash(this.props.id).call();

      this.setState({
        landid: land[0],
        states: land[1],
        city: land[2],
        pincode: land[3],
        ownerid: land[4],
        price: land[5],
        khaatanumber: land[6],
        areaofland: land[7],
        landmark: land[8],
        blroid: land[9],
        isSellable: issellable,
        latitude: landdetails.latitude,
        longitude: landdetails.longitude,
        type_of_land: landdetails.type_of_land,
        north: north,
        south: south,
        east: east,
        west: west,
        last_transaction_date: landdetails.last_transaction_date,
        is_disputed: landdetails.is_disputed,
        marketValue: newPrice,
        url: hash,
      });
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
  }

  getCostIndex = async (year) => {
    const y = parseInt(year);
    switch (y) {
      case 2001:
        return 100;
      case 2002:
        return 105;
      case 2003:
        return 109;
      case 2004:
        return 113;
      case 2005:
        return 117;
      case 2006:
        return 122;
      case 2007:
        return 129;
      case 2008:
        return 137;
      case 2009:
        return 148;
      case 2010:
        return 167;
      case 2011:
        return 184;
      case 2012:
        return 200;
      case 2013:
        return 220;
      case 2014:
        return 240;
      case 2015:
        return 254;
      case 2016:
        return 264;
      case 2017:
        return 272;
      case 2018:
        return 280;
      case 2019:
        return 289;
      case 2020:
        return 301;
      case 2021:
        return 317;
      default:
        return 320;
    }
  };

  getNewMarketValue = async (pDate, cDate, price) => {
    const currentDate = new Date(cDate);
    const currentYear = currentDate.getFullYear();
    console.log(currentYear);
    const prevDate = new Date(pDate);
    const prevYear = prevDate.getFullYear();
    console.log(prevYear);
    const oldIndex = await this.getCostIndex(prevYear);
    console.log(oldIndex);
    const newIndex = await this.getCostIndex(currentYear);
    console.log(newIndex);
    const ratio = newIndex / oldIndex;
    console.log(ratio);
    const newPrice = parseInt(ratio * price);
    console.log(newPrice);
    return newPrice;
  };

  renderDetails() {
    //replace data here
    const items = [
      {
        header: "Land ID",
        description: this.state.landid,
      },
      {
        header: "State",
        description: this.state.states,
      },
      {
        header: "City",
        description: this.state.city,
      },
      {
        header: "Pincode",
        description: this.state.pincode,
      },
      {
        header: "Owner ID",
        description: this.state.ownerid,
      },
      {
        header: "Price (in Rupees)",
        description: this.state.price,
      },
      {
        header: "Khaata Number",
        description: this.state.khaatanumber,
      },
      {
        header: "Area of Land",
        description: this.state.areaofland,
      },
      {
        header: "Landmark",
        description: this.state.landmark,
      },
      {
        header: "Registered by BLRO ID",
        description: this.state.blroid,
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  renderExtraDetails() {
    //replace data here
    const is_disputed = this.state.is_disputed;
    const disputed = is_disputed ? "Yes" : "No";
    const items = [
      {
        header: "Latitude",
        description: this.state.latitude,
      },
      {
        header: "Longitude",
        description: this.state.longitude,
      },
      {
        header: "Type of Land",
        description: this.state.type_of_land,
      },
      {
        header: "Land Disputed?",
        description: disputed,
      },
      {
        header: "Land (to the north)",
        description: this.state.north,
      },
      {
        header: "Land (to the south)",
        description: this.state.south,
      },
      {
        header: "Land (to the east)",
        description: this.state.east,
      },
      {
        header: "Land (to the west)",
        description: this.state.west,
      },
      {
        header: "Date (mm/dd/yyyy)",
        description: this.state.last_transaction_date,
      },
      {
        header: "Current Market Value of Land (in Rupees)",
        description: this.state.marketValue,
      },
    ];

    return <Card.Group items={items} itemsPerRow="2" />;
  }

  OnClicked = async (e) => {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      const accounts = await web3.eth.getAccounts();

      await factory.methods.change_status_land(this.props.id).send({ from: accounts[0] });
      Router.pushRoute(`/user/${this.props.address}`);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  };

  showProposal = (e) => {
    e.preventDefault();
    try {
      window.open(this.state.url);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
  };

  render() {
    const isOwner = this.state.ownerid === this.props.address;
    return (
      <Layout>
        <div>
          <h1>Land Details will be shown here!</h1>

          {this.renderDetails()}

          {this.renderExtraDetails()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
          <Link route={`/user/${this.props.address}/alllands/${this.props.id}/landowners`}>
            <a>
              <Button content="See Owner History" primary />
            </a>
          </Link>

          {isOwner && this.state.isSellable === "0" && (
            <Button primary onClick={this.OnClicked} loading={this.state.isLoading}>
              Make Land Sellable
            </Button>
          )}

          {isOwner && this.state.isSellable === "1" && (
            <Button primary onClick={this.OnClicked} loading={this.state.isLoading}>
              Make Land Non-Sellable
            </Button>
          )}

          <br />
          <br />
          {isOwner && <Button primary onClick={this.showProposal} content="Show Land Document" />}
        </div>
      </Layout>
    );
  }
}

export default LandDetails;

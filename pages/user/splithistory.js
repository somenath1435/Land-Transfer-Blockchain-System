import React, { Component } from "react";
import { Card, Button, Form, Input, Message, List, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory_blro";

class SplitHistory extends Component {
  state = {
    par: [],
    child: [],
    count: 0,
    original: [],
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const address = props.query.address;
    const id = props.query.id;
    return { address, id };
  }

  async componentDidMount() {
    try {
      let temp = [];
      let arr = [],
        arr2 = [];
      let id = this.props.id;
      let pid;
      // let pid = await factory.methods.parent_land(id).call();
      while (true) {
        pid = await factory.methods.parent_land(id).call();
        if (id !== pid) {
          console.log("id= " + id + " pid= " + pid);
          arr.push(id);
          arr2.push(pid);
        } else {
          temp.push(id);
          break;
        }
        id = pid;
      }
      // temp.push(id);
      // while (id != pid) {
      //   arr.push();
      // }

      // const size = await factory.methods.ownerlistsize(this.props.id).call();
      // this.setState({ count: size });
      // const ownerlist = await factory.methods.showwoners(this.props.id).call();
      // console.log(ownerlist);
      // for (let i = 0; i < ownerlist.length; i++) {
      //   if (ownerlist[i] !== "0x0000000000000000000000000000000000000000") arr.push(ownerlist[i]);
      // }
      this.setState({ par: arr2, child: arr, original: temp });
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
  }

  OnParentClicked(str) {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      console.log(str);
      // const accounts = await web3.eth.getAccounts();
      // // const accounts = await ethereum.request({ method: "eth_accounts" });

      // await factory.methods.change_status_land(this.props.id).send({ from: accounts[0] });
      // Router.pushRoute(`/user/${this.props.address}`);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  }

  OnChildClicked = async (str, e) => {
    e.preventDefault();
    try {
      this.setState({ isLoading: true });
      console.log(str);
      // const accounts = await web3.eth.getAccounts();
      // // const accounts = await ethereum.request({ method: "eth_accounts" });

      // await factory.methods.change_status_land(this.props.id).send({ from: accounts[0] });
      // Router.pushRoute(`/user/${this.props.address}`);
    } catch (err) {
      console.log(err);
      this.setState({ errorMessage: err.message });
    }
    this.setState({ isLoading: false });
  };

  renderDetails() {
    const items = this.state.child.map((addr, index) => {
      const met = (
        <Button
          primary
          onClick={(e) => {
            console.log(this.state.par[index]);
            Router.pushRoute(`/user/${this.props.address}/alllands/${this.state.par[index]}`);
          }}
          loading={this.state.isLoading}
          floated="right"
        >
          Show Parent Details
        </Button>
      );
      const desc = (
        <Button
          primary
          onClick={(e) => {
            console.log(this.state.child[index]);
            Router.pushRoute(`/user/${this.props.address}/alllands/${this.state.child[index]}`);
          }}
          loading={this.state.isLoading}
          floated="right"
        >
          Show Child Details
        </Button>
      );
      return {
        header: `LandID ${this.state.child[index]} splitted from LandID ${this.state.par[index]}`,
        key: index,
        meta: met,
        description: desc,
      };
    });

    return <Card.Group items={items} itemsPerRow="1" />;
  }

  single() {
    const items = this.state.original.map((id, index) => {
      const desc = (
        <Button
          primary
          onClick={(e) => {
            console.log(id);
            Router.pushRoute(`/user/${this.props.address}/alllands/${id}`);
          }}
          loading={this.state.isLoading}
          floated="right"
        >
          Show Details
        </Button>
      );
      return { header: `LandID ${id} originally registered`, key: index, description: desc };
    });

    return <Card.Group items={items} itemsPerRow="1" />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h1>Land Split History will be shown here!</h1>

          {this.renderDetails()}

          {this.single()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br />
          <br />
        </div>
      </Layout>
    );
  }
}

export default SplitHistory;

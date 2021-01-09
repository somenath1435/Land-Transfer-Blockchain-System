import React, { Component } from "react";
import { Table, Button, Input, Message } from "semantic-ui-react";
import { Link, Router } from "../routes";
import factory from "../ethereum/factory_blro";

class CheckOwner extends Component {
  state = {
    landid: "",
    ownerid: "",
    loading: false,
    errorMessage: "",
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: "", ownerid: "" });

    try {
      if (this.state.landid === "") throw Error("Enter Valid Land ID");
      const count = await factory.methods.landcount().call();
      const landdetails = await factory.methods.lands(this.state.landid).call();
      const addr = landdetails[4];
      this.setState({ ownerid: addr });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <Input
          value={this.state.landid}
          placeholder="Enter Land ID"
          onChange={(event) => this.setState({ landid: event.target.value })}
        />

        <Button primary loading={this.state.loading} onClick={this.onSubmit}>
          Check Owner
        </Button>

        {this.state.ownerid && (
          <Message info header="Owner ID" content={this.state.ownerid} />
        )}

        {this.state.errorMessage && (
          <Message error header="Oops!" content={this.state.errorMessage} />
        )}
      </div>
    );
  }
}

export default CheckOwner;

import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link, Router } from "../routes";

class RequestRow extends Component {
  onShowDetails = async () => {
    try{
      // console.log("Show details for"+this.props.id);
      const caller = this.props.caller;
      if(caller==="lawyer")
        Router.pushRoute(`/lawyer/${this.props.address}/allrequest/${this.props.id}`);
      else if(caller=="regoff")
        Router.pushRoute(`/regoff/${this.props.address}/allrequest/${this.props.id}`);
      else if(caller=="blro")
        Router.pushRoute(`/blro/${this.props.address}/allrequest/${this.props.id}`);
    }catch(err){
      console.log(err);
    }
  };

  render() {
    const { Row, Cell } = Table;
    const { id, buyerid, sellerid, landid, address } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{buyerid}</Cell>
        <Cell>{sellerid}</Cell>
        <Cell>{landid}</Cell>
        <Cell>
          <Button primary onClick={this.onShowDetails}>
            Show Details
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;

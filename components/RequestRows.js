import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class RequestRow extends Component {
  onApprove = async () => {
    console.log("Approved!");
  };

  onReject = async () => {
    console.log("Rejected");
  };

  render() {
    const { Row, Cell } = Table;
    const { id, buyerid, sellerid, landid, status, complete } = this.props;

    return (
      <Row disabled={complete}>
        <Cell>{id}</Cell>
        <Cell>{buyerid}</Cell>
        <Cell>{sellerid}</Cell>
        <Cell>{landid}</Cell>
        <Cell>{status}</Cell>
        <Cell>
          {complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {complete ? null : (
            <Button color="red" basic onClick={this.onReject}>
              Reject
            </Button>
          )}
        </Cell>
      </Row>
    );
  }
}

export default RequestRow;

import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class AllUsersRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { id, fname, lname, phone, userid } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{userid}</Cell>
        <Cell>{fname}</Cell>
        <Cell>{lname}</Cell>
        <Cell>{phone}</Cell>
      </Row>
    );
  }
}

export default AllUsersRow;

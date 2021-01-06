import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class AllLawyersRow extends Component {

  render() {
    const { Row, Cell } = Table;
    const { id, fname, lname, phone, govtid } = this.props;

    return (
      <Row>
        <Cell>{id}</Cell>
        <Cell>{fname}</Cell>
        <Cell>{lname}</Cell>
        <Cell>{phone}</Cell>
        <Cell>{govtid}</Cell>
      </Row>
    );
  }
}

export default AllLawyersRow;

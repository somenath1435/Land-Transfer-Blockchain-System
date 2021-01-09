import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import { Link, Router } from "../routes";

class LandRows extends Component {
  onShowDetails = async () => {
    try{
      Router.pushRoute(`/user/${this.props.address}/alllands/${this.props.id}`);
    }catch(err){
      console.log(err);
    }
  };

  render() {
    const { Row, Cell } = Table;
    const { landid, states, city, area, address } = this.props;

    return (
      <Row>
        <Cell>{landid}</Cell>
        <Cell>{states}</Cell>
        <Cell>{city}</Cell>
        <Cell>{area}</Cell>
        <Cell>
          <Button primary onClick={this.onShowDetails}>
            Show Details
          </Button>
        </Cell>
      </Row>
    );
  }
}

export default LandRows;

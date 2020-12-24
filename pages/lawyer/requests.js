import React, { Component } from "react";
import { Table, Card } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import RequestRow from "../../components/RequestRows";

class LawyerRequests extends Component {
  static async getInitialProps(props) {
    //call api

    const { address } = props.query;
    return { address };
  }

  renderRows() {
    return [
      <RequestRow
        id="1"
        buyerid="0x301e08A5dC24e72A3bF4EF61B85D9FB5D38d2fFd"
        sellerid="0x301e08A5dC24e72A3bF4EF61B85D9FB5D38d2fFd"
        landid="1"
        status="pending"
        complete={false}
      />,
      <RequestRow
        id="2"
        buyerid="0x301e08A5dC24e72A3bF4EF61B85D9FB5D38d2fFd"
        sellerid="0x301e08A5dC24e72A3bF4EF61B85D9FB5D38d2fFd"
        landid="2"
        status="approved"
        complete={true}
      />
    ];
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <div>
          <h3>Lawyer Requests for address {this.props.address}</h3>

          <Table>
            <Header>
              <Row>
                <HeaderCell>Request ID</HeaderCell>
                <HeaderCell>Buyer ID</HeaderCell>
                <HeaderCell>Seller Id</HeaderCell>
                <HeaderCell>Land ID</HeaderCell>
                <HeaderCell>Status</HeaderCell>
                <HeaderCell>Approve</HeaderCell>
                <HeaderCell>Reject</HeaderCell>
              </Row>
            </Header>
            <Body>{this.renderRows()}</Body>
          </Table>
        </div>
      </Layout>
    );
  }
}

export default LawyerRequests;

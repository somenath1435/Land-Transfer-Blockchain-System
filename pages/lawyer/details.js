import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link } from "../../routes";
import Lawyer from '../../ethereum/lawyerinstance';
import factory from '../../ethereum/factory_lawyer';
class LawyerDetails extends Component {
  static async getInitialProps(props) {
    //call api

    const { address } = props.query;
    return { address };
  }
  /*async componentDidMount() {
    const addr = await factory.methods.getstoreaddress(this.props.address).call();
      const list= await factory .methods.lawyeraddress(0).call();
      console.log(list);
      console.log(addr);
      const lawyer= Lawyer(addr);
      const summary = await lawyer.methods.showdetails().call();
      console.log(summary);
  }*/
  renderCampaigns() {
    //replace data here
    const items = [
      {
        header: "First Name",
        description: "Somenath",
      },
      {
        header: "Last Name",
        description: "Sarkar",
      },
      {
        header: "Phone Number",
        description: "999999999",
      },
      {
        header: "Lawyer Government ID",
        description: "ID12345",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Lawyer Details for address {this.props.address}</h3>

          {this.renderCampaigns()}

          <br/>
          <br/>
          
          <Link route={`/lawyer/${this.props.address}/requests`}>
            <a>
              <Button content="See Requests" primary />
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default LawyerDetails;

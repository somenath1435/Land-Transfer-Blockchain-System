import React, { Component } from "react";
import { Card, Button, Message} from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link } from "../../routes";
import Lawyer from '../../ethereum/lawyerinstance';
import factory from '../../ethereum/factory_lawyer';
class LawyerDetails extends Component {

  state={
    fname:"",
    lname:"",
    phone:"",
    govtid:"",
    eth:"",
    errorMessage: ""
  }

  static async getInitialProps(props) {
    //call api

    const { address } = props.query;
    return { address };
  }

  async componentDidMount() {
    try{
      const addr = await factory.methods.getstoreaddress(this.props.address).call();
      const list= await factory.methods.lawyeraddress(0).call();
      console.log(list);
      console.log(addr);
      const lawyer= Lawyer(addr);
      const summary = await lawyer.methods.showdetails().call();
      console.log(summary);

      this.setState({fname:summary[0],lname:summary[1],phone:summary[2],govtid:summary[4],eth:summary[3]});
    }catch(err){
      this.setState({ errorMessage: err.message });
    }
  }
  renderCampaigns() {
    //replace data here
    const items = [
      {
        header: "First Name",
        description: this.state.fname,
      },
      {
        header: "Last Name",
        description: this.state.lname,
      },
      {
        header: "Phone Number",
        description: this.state.phone,
      },
      {
        header: "Lawyer Government ID",
        description: this.state.govtid,
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

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

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

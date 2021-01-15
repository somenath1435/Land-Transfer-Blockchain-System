import React, { Component } from "react";
import { Card, Message, Button } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import User1 from '../../ethereum/userinstance';
import factory from '../../ethereum/factory_user'
import { Link } from "../../routes";

class UserDetails extends Component {

  state={
    fname:"",
    lname:"",
    phone:"",
    adhaar:"",
    bankcif:"",
    eth:"",
    errorMessage: ""
  }

  static async getInitialProps(props) {
    //call api
    const add=props.query.address;
    return { add };
  }

  async componentDidMount() {

    try{
      const addr = await factory.methods.getstoreaddress(this.props.add).call();
      
      console.log(addr);
      const user1= User1(addr);
      const summary = await user1.methods.showdetails().call();
      console.log(summary);

      this.setState({fname:summary[0],lname:summary[1],phone:summary[2],adhaar:summary[3],eth:summary[4],bankcif:summary[5]});

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
        header: "Adhaar Number",
        description: this.state.adhaar,
      },
      {
        header: "Bank CIF",
        description: this.state.bankcif,
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>User Details for address {this.props.add}</h3>

          {this.renderCampaigns()}

          {this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} />}

          <br/><br/>
          <Link route={`/user/${this.props.add}/showusers`}>
            <a>
              <Button content="See All Users" primary />
            </a>
          </Link>

          <br/><br/>
          <Link route={`/user/${this.props.add}/showlawyers`}>
            <a>
              <Button content="See All Lawyers" primary />
            </a>
          </Link>

          <br/><br/>
          <Link route={`/user/${this.props.add}/showregoff`}>
            <a>
              <Button content="See All Registry Officers" primary />
            </a>
          </Link>

          <br/><br/>
          <Link route={`/user/${this.props.add}/showblro`}>
            <a>
              <Button content="See All BLRO" primary />
            </a>
          </Link>

          <br/><br/>
          <Link route={`/user/${this.props.add}/allrequest`}>
            <a>
              <Button content="See All Requests" primary />
            </a>
          </Link>

          <br/><br/>
          <Link route={`/user/${this.props.add}/newrequest`}>
            <a>
              <Button content="Make New Request" primary />
            </a>
          </Link>
          <br/><br/>
          <Link route={`/user/${this.props.add}/alllands`}>
            <a>
              <Button content="View All Lands" primary />
            </a>
          </Link>
          <Link route={`/user/${this.props.add}/mylands`}>
            <a>
              <Button content="View My Lands" primary />
            </a>
          </Link>
        </div>
      </Layout>
    );
  }
}

export default UserDetails;

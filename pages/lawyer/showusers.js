import React, { Component } from "react";
import { Card, Button, Form, Input, Message, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import User from '../../ethereum/userinstance';
import factory from "../../ethereum/factory_user"
import UserRow from "../../components/AllUsersRow"

class ShowUsers extends Component {

  state={
    count:0,
    data: []
  }

  static async getInitialProps(props) {
    const address=props.query.address;
    return { address };
  }

  async componentDidMount(){
    try{
      const count=await factory.methods.usercount().call();
      this.setState({count:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const eth=await factory.methods.useraddress(i).call();
        const deployedaddress=await factory.methods.getstoreaddress(eth).call();
        const user= User(deployedaddress);
        const summary = await user.methods.showdetails().call();
        // console.log(summary);
        arr.push(summary);
      }
      // console.log(arr);
      // console.log(arr.map((summary,index)=>{
      //   console.log("index="+index);
      //   console.log(summary);
      // }))
      this.setState({data:arr});
    }catch(err){
      console.log(err);
    }
  }

  renderRows() {

    return this.state.data.map((summary, index) => {
      return (
        <UserRow
          key={index}
          id={index}
          fname={summary[0]}
          lname={summary[1]}
          phone={summary[2]}
          userid={summary[4]}
        />
      );
    });
  }
  
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h1>All users will be shown here!</h1>
        <h2>There are currently {this.state.count} users available</h2>

        <Table>
          <Header>
            <Row>
              <HeaderCell>Index</HeaderCell>
              <HeaderCell>User ID</HeaderCell>
              <HeaderCell>First Name</HeaderCell>
              <HeaderCell>Last Name</HeaderCell>
              <HeaderCell>Phone</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        
      </Layout>
    );
  }
}

export default ShowUsers;

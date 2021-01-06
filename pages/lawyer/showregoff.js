import React, { Component } from "react";
import { Card, Button, Form, Input, Message, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import RegOff from '../../ethereum/registryofficerinstance';
import factory from "../../ethereum/factory_registryofficer"
import LawyerRow from "../../components/AllLawyersRow"

class ShowRegOff extends Component {

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
      const count=await factory.methods.registryofficercount().call();
      this.setState({count:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const eth=await factory.methods.registryofficeraddress(i).call();
        const deployedaddress=await factory.methods.getstoreaddress(eth).call();
        const regoff= RegOff(deployedaddress);
        const summary = await regoff.methods.showdetails().call();
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
        <LawyerRow
          key={index}
          id={summary[3]}
          fname={summary[0]}
          lname={summary[1]}
          phone={summary[2]}
          govtid={summary[4]}
        />
      );
    });
  }
  
  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <Layout>
        <h1>All Registry Officers will be shown here!</h1>
        <h1>There are currently {this.state.count} Registry Officers available</h1>

        <Table>
          <Header>
            <Row>
              <HeaderCell>Registry Officer ID</HeaderCell>
              <HeaderCell>First Name</HeaderCell>
              <HeaderCell>Last Name</HeaderCell>
              <HeaderCell>Phone</HeaderCell>
              <HeaderCell>Govt ID</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        
      </Layout>
    );
  }
}

export default ShowRegOff;

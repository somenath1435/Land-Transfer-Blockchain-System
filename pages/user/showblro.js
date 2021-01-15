import React, { Component } from "react";
import { Card, Button, Form, Input, Message, Table } from "semantic-ui-react";
import Layout from "../../components/layoutlogout";
import { Link, Router } from "../../routes";
import web3 from "../../ethereum/web3";
import BLRO from '../../ethereum/blroinstance';
import factory from "../../ethereum/factory_blro"
import LawyerRow from "../../components/AllLawyersRow"

class ShowBlro extends Component {

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
      const count=await factory.methods.blrocount().call();
      this.setState({count:count});
      let arr=[]
      for(let i=0;i<count;i++)
      {
        const eth=await factory.methods.blroaddress(i).call();
        const deployedaddress=await factory.methods.getstoreaddress(eth).call();
        const blro= BLRO(deployedaddress);
        const summary = await blro.methods.showdetails().call();
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
        <h1>All BLRO will be shown here!</h1>
        <h1>There are currently {this.state.count} BLRO available</h1>

        <Table>
          <Header>
            <Row>
              <HeaderCell>BLRO ID</HeaderCell>
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

export default ShowBlro;

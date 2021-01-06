import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class Register extends Component {
  render() {
    return (
      <Layout>
        <h1>Register Here!</h1>
        <Link route="/register/user">
          <a>
            <Button content="Register User" icon="add circle" primary />
          </a>
        </Link>
        <Link route="/register/lawyer">
          <a>
            <Button content="Register Lawyer" icon="add circle" primary />
          </a>
        </Link>
        <br />
        <br />
        <Link route="/register/regoff">
          <a>
            <Button content="Register Officer" icon="add circle" primary />
          </a>
        </Link>

        <Link route="/register/blro">
          <a>
            <Button content="Register Blro" icon="add circle" primary />
          </a>
        </Link>
      </Layout>
    );
  }
}

export default Register;

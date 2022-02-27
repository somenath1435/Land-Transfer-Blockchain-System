import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Link } from "../../routes";

class Login extends Component {
  render() {
    return (
      <Layout>
        <h1>Login Here!</h1>
        <Link route="/login/user">
          <a>
            <Button content="Login User" primary />
          </a>
        </Link>
        <Link route="/login/lawyer">
          <a>
            <Button content="Login Lawyer" primary />
          </a>
        </Link>
        <br />
        <br />
        <Link route="/login/regoff">
          <a>
            <Button content="Login Registry Officer" primary />
          </a>
        </Link>

        <Link route="/login/blro">
          <a>
            <Button content="Login BLRO" primary></Button>
          </a>
        </Link>

        <Link route="/login/admin">
          <a>
            <Button content="Login Admin" primary></Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default Login;

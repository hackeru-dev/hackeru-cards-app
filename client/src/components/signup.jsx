import React from "react";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import Form from "./common/form";
import { toast } from "react-toastify";
import { Redirect } from "react-router-dom";
import { login, getCurrentUser, signup } from "../services/userService";

class Signup extends Form {
  state = {
    data: {
      email: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().email().label("Email"),
    password: Joi.string().required().min(6).label("Password"),
    name: Joi.string().required().min(2).label("Name"),
  };

  doSubmit = async () => {
    const user = { ...this.state.data };
    user.biz = false;
    console.log(1);
    try {
      await signup(user);
      console.log(3);
      await login(user.email, user.password);
      console.log(4);
      toast(`${user.name} You signup successfuly`);
      this.props.history.replace("/signin");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        this.setState({ errors: { email: "Email is taken" } });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Redirect to="/my-projects" />;

    return (
      <div className="container">
        <PageHeader titleText="Signup Page" />

        <div className="row">
          <div className="col-lg-6">
            <form onSubmit={this.handleSubmit} autoComplete="off" method="POST">
              {this.renderInput("email", "Email", "email")}
              {this.renderInput("password", "Password", "password")}
              {this.renderInput("name", "Name")}
              {this.renderButton("Signup")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;

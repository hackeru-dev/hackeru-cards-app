import React, { Component } from "react";
import PageHeader from "./common/pageHeader";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <PageHeader
          titleText="About Page"
          subTitle="Here you will find an explanation of how to interface with the app"
        />

        <div className="row">
          <div className="col-8 center">
            <div className="col-10">
              {" "}
              <p>
                After a short registration you can create a business card for
                your business, publish it in the app, edit or delete it if
                necessary. Other users will be able to see your business details
                and contact you with the details you provide on your business
                card
              </p>
            </div>
          </div>
          <div className="col-4">
            <div className="card">
              <img
                className="img-fluid"
                src="https://cdn.pixabay.com/photo/2021/10/07/15/12/wine-6688901__480.jpg"
                alt="card"
              />

              <div className="card-body">
                <div className="card-head">
                  <h5 className="card-title">Business title</h5>
                  <p className="card-text"> Business Description</p>
                </div>
                <div className="border-top pt-2 ">
                  <div>
                    <b>Tel:</b> 050-0000000
                  </div>
                  <div>
                    <b>Address:</b> card Address
                  </div>
                  <div>
                    <b>Card Number:</b> 00000
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;

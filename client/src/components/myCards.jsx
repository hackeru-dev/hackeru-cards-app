import React from "react";
import PageHeader from "./common/pageHeader";
import { getMyCards } from "../services/cardService";
import Card from "./card";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/userService";
import CardsMethods from "./common/cardsMethode";

class MyCards extends CardsMethods {
  state = {
    cards: [],
    user: {},
  };

  async componentDidMount() {
    const user = getCurrentUser();
    try {
      let cards = await (await getMyCards()).data;
      return this.setState({ cards, user });
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { cards, user } = this.state;
    return (
      <div className="container">
        <PageHeader
          titleText="Your Cards List"
          subTitle="Here you can view your cards list"
        />

        <div className="row">
          <div className="col-12">
            <p>
              <Link className="btn btn-primary" to="/create-card">
                <i className="fas fa-plus-circle"></i>
                <span className="ml-1">Add Card</span>
              </Link>
            </p>
          </div>
        </div>

        <div className="row mb-4">
          {cards.length ? (
            cards.map(card => (
              <Card
                key={card._id}
                card={card}
                handleCardDelete={this.handleCardDelete}
                changeLikeStatus={this.changeLikeStatus}
                user={user}
              />
            ))
          ) : (
            <div className="mt-2">
              No Cards In The Database With This Description
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MyCards;

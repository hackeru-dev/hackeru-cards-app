import React from "react";
import { getCards } from "../services/cardService";
import PageHeader from "./common/pageHeader";
import Card from "./card";
import CardsMethods from "./common/cardsMethode";

class Home extends CardsMethods {
  state = {
    data: [],
    cards: [],
  };

  handleChange(e) {
    e.preventDefault();
    try {
      const data = [...this.state.data];
      let cards = data;
      const searchTerm = e.target.value;
      const filtercards = cards.filter(card => {
        return (
          card.bizName.includes(searchTerm.toLowerCase()) ||
          card.bizNumber.includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ cards: filtercards });
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    try {
      const { data } = await getCards();
      this.setState({ cards: data, data });
    } catch (error) {
      console.log(error);
    }
  }

  generateCards() {
    const { cards } = this.state;

    return (
      <div className="row">
        {cards.map((card, i) => (
          <Card
            key={i}
            card={card}
            handleCardDelete={this.handleCardDelete}
            changeLikeStatus={this.changeLikeStatus}
          />
        ))}
      </div>
    );
  }

  render() {
    const { cards } = this.state;
    return (
      <div className="container">
        <PageHeader
          titleText="Home Page"
          subTitle="Here you will find business cards in all areas"
        />

        <div id="search-bar">
          <div className="d-flex flex-row-reverse">
            <div className="col-12">
              <input
                type="search"
                className=" text-rtl form-control form-control-lg"
                placeholder="Enter biz name or number"
                onInput={e => this.handleChange(e)}
              />
            </div>
          </div>
        </div>

        {cards.length ? (
          this.generateCards()
        ) : (
          <div className="mt-2">
            No Cards In The Database With This Description
          </div>
        )}
      </div>
    );
  }
}

export default Home;

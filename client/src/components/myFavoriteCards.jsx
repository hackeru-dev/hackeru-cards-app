import { Redirect } from "react-router-dom";
import { getCards } from "../services/cardService";
import { getCurrentUser } from "../services/userService";
import Card from "./card";
import CardsMethods from "./common/cardsMethode";
import PageHeader from "./common/pageHeader";

class MyFavorites extends CardsMethods {
  state = {
    cards: [],
    user: {},
  };

  async componentDidMount() {
    try {
      const { data } = await getCards();
      const user = getCurrentUser();
      this.setState({ cards: data, user });
    } catch (error) {
      console.log(error);
    }
  }

  generateCards() {
    const { cards, user } = this.state;

    return (
      <div className="row">
        {cards.map((card, i) => {
          const { likes } = card;
          if (user && likes.length) {
            let userLikedCard = likes.find(item => item === user._id);
            if (userLikedCard) {
              return (
                <Card
                  key={i}
                  card={card}
                  handleCardDelete={this.handleCardDelete}
                  changeLikeStatus={this.changeLikeStatus}
                />
              );
            }
            return null;
          }
          return (
            <div className="mt-2" key={i}>
              No Favorite Cards
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { cards, user } = this.state;
    !user && <Redirect to="/" />;
    return (
      <div className="container">
        <PageHeader
          titleText="Favorite Cards"
          subTitle="Here you will find your favorite business cards"
        />
        <div>{cards.length && this.generateCards()}</div>
      </div>
    );
  }
}

export default MyFavorites;

import { Component } from "react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteCard, changeLikeStatus } from "../../services/cardService";
import { getCurrentUser } from "../../services/userService";

class CardsMethods extends Component {
  user = getCurrentUser();

  handleCardDelete = async (cardId, event) => {
    event.preventDefault();
    Swal.fire({
      title: "Are you sure you want to delete this card?",
      showCancelButton: true,
      confirmButtonText: `Delete`,
      confirmButtonColor: "#dc3545",
    }).then(async result => {
      if (result.isConfirmed) {
        let cards = [...this.state.cards];
        cards = cards.filter(card => card._id !== cardId);
        this.setState({ cards });
        await deleteCard(cardId);
        toast("Card has been deleted!");
      }
    });
  };

  changeLikeStatus = async (cardId, e) => {
    e.preventDefault();
    try {
      let cards = [...this.state.cards];
      let card = cards.find(card => card._id === cardId);
      if (!card) return;
      let cardLikesArray = card.likes;
      if (cardLikesArray.length) {
        let userLikedCard = cardLikesArray.find(item => item === this.user._id);

        if (!userLikedCard) {
          card.likes.push(this.user._id);
          this.setState({ cards });
          await changeLikeStatus(card);
          return;
        }
        cardLikesArray = cardLikesArray.filter(item => item !== this.user._id);
        card.likes = cardLikesArray;
        this.setState({ cards });
        await changeLikeStatus(card);
        return;
      }
      card.likes.push(this.user._id);
      this.setState({ cards });
      await changeLikeStatus(card);
      return;
    } catch (error) {
      console.log(error);
    }
  };
}

export default CardsMethods;

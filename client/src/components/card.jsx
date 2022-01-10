import React from "react";
import { Link } from "react-router-dom";
import { getCurrentUser } from "../services/userService";

const Card = ({ card, handleCardDelete, changeLikeStatus }) => {
  const user = getCurrentUser();
  const cardLikesArray = card.likes;
  let userLikedCard = null;

  if (user && cardLikesArray.length) {
    userLikedCard = cardLikesArray.find(item => item === user._id);
  }

  return (
    <div className="col-12 col-md-6 col-lg-4 mt-3">
      <div className="card">
        <img className="img-fluid" src={card.bizImage} alt={card.bizName} />

        <div className="card-body">
          <div className="card-head">
            <h5 className="card-title">{card.bizName}</h5>
            <p className="card-text">{card.bizDescription}</p>
          </div>
          <div className="border-top pt-2 ">
            <div>
              <b>Tel:</b> {card.bizPhone}
            </div>
            <div>
              {" "}
              <b>Address:</b> {card.bizAddress}
            </div>
            <div>
              <b>Card Number:</b> {card.bizNumber}
            </div>
          </div>
          <div className="justify-content-between d-flex mt-2">
            {user && user._id === card.user_id && (
              <div>
                <Link to={`/my-cards/edit/${card._id}`}>Edit</Link> |
                <a
                  className="ml-1"
                  href="/"
                  onClick={event => handleCardDelete(card._id, event)}>
                  Delete
                </a>
              </div>
            )}
            {user && (
              <i
                href="/"
                className={
                  userLikedCard
                    ? "fas fa-thumbs-up text-primary text-decoration-none"
                    : "far fa-thumbs-up  text-primary text-decoration-none"
                }
                onClick={e => {
                  changeLikeStatus(card._id, e);
                }}>
                {" "}
              </i>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

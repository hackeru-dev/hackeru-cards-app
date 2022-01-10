import http from "./httpService";
import { apiUrl } from "../config.json";

export function getCards() {
  return http.get(`${apiUrl}/cards/`);
}

export function getMyCards() {
  return http.get(`${apiUrl}/cards/my-cards`);
}

export function getCard(cardId) {
  return http.get(`${apiUrl}/cards/${cardId}`);
}

export function createCard(card) {
  return http.post(`${apiUrl}/cards`, card);
}

export function deleteCard(cardId) {
  return http.delete(`${apiUrl}/cards/${cardId}`);
}

export function editCard(card) {
  const cardId = card._id;
  delete card._id;
  return http.put(`${apiUrl}/cards/${cardId}`, card);
}

export async function changeLikeStatus(card) {
  return http.patch(`${apiUrl}/cards/${card._id}`, card);
}

const service = {
  createCard,
  getMyCards,
  editCard,
  getCard,
  deleteCard,
};

export default service;

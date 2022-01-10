import http from "./httpService";
import { apiUrl } from "../config.json";
import jwtDecode from "jwt-decode";

export function signup(user) {
  return http.post(`${apiUrl}/users`, user);
}

export function getJwt() {
  return localStorage.getItem("token");
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getUser(userId) {
  return http.get(`${apiUrl}/users/${userId}`);
}

export async function login(email, password) {
  const { data } = await http.post(`${apiUrl}/auth`, { email, password });
  localStorage.setItem("token", data.token);
}

const user = {
  login,
  getCurrentUser,
  logout,
};

export default user;

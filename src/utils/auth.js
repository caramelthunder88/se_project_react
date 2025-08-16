import { baseUrl, checkResponse } from "./api";

export const signup = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(checkResponse);

export const signin = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);

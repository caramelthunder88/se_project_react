const baseUrl = "http://localhost:3001";
const check = (res) =>
  res.ok
    ? res.json()
    : res
        .text()
        .then((t) =>
          Promise.reject({ status: res.status, message: t || res.statusText })
        );

export const signup = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(check);

export const signin = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).then(check);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(check);

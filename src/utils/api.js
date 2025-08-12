const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

const normalizeId = (x) => (typeof x === "string" ? x : x?._id);
const normalizeItem = (item, i) => ({
  ...item,
  _id: item._id || item.id || `fallback-${i ?? Date.now()}`,
  imageUrl: item.imageUrl || item.link,
  link: item.imageUrl || item.link,
  owner: normalizeId(item.owner),
  likes: Array.isArray(item.likes) ? item.likes.map(normalizeId) : [],
});

function getItems() {
  return request(`${baseUrl}/items`).then((payload) => {
    const arr = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
      ? payload.items
      : [];
    return arr.map((item, index) => normalizeItem(item, index));
  });
}

function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  }).then((item) => normalizeItem(item));
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

function addCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }).then((item) => normalizeItem(item));
}

function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }).then((item) => normalizeItem(item));
}

function updateProfile({ name, avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name, avatar }),
  });
}

export {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
};

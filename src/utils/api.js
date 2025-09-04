export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr88.jumpingcrab.com"
    : "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}
const request = (url, options) => fetch(url, options).then(checkResponse);

const unwrap = (payload) =>
  payload?.data ?? payload?.item ?? payload?.card ?? payload?.result ?? payload;

const normalizeId = (rawId) => (typeof rawId === "string" ? rawId : rawId?._id);

const normalizeWeather = (weatherValue) =>
  String(weatherValue ?? "").toLowerCase();

const normalizeItem = (item, i) => {
  const it = item || {};
  return {
    ...it,
    _id: it._id || it.id || `fallback-${i ?? Date.now()}`,
    imageUrl: it.imageUrl || it.link,
    link: it.imageUrl || it.link,
    owner: normalizeId(it.owner),
    likes: Array.isArray(it.likes) ? it.likes.map(normalizeId) : [],

    weather: normalizeWeather(it.weather ?? it.weatherType ?? it.type),
  };
};

function getItems() {
  return request(`${baseUrl}/items`).then((payload) => {
    const arr = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
      ? payload.items
      : [];
    return arr.map((it, i) => normalizeItem(it, i));
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
  }).then((payload) => normalizeItem(unwrap(payload)));
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
  }).then((payload) => normalizeItem(unwrap(payload)));
}

function removeCardLike(id, token) {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  }).then((payload) => normalizeItem(unwrap(payload)));
}

function updateProfile({ name, avatar }, token) {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ name, avatar }),
  }).then(unwrap);
}

export {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
};

const baseUrl = "http://localhost:3001";

export function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`).then((payload) => {
    const arr = Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.items)
      ? payload.items
      : [];
    return arr.map((item, index) => ({
      ...item,
      _id: item._id || item.id || `fallback-${index}`,

      imageUrl: item.imageUrl || item.link,
      link: item.imageUrl || item.link,
    }));
  });
}

function addItem({ name, imageUrl, weather }, token) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then((item) => ({
    ...item,
    _id: item._id || item.id || `fallback-${Date.now()}`,
    imageUrl: item.imageUrl || item.link,
    link: item.imageUrl || item.link,
  }));
}

function deleteItem(id, token) {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export { getItems, addItem, deleteItem };

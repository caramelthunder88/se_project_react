const baseUrl = "http://localhost:3001";

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
}

function request(url, options) {
  return fetch(url, options).then(checkResponse);
}

function getItems() {
  return request(`${baseUrl}/items`).then((data) =>
    data.map((item, index) => ({
      ...item,
      _id: item._id || item.id || `fallback-${index}`,
      link: item.imageUrl || item.link,
    }))
  );
}

function addItem({ name, imageUrl, weather }) {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: Date.now(),
      id: Date.now(),
      name,
      weather,
      imageUrl,
    }),
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
}

export { getItems, addItem, deleteItem };

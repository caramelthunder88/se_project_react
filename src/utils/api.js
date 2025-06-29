const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`)
    .then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    )
    .then((data) =>
      data.map((item) => ({
        ...item,
        link: item.imageUrl, // 🔄 Fix the key name
      }))
    );
}

function addItem({ name, imageUrl, weather }) {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      link: imageUrl,
    }),
  }).then((res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  });
}

function deleteItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => {
    return res.ok ? res : Promise.reject(`Error: ${res.status}`);
  });
}

export { getItems, addItem, deleteItem };

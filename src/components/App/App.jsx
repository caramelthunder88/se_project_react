import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";

import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";

import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import CurrentTemperatureUnitContext from "../../CurrentTemperatureUnitContext";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import {
  coordinates,
  APIkey,
  defaultClothingItems,
} from "../../utils/constants";
//import { getItems, addItem, deleteItem } from "../../utils/api";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as api from "../../utils/api";
import * as auth from "../../utils/auth";
import LoginModal from "../Auth/LoginModal";
import RegisterModal from "../Auth/RegisterModal";
import EditProfileModal from "../Profile/EditProfileModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  //const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    api
      .addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);

        closeActiveModal();
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const openConfirmationModal = (card) => {
    setItemToDelete(card);
    setShowConfirmModal(true);
  };

  const handleCardDelete = () => {
    const token = localStorage.getItem("jwt");
    api
      .deleteItem(itemToDelete._id, token)
      .then(() => {
        const updatedItems = clothingItems.filter(
          (item) => item._id !== itemToDelete._id
        );
        setClothingItems(updatedItems);
        setShowConfirmModal(false);
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    const action = isLiked ? api.removeCardLike : api.addCardLike;
    action(id, token)
      .then((updated) =>
        setClothingItems((prev) =>
          prev.map((it) => (it._id === id ? updated : it))
        )
      )
      .catch((e) => console.error("like", e));
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  //useEffect(() => {
  //getItems()
  //.then((data) => setClothingItems(data))
  //.catch((err) => console.error("Error fetching clothing items:", err));
  //}, []);

  //useEffect(() => {
  // api
  //.getItems()
  //.then((items) => setClothingItems(items))
  //.catch((e) => console.error("getItems", e));
  // }, []);

  useEffect(() => {
    console.log("About to fetch items...");
    api
      .getItems()
      .then((items) => {
        console.log("Items received:", items);
        console.log("Items type:", typeof items);
        console.log("Is array:", Array.isArray(items));
        setClothingItems(items);
      })
      .catch((e) => {
        console.error("getItems error:", e);
      });
  }, []);

  const handleRegister = (data) =>
    auth
      .signup(data)
      .then(() => handleLogin({ email: data.email, password: data.password }))
      .then(() => setActiveModal(""));

  const handleLogin = ({ email, password }) =>
    auth
      .signin({ email, password })
      .then((res) => {
        if (!res?.token) throw new Error("No token returned");
        localStorage.setItem("jwt", res.token);
        return auth.checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        setActiveModal("");
      });

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    return api
      .updateProfile({ name, avatar }, token)
      .then((user) => {
        setCurrentUser(user);
        setActiveModal("");
      })
      .catch((e) => console.error("updateProfile", e));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;
    auth
      .checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onOpenLogin={() => setActiveModal("login")}
              onOpenRegister={() => setActiveModal("register")}
              onSignOut={handleSignOut}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              ></Route>
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      weatherType={weatherData.type}
                      clothingItems={clothingItems.filter(
                        (i) => i.owner === currentUser?._id
                      )}
                      handleCardClick={handleCardClick}
                      onAddClick={handleAddClick}
                      onEditProfile={() => setActiveModal("editProfile")}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              ></Route>
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            //onDelete={handleDeleteCard}

            onDelete={openConfirmationModal}
            isOwner={currentUser?._id === selectedCard?.owner}
          />

          <DeleteConfirmationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleCardDelete}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onSubmit={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onSubmit={handleRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "editProfile"}
            onClose={closeActiveModal}
            onSubmit={handleUpdateProfile}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

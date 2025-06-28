import "./Profile.css";

import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, weatherType, handleCardClick }) {
  return (
    <div className="profile">
      <section className="profile__sidebar"></section>
      <SideBar />
      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          weatherType={weatherType}
          handleCardClick={handleCardClick}
        />
      </section>
    </div>
  );
}

export default Profile;

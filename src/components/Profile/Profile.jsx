import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  weatherType,
  handleCardClick,
  onAddClick,
  onEditProfile,
  onSignOut,
  onCardLike,
  isLoggedIn,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </section>

      <section className="profile__clothes-section">
        <ClothesSection
          clothingItems={clothingItems}
          weatherType={weatherType}
          handleCardClick={handleCardClick}
          onAddClick={onAddClick}
          onCardLike={onCardLike}
          isLoggedIn={isLoggedIn}
        />
      </section>
    </div>
  );
}

export default Profile;

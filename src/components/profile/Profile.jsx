import React from "react";
import './Profile.css';

const Profile = ({ isProfileOpen, toggleProfileModal }) => {
  return (
      <div className="profile-modal">
          <button onClick={toggleProfileModal}>click</button>
    </div>
  );
};

export default Profile;

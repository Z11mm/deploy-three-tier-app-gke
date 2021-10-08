import React from "react";
import "./Profile.css";

const Profile = ({ isProfileOpen, toggleProfileModal }) => {
  return (
    <div className="profile-modal">
      <article className="pa4 black-80 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
        <div>
          <img
            src="http://tachyons.io/img/logo.jpg"
            className="h3 w3 dib"
            alt="avatar"
          />
          <h2>Ciroma</h2>
          <h4>Member since: January 2021</h4>
          <hr />
          <label className="mt2 fw6" htmlFor="username">
            Name:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder="Username"
            type="text"
            name="username"
            id="username"
          />
          <label className="mt2 fw6" htmlFor="event">
            Event/Room:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder="Event Name/Room Number"
            type="text"
            name="event"
            id="event"
          />
          <label className="mt2 fw6" htmlFor="people">
            Number of People:
          </label>
          <input
            className="pa2 ba w-100"
            placeholder="Number of people"
            type="text"
            name="number-of-people"
            id="number-of-people"
          />
          <div
            className="mt4"
            style={{ display: "flex", justifyContent: "space-evenly" }}
          >
            <button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20">
              Save
            </button>
            <button
              className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
              onClick={toggleProfileModal}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="modal-close" onClick={toggleProfileModal}>&times;</div>
      </article>
    </div>
  );
};

export default Profile;

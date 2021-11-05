import React, { Component, Fragment } from "react";

import Navigation from "./components/navigation/Navigation";
import SignIn from "./components/sign-in/SignIn";
import SignUp from "./components/sign-up/SignUp";
import Logo from "./components/logo/Logo";
import ImageInputForm from "./components/image-input-form/ImageInputForm";
import Rank from "./components/rank/Rank";
import FacialRecognition from "./components/facial-recognition/FaceRecognition";
import ProfileModal from "./components/modal/ProfileModal";
import AttendanceModal from "./components/modal/AttendanceModal";
import RecordsModal from "./components/modal/RecordsModal";
import Profile from "./components/profile/Profile";
import Attendance from "./components/attendance/Attendance";
import Records from "./components/records/Records";

import "./App.css";

const { REACT_APP_API_URL } = process.env;

// Manage state within React
const initialState = {
  input: "",
  imageUrl: "",
  boxes: [],
  route: "home",
  isSignedIn: true,
  isProfileOpen: false,
  isAttendanceOpen: false,
  isRecordsOpen: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
    department: "",
    title: "",
  },
  meetings: [],
  meeting: {
    id: "",
    event_name: "",
    location: "",
    no_of_people: "",
  },
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  // Update state with user details
  createUser = (data) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    }));
  };

  createMeeting = (data) => {
    this.setState((prevState) => ({
      meetings: [...prevState.meetings, data]
    }));
  };

  // Update state with meeting details
  getMeetings = (meetings) => {
    this.setState({ meetings });
  };

  deleteMeeting = (id) => {
    // copy current list of meetings
    const meetings = [...this.state.meetings];

    // filter out item being deleted
    const updatedMeetingsList = meetings.filter((meeting) => meeting.id !== id);
    this.setState({ meetings: updatedMeetingsList });
  }

  calculateFaceRegions = (data) => {
    return data.outputs[0].data.regions.map((face) => {
      const faceRegion = face.region_info.bounding_box;

      const image = document.querySelector("#inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        topRow: faceRegion.top_row * height,
        leftCol: faceRegion.left_col * width,
        bottomRow: height - faceRegion.bottom_row * height,
        rightCol: width - faceRegion.right_col * width,
      };
    });
  };

  setBoundingBoxes = (boxes) => {
    this.setState({ boxes });
  };

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value,
    });
  };

  handleImageSubmit = () => {
    this.setState({
      imageUrl: this.state.input,
    });

    fetch(`${REACT_APP_API_URL}/imageurl`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.setBoundingBoxes(this.calculateFaceRegions(response));
      })
      .catch((err) => console.log(err));
  };

  handleRouteChange = (route) => {
    if (route === "signout") {
      return this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  // Turn profile modal on or off
  toggleModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen,
    }));
  };

  // Turn attendance modal on or off
  toggleAttendanceModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isAttendanceOpen: !prevState.isAttendanceOpen,
    }));
  };
  // Turn records modal on or off
  toggleRecordsModal = () => {
    this.setState((prevState) => ({
      ...prevState,
      isRecordsOpen: !prevState.isRecordsOpen,
    }));
  };

  render() {
    const {
      isSignedIn,
      route,
      boxes,
      imageUrl,
      isProfileOpen,
      isAttendanceOpen,
      isRecordsOpen,
      user,
      meetings,
    } = this.state;
    return (
      <div>
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.handleRouteChange}
          toggleModal={this.toggleModal}
          toggleAttendanceModal={this.toggleAttendanceModal}
          toggleRecordsModal={this.toggleRecordsModal}
        />
        {isProfileOpen ? (
          <ProfileModal>
            <Profile
              isProfileOpen={isProfileOpen}
              toggleModal={this.toggleModal}
              createUser={this.createUser}
              user={user}
              apiUrl={REACT_APP_API_URL}
            />
          </ProfileModal>
        ) : null}

        {isAttendanceOpen ? (
          <AttendanceModal>
            <Attendance
              isAttendanceOpen={isAttendanceOpen}
              toggleModal={this.toggleModal}
              toggleAttendanceModal={this.toggleAttendanceModal}
              createMeeting={this.createMeeting}
              user={user}
              meetings={meetings}
              boxes={boxes}
              apiUrl={REACT_APP_API_URL}
            />
          </AttendanceModal>
        ) : null}

        {isRecordsOpen ? (
          <RecordsModal>
            <Records
              isRecordsOpen={isRecordsOpen}
              toggleRecordsModal={this.toggleRecordsModal}
              user={user}
              getMeetings={this.getMeetings}
              meetings={meetings}
              apiUrl={REACT_APP_API_URL}
              deleteMeeting={this.deleteMeeting}
            />
          </RecordsModal>
        ) : null}

        {route === "home" ? (
          <Fragment>
            <Logo />
            <Rank name={this.state.user.name} boxes={this.state.boxes} />
            <ImageInputForm
              onInputChange={this.handleInputChange}
              onButtonSubmit={this.handleImageSubmit}
            />
            <FacialRecognition boundingBoxes={boxes} imageUrl={imageUrl} />
          </Fragment>
        ) : route === "signin" ? (
          <SignIn
            createUser={this.createUser}
            onRouteChange={this.handleRouteChange}
            apiUrl={REACT_APP_API_URL}
          />
        ) : (
          <SignUp
            createUser={this.createUser}
            onRouteChange={this.handleRouteChange}
            apiUrl={REACT_APP_API_URL}
          />
        )}
      </div>
    );
  }
}

export default App;

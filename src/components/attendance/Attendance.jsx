import React, { Component } from "react";
import "./Attendance.css";

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event_name: "",
      location: "",
      no_of_people: "",
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "event_name":
        this.setState({ event_name: event.target.value });
        break;
      case "location":
        this.setState({ location: event.target.value });
        break;
      case "no_of_people":
        this.setState({ no_of_people: event.target.value });
        break;
      default:
        return;
    }
  };

  // Update user profile
  onAttendanceUpdate = (data) => {
    fetch(`${this.props.apiUrl}/profile/${this.props.user.id}/meeting`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        this.props.toggleAttendanceModal();
        this.props.createMeeting({ ...this.props.meetings, ...data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { boxes } = this.props;
    const { event_name, location, no_of_people } = this.state;
    return (
      <div className="profile-modal">
        <article className="pa4 black-80 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
          <div>
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h2>{this.props.user.name}</h2>
            <h4>{`Attendance count: ${boxes.length}`}</h4>
            <hr />

            <label className="mt2 fw6" htmlFor="event_name">
              Event Name:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Event Name"
              type="text"
              name="event_name"
              id="event_name"
            />
            <label className="mt2 fw6" htmlFor="location">
              Location:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Location"
              type="text"
              name="location"
              id="location"
            />
            <label className="mt2 fw6" htmlFor="attendance">
              Number of people:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Number of people"
              type="text"
              name="no_of_people"
              id="no_of_people"
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() =>
                  this.onAttendanceUpdate({
                    event_name,
                    location,
                    no_of_people,
                  })
                }
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={this.props.toggleAttendanceModal}
              >
                Cancel
              </button>
            </div>
          </div>
          <div
            className="modal-close"
            onClick={this.props.toggleAttendanceModal}
          >
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Attendance;

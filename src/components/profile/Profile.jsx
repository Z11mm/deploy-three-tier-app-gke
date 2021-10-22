import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      department: this.props.user.department,
      title: this.props.user.title,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "username":
        this.setState({ name: event.target.value });
        break;
      case "department":
        this.setState({ department: event.target.value });
        break;
      case "title":
        this.setState({ title: event.target.value });
        break;
      default:
        return;
    }
  };

  // Update user profile
  onProfileUpdate = (data) => {
    fetch(`${this.props.apiUrl}/profile/${this.props.user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        this.props.toggleModal();
        this.props.createUser({ ...this.props.user, ...data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { user } = this.props;
    const { name, department, title } = this.state;
    return (
      <div className="profile-modal">
        <article className="pa4 black-80 br2 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white">
          <div>
            <img
              src="http://tachyons.io/img/logo.jpg"
              className="h3 w3 dib"
              alt="avatar"
            />
            <h2>{this.state.name}</h2>
            <h4>{`Member since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</h4>
            <hr />
            <label className="mt2 fw6" htmlFor="username">
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Username"
              type="text"
              name="username"
              id="username"
            />
            <label className="mt2 fw6" htmlFor="department">
              Department:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Department"
              type="text"
              name="department"
              id="department"
            />
            <label className="mt2 fw6" htmlFor="title">
              Title:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100"
              placeholder="Title"
              type="text"
              name="title"
              id="title"
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() => this.onProfileUpdate({ name, department, title })}
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
                onClick={this.props.toggleModal}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className="modal-close" onClick={this.props.toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;

import React, { Component } from "react";
import { Table } from "reactstrap";

import Record from "./Record";
import "./Records.css";

class Records extends Component {

  componentDidMount() {
    fetch(`${this.props.apiUrl}/profile/${this.props.user.id}/meeting`, {
      method: "get",
    })
      .then((resp) => resp.json())
      .then((resp) => {
        this.props.getMeetings(resp);
      })
      .catch((err) => console.log(err));
  }

//     onDeleteRecord = () => {
//     fetch(`${this.props.apiUrl}/meeting/${this.props.meeting.id}`, {
//       method: "delete",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((resp) => resp.json())
//       .then((resp) => {
//         console.log(resp[0].id);
//         // this.props.deleteMeeting(resp[0].id);
//       })
//       .catch((err) => console.log(err));
//   };


  render() {
    const { toggleRecordsModal, meetings, user, apiUrl, deleteMeeting } =
      this.props;
    return (
      <div className="records-modal">
        <div className="welcome">{`Welcome, ${user.name}`}</div>
        <div className="table">
          <Table borderless hover>
            <thead>
              <tr>
                <th>Events</th>
                <th>Location</th>
                <th>Number of People</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map((meeting) => (
                <Record
                //   onDeleteRecord={this.onDeleteRecord}
                  meeting={meeting}
                  user={user}
                  apiUrl={apiUrl}
                  deleteMeeting={deleteMeeting}
                />
              ))}
            </tbody>
          </Table>
        </div>
        <div className="records-close" onClick={toggleRecordsModal}>
          &times;
        </div>
      </div>
    );
  }
}

export default Records;

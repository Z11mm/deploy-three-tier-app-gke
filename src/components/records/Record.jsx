import React from "react";
import { Button } from "reactstrap";

const Record = ({ meeting, apiUrl, deleteMeeting }) => {

  const onDeleteRecord = () => {
    fetch(`${apiUrl}/meeting/${meeting.id}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        deleteMeeting(resp[0].id);
      })
      .catch((err) => console.log(err));
  };

  return (
    <tr key={meeting.id}>
      <td>{meeting.event_name}</td>
      <td>{meeting.location}</td>
      <td>{meeting.no_of_people}</td>

      <td>
        <Button onClick={() => onDeleteRecord()} color="danger" size="sm">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Record;

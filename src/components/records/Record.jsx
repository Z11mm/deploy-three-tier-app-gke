import React from "react";
import { Button } from "reactstrap";

const Record = ({ meeting }) => {
  return (
    <tr>
      <td>{meeting.event_name}</td>
      <td>{meeting.location}</td>
      <td>{meeting.no_of_people}</td>

      <td>
        <Button color="danger" size="sm">
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default Record;

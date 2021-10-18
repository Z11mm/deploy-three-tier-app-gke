import { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const attendanceModal = document.getElementById("attendance-modal");

class AttendanceModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    attendanceModal.appendChild(this.el);
  }

  componentWillUnmount() {
    attendanceModal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default AttendanceModal;

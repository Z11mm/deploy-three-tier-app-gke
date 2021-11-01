import { Component } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const recordsModal = document.getElementById("records-modal");

class RecordsModal extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    recordsModal.appendChild(this.el);
  }

  componentWillUnmount() {
    recordsModal.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

export default RecordsModal;

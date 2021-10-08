import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './ProfileModal.css';

const profileModal = document.getElementById('profile-modal');

class ProfileModal extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');

    }

    componentDidMount() {
        profileModal.appendChild(this.el);
    }

    componentWillUnmount() {
        profileModal.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }
}

export default ProfileModal;
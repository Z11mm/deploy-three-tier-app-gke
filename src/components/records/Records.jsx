import React from "react";
import './Records.css';

const Records = ({ isRecordsOpen, toggleRecordsModal }) => {
    return (
        <div className="records-modal">
            <button onClick={toggleRecordsModal}>Click</button>
        </div>
    )
}

export default Records;
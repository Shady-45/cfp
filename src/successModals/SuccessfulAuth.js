import React from "react";
import SuccessGif from "../assets/success.gif";
import "../Cascading-Style-Sheets/modals.css";
const SuccessfulAuth = ({ SignupMess }) => {
  return (
    <>
      <div className="modal-Container">
        <div className="modal-Content">
          <span className="close-Modal">&times;</span>
          <img src={SuccessGif} alt="" />
          <p>mess</p>
        </div>
      </div>
    </>
  );
};

export default SuccessfulAuth;

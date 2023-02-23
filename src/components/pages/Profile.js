import React, { useContext, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import jwtDecode from "jwt-decode";
import "../../Cascading-Style-Sheets/Profile.css";

const Profile = (props) => {
  const { auth } = useContext(AuthContext);

  console.log(auth);
  return (
    <div className="main-container">
      <h1>{`Welcome ${auth.email}!`}</h1>
      <div className="analytics">
        <h1 className="analytics">Your Analytics!</h1>
        <h2>{`Total Imperssions: ${props.count} Views`}</h2>
        <div className="works">
          <h1 className="work">Your Works</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;

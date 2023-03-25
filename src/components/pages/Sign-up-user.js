import React, { useRef } from "react";
import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "../../Cascading-Style-Sheets/Navbar.css";
import axios from "../../api/axios";

import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

const SignUpuser = ({ signUp, setSignUp }) => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const SIGNUP_URL = "auth/signUp";
  const [showForm, setShowForm] = useState(true);
  const [role, setRole] = useState(" ");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  console.log(role);
  const toggle = () => {
    /*   clickRef.current.style.display = "none"; */
    setSignUp(!signUp);
  };
  const submitUserForm = async (e) => {
    e.preventDefault();
    /*  const rawResponse = await fetch(host, {
      method: "POST",
      headers: {
        Accept: "application/json",

        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: "user",
      }),
    }); */
    try {
      const response = await axios.post(
        `https://www.fundingportal.site/auth/signUp`,
        JSON.stringify({
          name: userData.name,
          email: userData.email,
          password: userData.password,
          role: userData.role,
        }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      let messageData = response.data;
      console.log(messageData);
      alert(messageData.message);

      /*  {
        messageData ? alert(messageData.message) : alert("pls check");
      } */

      /* console.log(response.accessToken); */
    } catch (err) {
      console.log(err);
    }
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  };
  const submitForm = (e) => {
    /*   fetch(`${host}/auth/signUp`)
      .then((res) => res.json)
      .then((result) => console.log(result));
      
 */

    const postUserData = { ...userData };
    postUserData[e.target.name] = e.target.value;
    setUserData(postUserData);
    console.log(postUserData);
  };

  const clickRef = useRef(null);

  return (
    <div>
      {showForm ? (
        <form
          onSubmit={(e) => submitUserForm(e)}
          ref={clickRef}
          className="sign-in-form"
        >
          <AiOutlineCloseCircle onClick={toggle} className="close" />
          <input
            className="inpt"
            type="text"
            name="name"
            placeholder="Name"
            id=""
            value={userData.name}
            onChange={(e) => submitForm(e)}
          />

          <input
            className="inpt"
            type="email"
            placeholder="Email"
            name="email"
            id=""
            value={userData.email}
            onChange={(e) => submitForm(e)}
          />

          <input
            className="inpt"
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) => submitForm(e)}
            id=""
          />
          {/*   <div className="dropdown-menu">
            <p>Select a Role</p>

            <span>
              {dropdownMenu ? (
                <IoIosArrowDropdownCircle
                  className="dropdown-icon"
                  onClick={() => setDropdownMenu(!dropdownMenu)}
                />
              ) : (
                <IoIosArrowDropupCircle
                  className="dropdown-icon"
                  onClick={() => setDropdownMenu(!dropdownMenu)}
                />
              )}
            </span>
          </div> */}

          {/*    <ul
            className={`${dropdownMenu ? "drop-menu-open" : "drop-menu-close"}`}
          >
            <li
              onClick={() => {
                setRole("creator");
                setDropdownMenu(!dropdownMenu);
              }}
            >
              Creator
            </li>

            <li
              onClick={() => {
                setRole("user");
                setDropdownMenu(!dropdownMenu);
              }}
            >
              User
            </li>
          </ul> */}
          <div className="role-selection">
            <label for="role">Choose a Role:</label>
            <select
              id="role"
              name="role"
              value={userData.role}
              onChange={(e) => submitForm(e)}
            >
              <option value="creator">Creator</option>
              <option value="user">User</option>
            </select>
          </div>

          <button className="btn">Submit</button>
        </form>
      ) : null}
    </div>
  );
};

export default SignUpuser;

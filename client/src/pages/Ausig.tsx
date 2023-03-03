import React, { useState } from "react";
import { logo } from "../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { AuthPropType } from "./Login";
import { url } from "../url";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Ausig({ handleAuth }: AuthPropType) {
  const navigate = useNavigate();
  function handleSignup() {
    axios
      .post(`${url}/auth/asignup`)
      .then((res) => {
        localStorage.setItem("auth", JSON.stringify(res.data));
        handleAuth(res.data);
        navigate("/chat");
      })
      .catch((err) => console.log(err));
  }

  handleSignup();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <div
        className="buttons"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {logo}
        
        <div
          className="same_line"
          style={{ display: "flex", flexDirection: "row", marginTop: "25px" }}
        >
          
          
        </div>
      </div>
    </div>
  );
}

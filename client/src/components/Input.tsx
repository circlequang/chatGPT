import axios from "axios";
import React, { useState } from "react";
import { Message } from "../App";
import { send } from "../assets/icons";
import { url } from "../url";

type InputProps = {
  addMessage: (msg: Message) => void;
  toggleLoading: (value: boolean) => void;
  apiKey: string;
  img: string;
  handlelogout: () => void;
};

export default function Input({
  addMessage,
  toggleLoading,
  apiKey,
  img,
  handlelogout,
}: InputProps) {
  const [input, setInput] = useState<string>("");
  function handleInput() {
    addMessage({
      msg: input,
      me: true,
      img,
      _id: new Date().toString(),
    });
    setInput("");
    toggleLoading(true);
    let auth_data = localStorage.getItem('auth');
    auth_data = JSON.parse(auth_data);

    //apiCall
    axios
      .post(`${url}/chatgpt/chat/${apiKey}`, { message: input, api_key: auth_data.chatgptkey, })
      .then((resp) => {
        toggleLoading(false);
        addMessage({
          msg: resp.data.message,
          img: undefined,
          _id: resp.data.id,
        });
      });
  }
  return (
    <div
      className="botm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        bottom: "10px",
        width: "100%",
      }}
    >
      <div
        className="input_box"
        style={{
          width: "86%",
          backgroundColor: "#40414f",
          height: "45px",
          borderRadius: "7px",
          marginTop: "8px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <input
          autoFocus={true}
          onKeyDown={(e) => e.keyCode === 13 && input != "" && handleInput()}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          style={{
            width: "97%",
            height: "100%",
            outline: "none",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
            paddingLeft: "8px",
          }}
          placeholder=""
        />
        <button
          onClick={() => handleInput()}
          style={{
            rotate: "90deg",
            marginRight: "13px",
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
          }}
        >
          {send}
        </button>
      </div>
      
      <p
        style={{
          fontSize: "13.5px",
          marginTop: "9px",
          cursor: "pointer",
          color: "#bf3838",
          fontWeight: "bold",
        }}
        onClick={() => handlelogout()}
      >
        Logout
      </p>
    </div>
  );
}

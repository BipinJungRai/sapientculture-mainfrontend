import React, { useState } from "react";
// import "../styles/subscribe.css"
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
import http from "../http/http";
import ClipLoader from "react-spinners/ClipLoader";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const HandleSubmitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await http.post("/subscribe", { email });
    if (response.status == 200) {
      setMsg(response.data.msg + "!");
      setLoading(false);
    } else {
      setMsg("Error!");
    }
    setEmail("");
    // Clear the message after 10 seconds
    setTimeout(() => {
      setMsg("");
    }, 5000);
    // 10 seconds in milliseconds
  };
  const HandleEmail = (e) => {
    return setEmail(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      HandleEmail(e);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "black" }}
    >
      <div className="subscribe-container">
        <div className="logo-image2">
          <img src="/images/logo.png" alt="Logo" style={{'width' : '100%'}}/>
        </div>
        <h1 className="logo2">Sapient Culture.</h1>
        {/* <h2 className="heading">Subscribe</h2>
        <p>Site is under construction</p>
        <p>Opening soon...</p> */}
        <form className="subscribe-form" onSubmit={HandleSubmitForm}>
          <input
            type="email"
            placeholder="Subscribe."
            required
            onChange={HandleEmail}
            onKeyDown={handleKeyPress}
            value={email}
          />
          {/* <button type="submit">Subscribe</button> */}
          {loading ? <ClipLoader /> : <p className="msg">{msg}</p>}
        </form>
      </div>
    </div>
  );
};

export default Subscribe;

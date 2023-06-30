import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App-v1";
// import StartRating from "./startRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StartRating maxRating={10} />
    <StartRating
      maxRating={4}
      size={24}
      color="red"
      className="test"
      message={["bad", "ok", "good", "best"]}
    /> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import AppState from "./models/AppState";

firebase.initializeApp({
  apiKey: "AIzaSyARp0HAD-kRqrHrXPqAwQdomzQLvNBnJNs",
  authDomain: "noted-45cea.firebaseapp.com",
  databaseURL: "https://noted-45cea.firebaseio.com",
  projectId: "noted-45cea",
  storageBucket: "noted-45cea.appspot.com",
  messagingSenderId: "111864642930",
  appId: "1:111864642930:web:7932233107858dda0d71eb",
});
firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
  .then(() => {
    try {
      firebase.firestore().enablePersistence({ synchronizeTabs: true });
    } catch (e) {
      console.log(e);
    }
    ReactDOM.render(
      <React.StrictMode>
        <AppState.Provider>
          <App />
        </AppState.Provider>
      </React.StrictMode>,
      document.getElementById("root")
    );
  });
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

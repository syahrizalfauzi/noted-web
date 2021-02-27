import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-scoped-model";
import AppState from "../models/AppState";

export default function StartPage() {
  const navigator = useHistory();
  const loggedIn = useSelector(AppState, (state) => state.loggedIn);

  useEffect(() => {
    if (loggedIn) {
      console.log("start page, ada");
      navigator.replace("/home");
    } else {
      console.log("start page, GA");
      navigator.replace("/login");
    }
  }, [loggedIn, navigator]);

  return <div></div>;
}

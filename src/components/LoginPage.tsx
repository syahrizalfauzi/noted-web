import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-scoped-model";
import AppState from "../models/AppState";

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "spartan, sans-serif",
  },
});

export default function LoginPage() {
  const classes = useStyles();
  const navigator = useHistory();
  const login = useSelector(AppState, (state) => state.login);

  async function handleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await firebase.auth().signInWithPopup(provider);
    login(credential.user!.uid);
    navigator.replace("/");
  }

  return (
    <div className={classes.wrapper}>
      <Typography variant="h3" className={classes.title}>
        noted.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Sign in with google
      </Button>
    </div>
  );
}

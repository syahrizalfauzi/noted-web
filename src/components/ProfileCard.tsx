import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-scoped-model";
import AppState from "../models/AppState";

interface ProfileCardProps {
  displayName: string;
  email: string;
  photoURL: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "Center",
    },
    button: {
      marginTop: "16px",
      color: theme.palette.error.main,
      borderColor: theme.palette.error.main,
    },
    avatar: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  })
);

export default function ProfileCard({
  photoURL,
  displayName,
  email,
}: ProfileCardProps) {
  const classes = useStyles();
  const navigator = useHistory();
  const logout = useSelector(AppState, (state) => state.logout);

  async function handleLogout() {
    await firebase.auth().signOut();
    logout();
    navigator.replace("/");
  }

  return (
    <Paper className={classes.paper}>
      <Avatar className={classes.avatar} src={photoURL} />
      <Typography variant="h6">{displayName}</Typography>
      <Typography variant="caption">{email}</Typography>
      <Button
        variant="outlined"
        className={classes.button}
        onClick={handleLogout}
      >
        Log out
      </Button>
    </Paper>
  );
}

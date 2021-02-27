import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionsArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import AppState, { Note } from "../models/AppState";
import moment from "moment";
import { useSelector } from "react-scoped-model";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    padding: "16px",
  },
  content: {
    wordBreak: "break-all",
  },
  title: {
    fontFamily: "lato",
  },
});

export default function NoteCard(note: Note) {
  const classes = useStyles();
  const setNote = useSelector(AppState, (state) => state.setCurrentNote);
  const navigator = useHistory();
  const dateText = moment(note.lastEdit).format("ddd D MMM, HH:mm");

  function handleClick() {
    setNote(note);
    navigator.push("/edit");
  }

  return (
    <Card variant="outlined">
      <CardActionsArea className={classes.card} onClick={handleClick}>
        <Typography variant="h5" className={classes.title}>
          {note.title}
        </Typography>
        <Typography className={classes.content}>
          {note.content.length >= 200
            ? note.content.substring(0, 200) + "..."
            : note.content}
        </Typography>
        <Typography variant="caption">{dateText}</Typography>
      </CardActionsArea>
    </Card>
  );
}

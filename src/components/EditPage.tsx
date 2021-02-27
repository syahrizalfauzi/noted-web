import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelectors } from "react-scoped-model";
import AppState from "../models/AppState";
import firebase from "firebase/app";
import "firebase/firestore";
import moment from "moment";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonBar: {
    display: "flex",
    flexDirection: "row",
  },
  main: {
    marginTop: "56px",
    padding: "16px",
  },
  titleField: {
    fontSize: "2rem",
    fontWeight: "bold",
  },
  textField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "$ .MuiInputBase-input": {
      padding: 0,
    },
  },
  dateText: {
    paddingLeft: "14px",
  },
});

export default function EditPage() {
  const classes = useStyles();
  const navigator = useHistory();
  const [note, setNote, loggedIn] = useSelectors(AppState, (state) => [
    state.note,
    state.setCurrentNote,
    state.loggedIn,
  ]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [note]);

  function handleSave() {
    const collectionRef = firebase
      .firestore()
      .collection("users")
      .doc(loggedIn as string)
      .collection("notes");

    if (note) {
      collectionRef.doc(note.id).update({
        title,
        content,
        lastEdit: new Date().toISOString(),
      });
    } else {
      collectionRef.add({
        title,
        content,
        lastEdit: new Date().toISOString(),
      });
    }
    setNote();
    navigator.goBack();
  }
  function handleDelete() {
    const collectionRef = firebase
      .firestore()
      .collection("users")
      .doc(loggedIn as string)
      .collection("notes");
    collectionRef.doc(note!.id).delete();
    setNote();
    navigator.goBack();
  }

  function handleTitle(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function hanldeContent(e: React.ChangeEvent<HTMLInputElement>) {
    setContent(e.target.value);
  }

  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">
            {note ? "Edit Note" : "New Note"}
          </Typography>
          <div className={classes.buttonBar}>
            {note && (
              <IconButton onClick={handleDelete}>
                <DeleteIcon color="error" />
              </IconButton>
            )}
            <IconButton onClick={handleSave}>
              <SaveIcon color="secondary" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.main}>
        <TextField
          placeholder="Your title here..."
          fullWidth
          size="medium"
          InputProps={{ className: classes.titleField }}
          className={classes.textField}
          variant="outlined"
          value={title}
          onChange={handleTitle}
          autoFocus={note ? false : true}
        />
        <Typography className={classes.dateText} variant="caption">
          {moment(note?.lastEdit).format("ddd D MMM, HH:mm")}
        </Typography>
        <TextField
          placeholder="Your notes here..."
          fullWidth
          multiline
          className={classes.textField}
          variant="outlined"
          value={content}
          onChange={hanldeContent}
          autoFocus={note ? true : false}
        />
      </div>
    </div>
  );
}

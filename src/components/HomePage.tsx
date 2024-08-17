import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import Popover from "@material-ui/core/Popover";
import CircularProgress from "@material-ui/core/CircularProgress";
import NoteCard from "./NoteCard";
import SearchBar from "./SearchBar";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import AddIcon from "@material-ui/icons/Add";
import { IconButton, makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { useHistory } from "react-router-dom";
import { useSelectors } from "react-scoped-model";
import AppState, { Note } from "../models/AppState";

const useStyles = makeStyles({
  fab: {
    position: "fixed",
    right: "30px",
    bottom: "30px",
    borderRadius: "12px",
  },
  main: {
    padding: "16px 16px",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  grid: {
    marginTop: "16px",
  },
  searchField: {
    backgroundColor: "#fff",
  },
  searchContainer: {
    position: "fixed",
    top: "64px",
    zIndex: 1,
  },
  mainContainer: {
    marginTop: "120px",
  },
  center: {
    position: "fixed",
    left: "0%",
    right: "0%",
    top: "50%",
    margin: "auto",
  },
});

export default function HomePage() {
  const classes = useStyles();
  const [profileAnchor, setProfileAnchor] = useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(profileAnchor);
  const [user] = useAuthState(firebase.auth());
  const navigator = useHistory();
  const [currentNotes, setNotes, loggedIn, setNote] = useSelectors(
    AppState,
    (state) => [
      state.displayedNotes,
      state.setCurrentNotes,
      state.loggedIn,
      state.setCurrentNote,
    ]
  );

  const [notes, notesLoading, notesError] = useCollection(
    firebase
      .firestore()
      .collection("users")
      .doc(loggedIn as string)
      .collection("notes")
      .orderBy("lastEdit", "desc"),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  useEffect(() => {
    if (!notesLoading && notes) {
      const newNotes: Note[] = notes.docs.map((note) => {
        return {
          id: note.id,
          content: note.data().content,
          title: note.data().title,
          lastEdit: note.data().lastEdit,
        };
      });
      setNotes(newNotes);
    }
  }, [notes, notesLoading, setNotes]);

  function handleProfileClick(event: React.MouseEvent<HTMLButtonElement>) {
    setProfileAnchor(event.currentTarget);
  }

  function handleClosePopover() {
    setProfileAnchor(null);
  }

  function handleFab() {
    setNote(undefined);
    navigator.push("/edit");
  }

  function renderMainComponent() {
    if (notesError)
      return (
        <div>
          <Typography>Error fetching data, please re-login</Typography>
        </div>
      );
    if (notesLoading || !user)
      return <CircularProgress className={classes.center} />;
    else {
      return currentNotes.length === 0 ? (
        <div className={classes.center}>
          <Typography align="center">No notes...</Typography>
        </div>
      ) : (
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 0: 1, 600: 2, 960: 3, 1280: 4 }}
          className={classes.grid}
        >
          <Masonry gutter="16px">
            {currentNotes.map((note) => (
              <NoteCard key={note.id} {...note} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      );
    }
  }

  return (
    <div>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h5">Notes</Typography>
          <IconButton onClick={handleProfileClick}>
            {user && <Avatar src={user.photoURL} />}
          </IconButton>
          <Popover
            open={open}
            anchorEl={profileAnchor}
            onClose={handleClosePopover}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            {user && (
              <ProfileCard
                displayName={user.displayName}
                email={user.email}
                photoURL={user.photoURL}
              />
            )}
          </Popover>
        </Toolbar>
      </AppBar>
      <SearchBar />
      <Grid container className={classes.mainContainer}>
        <Grid item xs={false} sm={1}></Grid>
        <Grid item xs={12} sm={10} className={classes.main}>
          {renderMainComponent()}
        </Grid>
        <Grid item xs={false} sm={1}></Grid>
      </Grid>
      <Fab
        children={<AddIcon />}
        className={classes.fab}
        color="primary"
        onClick={handleFab}
      />
    </div>
  );
}

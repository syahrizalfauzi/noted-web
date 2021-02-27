import moment from "moment";
import { useCallback, useState } from "react";
import createModel from "react-scoped-model";
import { useStorageState } from "react-storage-hooks";

export interface Note {
  title: string;
  content: string;
  lastEdit: string;
  id: string;
}

const AppState = createModel(() => {
  const [note, setNote] = useState<Note>();
  const [notes, setNotes] = useState<Note[]>([]);
  const [displayedNotes, setDNotes] = useState<Note[]>([]);
  const [loggedIn, setLoggedIn] = useStorageState(localStorage, "loggedIn");

  const setCurrentNote = useCallback((newNote?: Note) => {
    setNote(newNote);
  }, []);

  const setCurrentNotes = useCallback((newNotes: Note[]) => {
    setNotes(newNotes);
  }, []);

  const setNotesFilter = useCallback(
    (filter?: string) => {
      if (filter) {
        const newNotes = notes.filter(
          (value: Note) =>
            value.title.toLowerCase().includes(filter) ||
            value.content.toLowerCase().includes(filter) ||
            moment(value.lastEdit)
              .format("ddd D MMM, HH:mm")
              .toLowerCase()
              .includes(filter)
        );
        setDNotes(newNotes);
      } else setDNotes(notes);
    },
    [notes]
  );

  const login = useCallback(
    (uid: string) => {
      setLoggedIn(uid);
    },
    [setLoggedIn]
  );

  const logout = useCallback(() => {
    setLoggedIn(null);
  }, [setLoggedIn]);

  return {
    note,
    displayedNotes,
    loggedIn,
    setCurrentNote,
    setCurrentNotes,
    setNotesFilter,
    login,
    logout,
  };
});

export default AppState;

import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import SearchIcon from "@material-ui/icons/Search";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-scoped-model";
import AppState from "../models/AppState";

const useStyles = makeStyles({
  main: {
    padding: "16px 16px",
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchField: {
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#fafafa",
    position: "fixed",
    top: "64px",
    zIndex: 1,
  },
});

export default function SearchBar() {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const setNotesFilter = useSelector(AppState, (state) => state.setNotesFilter);

  useEffect(() => {
    setNotesFilter();
  }, [setNotesFilter]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
    setNotesFilter(e.target.value);
  }

  return (
    <Grid container className={classes.searchContainer}>
      <Grid item xs={false} sm={1}></Grid>
      <Grid item xs={12} sm={10} className={classes.main}>
        <TextField
          placeholder="Search your notes..."
          fullWidth
          variant="outlined"
          InputProps={{ endAdornment: <SearchIcon></SearchIcon> }}
          className={classes.searchField}
          value={search}
          onChange={handleSearch}
        />
      </Grid>
      <Grid item xs={false} sm={1}></Grid>
    </Grid>
  );
}

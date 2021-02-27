import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import EditPage from "./components/EditPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";

import UndefinedPage from "./components/UndefinedPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AppState from "./models/AppState";
import { useSelector } from "react-scoped-model";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[800],
    },
    secondary: {
      main: "#fff",
    },
  },
  typography: {
    fontFamily: `"Lato", "Roboto", sans-serif`,
    h5: {
      fontFamily: "spartan",
      fontWeight: "bold",
    },
  },
});

export default function App() {
  const loggedIn = useSelector(AppState, (state) => state.loggedIn);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Switch>
          <Route exact path="/">
            <Redirect to={loggedIn ? "/home" : "/login"} />
          </Route>
          <Route path="/login">
            {!loggedIn ? <LoginPage /> : <Redirect to="/home" />}
          </Route>
          <Route path="/home">
            {loggedIn ? <HomePage /> : <Redirect to="/login" />}
          </Route>
          <Route path="/edit">
            {loggedIn ? <EditPage /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <UndefinedPage />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

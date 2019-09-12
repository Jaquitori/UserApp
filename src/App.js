import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddNewUser from "./components/AddNewUser";
import EditUser from "./components/EditUser";
import ListContact from "./components/ListContact";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/addNewUser" component={AddNewUser} />
          <Route path="/edit/:id" component={EditUser} />
          <Route path="/listContact" component={ListContact} />
        </Switch>
      </Router>
    );
  }
}

export default App;

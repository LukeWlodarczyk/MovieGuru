import * as React from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps, Switch, withRouter } from "react-router-dom";
import { Dispatch } from "redux";

import { setLocationChanged } from "../actions";
import { IState } from "../models";
import { routes } from "../Routes";



class App extends React.Component {

  render() {
    return <Switch>{routes.map(route => <Route {...route} key={route.path} />)}</Switch>;
  }
}

export default App;

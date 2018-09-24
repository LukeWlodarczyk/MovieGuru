import * as React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { RouteComponentProps } from 'react-router-dom';

import Header from '../components/layout/Header';

export interface IAppProps extends RouteComponentProps<void> {
    route: RouteConfig;
}

class App extends React.Component<IAppProps, {}> {

    render(): JSX.Element {
      return (
        <div className="container">
          <Header />
          {renderRoutes(this.props.route.routes)}
        </div>
      )
    }

}

export default App;

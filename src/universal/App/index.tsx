import * as React from "react";
import { renderRoutes, RouteConfig } from "react-router-config";
import { RouteComponentProps } from 'react-router-dom';

import Header from '../components/Header';

export interface IAppProps extends RouteComponentProps<void> {
    route: RouteConfig;
}

const App:React.SFC<IAppProps> = ({ route }) => (
  <div className="container">
    <Header />
    {renderRoutes(route.routes)}
  </div>
)


export default App;

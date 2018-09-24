import "babel-polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from "react-loadable";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";

import createStore from "../universal/Store";
import { routes } from '../universal/Routes'

window.onload = () => {
    const prelodedState = window.__PRELOADED_STATE__;

    const store = createStore(prelodedState);

    delete window.__PRELOADED_STATE__;

    Loadable
      .preloadReady()
      .then(() => {
        ReactDOM.hydrate(
            <Provider store={store}>
                <BrowserRouter>
                    <div>{renderRoutes(routes)}</div>
                </BrowserRouter>
            </Provider>,
            document.getElementById("root") as HTMLElement
        );
    });
};

import * as express from "express";
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { Provider } from "react-redux";
import { matchPath, StaticRouter } from "react-router-dom";
import serialize from "serialize-javascript";

import App from "../../universal/app";
import { routes } from "../../universal/Routes";
import createStore from "../../universal/Store";

const stats = require("../stats/reactLoadable.json");


export default async (req: express.Request, res: express.Response) => {
  const promises: Array<any> = [];
  const store = createStore();

  routes.some(route => {
    const match = matchPath(req.path, route);
    if (match && route.fetchData) {
      promises.push(store.dispatch(route.fetchData()));
    }
    return !!match;
  });

  await Promise.all(promises);

  const modules: string[] = [];
  const context = {};
  const html = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
  const bundles = getBundles(stats, modules);

  const styles = bundles
    .filter(bundle => bundle.file.endsWith(".css"))
    .map(style => `<link href="/static/${style.file}" rel="stylesheet"/>`)
    .join("\n");
  const scripts = bundles
    .filter(bundle => bundle.file.endsWith(".js"))
    .map(script => `<script src="/static/js/${script.file}"></script>`)
    .join("\n");

  const preloadedState = serialize(store.getState(), { isJSON: true });

  const content = `
      <!doctype html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico">
              <title>My App</title>
              ${styles}
          </head>
          <body>
              <div id="root">${html}</div>
              <script>window.__PRELOADED_STATE__=${preloadedState}</script>
              <script src="/static/js/main.js"></script>
              ${scripts}
          </body>
      </html>
  `

  res.send(content);

}

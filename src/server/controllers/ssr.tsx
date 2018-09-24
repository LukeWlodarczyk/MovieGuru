import { Request, Response } from 'express';
import * as React from "react";
import * as ReactDOMServer from "react-dom/server";
import * as Loadable from "react-loadable";
import { getBundles } from "react-loadable/webpack";
import { Helmet, HelmetData } from 'react-helmet';
import { Provider } from "react-redux";
import { Store, Dispatch } from 'redux';
import { StaticRouter } from "react-router-dom";
import { renderRoutes, matchRoutes, RouteConfig } from 'react-router-config';
import * as serialize from "serialize-javascript";

import { routes } from "../../universal/Routes";
import createStore from "../../universal/Store";

import { IState } from '../../universal/models/state'

const stats = require("../stats/reactLoadable.json");

interface IRouteConfig extends RouteConfig {
  fetchData?: (dispatch) => Promise<any>
}

export default async (req: Request, res: Response) => {
  const store: Store<IState> = createStore();
  const { dispatch }: { dispatch: Dispatch<{}> } = store;

	const promises: any = matchRoutes<any>(routes, req.path)
		.map(({ route }: { route: IRouteConfig}) => {
      const { fetchData } = route;
			return fetchData ? fetchData(dispatch) : null;
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve) => {
					promise.then(resolve).catch(resolve);
				});
			}
      return null;
		});

  await Promise.all(promises);

  const modules: string[] = [];
  const context: { url?: string, notFound?: boolean } = {};
  const html: string = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
            <div>{renderRoutes(routes)}</div>
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );

  if (context.url) {
    return res.redirect(302, context.url);
  }

  if (context.notFound) {
    return res.status(404);
  }

  const bundles = getBundles(stats, modules);

  const styles: string = bundles
    .filter(bundle => bundle.file.endsWith(".css"))
    .map(style => `<link href="/static/${style.file}" rel="stylesheet"/>`)
    .join("\n");
  const scripts: string = bundles
    .filter(bundle => bundle.file.endsWith(".js"))
    .map(script => `<script src="/static/js/${script.file}"></script>`)
    .join("\n");

  const preloadedState = serialize(store.getState(), { isJSON: true });
  const helmet: HelmetData = Helmet.renderStatic();

  const content = `
      <!doctype html>
      <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <meta http-equiv="X-UA-Compatible" content="ie=edge">
              <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico">
              ${helmet.title.toString()}
              ${styles}
          </head>
          <body>
              <div id="root">${html}</div>
              <script>window.__PRELOADED_STATE__=${preloadedState}</script>
              <script src="/static/js/main.js"></script>
              ${scripts}
          </body>
      </html>
  `;

  return res.send(content);

}

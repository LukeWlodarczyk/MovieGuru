import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import axios from 'axios';

import reducers from "./reducers";
import { IState } from './models/state';

const keys = require('../config/keys');

const serverAxios = axios.create({
	baseURL: `${keys.domain}/api`,
});

const clientAxios = axios.create({
  baseURL: '/api',
});

export default (preloadedState?:IState) => {

    const axiosInstance = preloadedState ? clientAxios : serverAxios;

    return preloadedState
        ? createStore<IState>(
              reducers,
              preloadedState,
              applyMiddleware(thunk.withExtraArgument(axiosInstance))
          )
        : createStore<IState>(
            reducers,
            applyMiddleware(thunk.withExtraArgument(axiosInstance))
          );
}

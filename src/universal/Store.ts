import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";

import { IState } from "../universal/models/state";
import reducers from "./reducers";


export default (preloadedState?: IState) => {
    return preloadedState
        ? createStore<IState>(
              reducers,
              preloadedState,
              applyMiddleware(thunkMiddleware)
          )
        : createStore<IState>(reducers, applyMiddleware(thunkMiddleware));
}

import { IState } from "../models";


declare global {
    interface Window {
        __PRELOADED_STATE__?: IState;
    }
}

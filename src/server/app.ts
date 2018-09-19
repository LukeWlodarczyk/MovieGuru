import "babel-polyfill";
import * as express from "express";

import { Routes } from "./routes";


class App {

    public app: express.Application;
    private routes: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routes.init(this.app);
    }

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/static", express.static("static"));
        this.app.use("/static/js", express.static("client"));

    }

}

export default new App().app;

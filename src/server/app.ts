import "babel-polyfill";
import * as express from "express";
import * as mongoose from "mongoose";

import { Routes } from "./routes";
import ssr from "./controllers/ssr";

const keys = require('../config/keys')

class App {

    public app: express.Application;
    private routes: Routes = new Routes();
    private mongoUrl: string = keys.mongoURI;

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
        this.routes.init(this.app);
        this.ssr();
    }

    private config(): void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use("/static", express.static("static"));
        this.app.use("/static/js", express.static("client"));

    }

    private mongoSetup(): void{
        mongoose
            .connect(this.mongoUrl, { useNewUrlParser: true })
            .then(() => console.log('Mongoose connected'))
            .catch(err => console.log(`Mongoose error: ${err}`))
    }

    private ssr(): void {
      this.app.use(ssr);
    }
}

export default new App().app;

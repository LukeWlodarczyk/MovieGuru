import "babel-polyfill";
import * as express from "express";

import { Routes } from "./routes";
import mongoose from "mongoose";


class App {

    public app: express.Application;
    private routes: Routes = new Routes();
    private mongoUrl: string = 'mongodb://Luke:LukeLuke1@ds259742.mlab.com:59742/movieguru-dev';

    constructor() {
        this.app = express();
        this.mongoSetup();
        this.config();
        this.routes.init(this.app);
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
            .catch(err=> console.log(`Mongoose error: ${err}`))
    }

}

export default new App().app;

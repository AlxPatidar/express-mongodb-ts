import Express from "express";
import dotenv from "dotenv";
import BodyParser from "body-parser";
import mongoose from "mongoose";
import { Routes } from "./routes"

class App {

    public app: Express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = Express();
        this.config();
        dotenv.config();
        this.mongoSetup()
        this.routePrv.routes(this.app); 
    }

    private config(): void {
        // support application/json type post data
        this.app.use(BodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(BodyParser.urlencoded({ extended: false }));
    }
    private mongoSetup(): void{
        mongoose.Promise = global.Promise;
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});    
    }
}

export default new App().app;
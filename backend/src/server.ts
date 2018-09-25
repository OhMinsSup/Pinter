import * as bodyParser from "body-parser";
import * as express from "express";
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as mongoose from "mongoose";
import * as path from 'path';
import * as compresion from 'compression';
import * as config from "./config/config";
import { jwtMiddleware } from "./lib/middleware/jwtMiddleware";
import corsMiddleware from './lib/middleware/cors';
import router from './routes';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeDb();
        this.middleware();
        this.routes();
    }

    private middleware(): void {
        const { app } = this;
        app.use(compresion());
        app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use((req, res, next): void => {
            jwtMiddleware(req, res, next);
        });
        app.use(cors());
        app.use((req, res, next) => {
            corsMiddleware(req, res, next);
        });
        app.use(express.static(path.join(__dirname, "../../frontend/build/")));
    }

    private initializeDb(): void {
        const MONGO_URL: string = config.MONGODB_WEB_URL;
        (mongoose as any).Promise = global.Promise;
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
        .then(() => {
            console.log("connected to mongoDB ✅");
        })
        .catch((e) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + e);
        }); 
    }

    private routes(): void {
        const { app } = this;
        app.use(router);
        app.get('/*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../frontend/build/', 'index.html'));
        });
    }   
}

export default new Server().app;
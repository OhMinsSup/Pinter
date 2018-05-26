import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import * as config from './config/config';
import AuthRouter from './routes/AuthRouter';

class Server {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.initializeDb();
        this.middleware();
        this.routes();
    }

    public middleware(): void {
        const { app } = this;

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(cors());
        app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    public initializeDb(): void {
        const MONGO_URL: string = config.MONGODB_URL_WEB;
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(MONGO_URL)
        .then(() => {
            console.log('connected to mongoDB');
        })
        .catch((e) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + e);
        });  
    }

    public routes(): void {
        const router: express.Router = express.Router();
        const { app } = this;

        app.use('/auth', AuthRouter);
    }   
}

export default new Server().app;
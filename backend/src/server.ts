import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as mongoose from 'mongoose';
import * as config from './config/config';
import { jwtMiddleware } from './lib/middleware/jwtMiddleware';
import Auth from './routes/AuthRouter';
import Pin from './routes/PinRouter';
import Like from './routes/LikeRouter';
import Comment from './routes/CommentRouter';
import Common from './routes/CommonRouter';
import Board from './routes/BoardRouter';
import Follow from './routes/FollowRouter';

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
        app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
        app.use(bodyParser.json());
        app.use(cookieParser());
        app.use((req, res, next): void => {
            jwtMiddleware(req, res, next);
        });
        app.use(cors());
        app.use((req, res, next): void => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
            res.header('Access-Control-Allow-Credentials', 'true');
            next();
        });
    }

    private initializeDb(): void {
        const MONGO_URL: string = config.MONGODB_WEB_URL;
        (<any>mongoose).Promise = global.Promise;
        mongoose.connect(MONGO_URL, { useNewUrlParser: true })
        .then(() => {
            console.log('connected to mongoDB');
        })
        .catch((e) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + e);
        }); 
    }

    private routes(): void {
        const { app } = this;

        app.use('/auth', Auth);
        app.use('/common', Common);
        app.use('/follow', Follow);
        app.use('/pin', Pin);
        app.use('/pin/likes', Like);
        app.use('/pin/comments', Comment);
        app.use('/board', Board);
    }   
}

export default new Server().app;
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import sequelize from './database/db';
import { jwtMiddleware } from './lib/middleware/jwtMiddleware';
import Auth from './routes/AuthRouter';
import Pin from './routes/PinRouter';

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
        // force: true
        sequelize.sync({ }).then(() => {
            console.log('DB Connection has been established');
        });
    }

    private routes(): void {
        const { app } = this;

        app.use('/auth', Auth);
        app.use('/pin', Pin);
    }   
}

export default new Server().app;
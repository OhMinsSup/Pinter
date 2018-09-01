import * as mongoose from 'mongoose';
import * as request from 'supertest';
import server from '../../src/server';
import { MONGODB_WEB_URL_TEST } from '../../src/config/config';

beforeEach((done) => {
    function clearDB() {
        // tslint:disable-next-line:forin
        for (let i in mongoose.connection.collections) {
            mongoose.connection.collections[i].remove((err) => { 
              if (err) return console.error(err);
            });
        }
        return done();
    }

    if (mongoose.connection.readyState === 0) {
        mongoose.connect(MONGODB_WEB_URL_TEST)
        .then(() => {
            console.log("connected to mongoDB ✅");
        })
        .catch((err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
            return clearDB();
        });
    } else {
        return clearDB();
    }
}); 

afterEach((done) => {
    mongoose.disconnect();
    return done();
});

describe('Pinter Server', () => {
    test('server response', async () => {
        const response = await request(server).get('/test');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual('test');
    });
});
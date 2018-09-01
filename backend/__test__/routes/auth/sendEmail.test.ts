import * as request from 'supertest';
import server from '../../../src/server';
import User from '../../../src/database/models/User';

const email: string = 'xbkcqcxsz@tmpmail.net';

describe('Auths', () => {
    beforeEach(async (done) => {
        await User.remove({ email }, (err: Error) => {
            if (err) return console.error(err);
            done();
        });
    });
});

describe('Send Email API', () => {
    it('send email api => post', async () => {
        const response = await request(server).post('/auth/send-auth-email')
        .send({
            email: 'xbkcqcxsz@tmpmail.net',
        });

        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(response.body).toEqual({
            isUser: response.body.isUser === true ? true : false,
        });
    });
});
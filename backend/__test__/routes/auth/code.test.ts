import * as request from 'supertest';
import server from '../../../src/server';
import User from '../../../src/database/models/User';

const code: string = 'BJV2TFPwX';

describe('Auths', () => {
    beforeEach(async (done) => {
        await User.remove({ code }, (err: Error) => {
            if (err) return console.error(err);
            done();
        });
    });
});

describe('Code API', () => {
    it('code api => get', async () => {
        const response = await request(server).get(`/auth/code/${code}`);

        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(["email", "registerToken"]),
        );
    });
});
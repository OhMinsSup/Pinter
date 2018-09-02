import * as request from 'supertest';
import server from '../../../src/routes/AuthRouter';
import User from '../../../src/database/models/User';

const username: string = 'test';

describe('Auths', () => {
    beforeEach(async (done) => {
        await User.remove({ username }, (err: Error) => {
            if (err) return console.error(err);
            done();
        });
    });
});

describe('LocalRegister API', () => {
    it('localRegister api => post', async () => {
        const response = await request(server).post('/auth/email-register')
        .send({
            registerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Inhia2NxY3hzekB0bXBtYWlsLm5ldCIsImlhdCI6MTUxNjIzOTAyMn0.aMkc5sNwvzbxLHXb1PQksQBoZ7xRvyePL8VQlHVaznk',
            displayName: 'test',
            username: 'test',
        });

        expect(response.status).toEqual(200);
        expect(response.type).toEqual("application/json");
        expect(Object.keys(response.body)).toEqual(
            expect.arrayContaining(["user", "token"]),
        );
    });
});
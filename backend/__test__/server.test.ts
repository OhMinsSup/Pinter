import * as request from 'supertest';
import server from '../src/server';

describe('Pinter Server', () => {
    test('server response', async () => {
        const response = await request(server).get('/test');
        expect(response.status).toEqual(200);
        expect(response.body).toEqual('test');
    });
});
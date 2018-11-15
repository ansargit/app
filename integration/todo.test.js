const request = require('supertest');
let server;

describe('/api/items', () => {
    beforeEach(() => { 
         server = require('./../app');
    })

    afterEach(() => {
        //server.close();
    })
    
    describe('GET /api/items', () => {
        describe('GET /', () => {
            it('should return all todo items', async () => {
                
                const res = await request(server).get('/api/items');
                expect( res.status ).toBe(200);
                expect(res.body.length).toBe(4);

            })
        })
    })




})

const request = require('supertest');
const db = require("../../app/model");
const Client = db.client;


let server;


describe('/api/clients', () => {


    beforeEach(async () => {
        server = require('../../server');
        await Client.remove({});
    });

    afterEach(async () => {
        server.close();
        await Client.remove({});
    });


    describe('GET /', () => {

        it('should return all clinets', async () => {

            const clients = [
                {
                    name: "Swift Transits",
                    email: "swift.transits@gmail.com",
                    phone: "+1234567890"
                }
            ];

            await Client.collection.insertMany(clients);

            const res = await request(server).get('/api/clients');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(g => g.name === "Swift Transits")).toBeTruthy();
            expect(res.body.some(g => g.email === 'swift.transits@gmail.com')).toBeTruthy();


        })
    });
    describe('GET /:id', () => {
        it('should return not fount if invalid id is passed', async () => {

            const INVALID_CLIENT_ID = '65cbf2c1282c28d92a34b27a';
            const res = await request(server).get('/api/clients/' + INVALID_CLIENT_ID);

            expect(res.status).toBe(404);
            expect(res.body.message).toContain(INVALID_CLIENT_ID);
        });

    });

});



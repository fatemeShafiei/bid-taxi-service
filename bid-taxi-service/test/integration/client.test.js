const request = require('supertest');
const db = require("../../app/model");
const Client = db.client;


let server;


describe('/api/clients', () => {


    beforeEach(() => {
        server = require('../../server');
    });

    afterEach( async() => {
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
            expect(res.body.)


        })
    });


});



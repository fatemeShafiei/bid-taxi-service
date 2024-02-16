const request = require('supertest');
const db = require("../../app/model");
const Ride = db.ride;
const Client = db.client;

let server;


describe('/api/rides', () => {


    beforeEach(async () => {
        server = require('../../server');
        await Ride.remove({});
    });

    afterEach(async () => {
        server.close();
        await Ride.remove({});
    });


    describe('POST /', () => {

        let ride;
        let client;
        let clientId;

        const exec = async () => {
            return await request(server)
                .post('/api/clients/' + clientId + '/rides')
                .send(ride);
        }

        beforeEach(async () => {
             client = new Client({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await client.save();

            clientId = client._id;
            ride = {
                pickupLocation: "place1",
                dropoffLocation: "place2",
                proposedPrice: 20
            };
        })

        it('should return 400 if pickupLocation is empty', async () => {
            ride = {
                pickupLocation: "",
                dropoffLocation: "place2",
                proposedPrice: 20
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if dropoffLocation is empty', async () => {
            ride = {
                pickupLocation: "place1",
                dropoffLocation: "",
                proposedPrice: 20
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if proposedPrice is empty', async () => {
            ride = {
                pickupLocation: "place1",
                dropoffLocation: "place2",
                proposedPrice: ''
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });


        it('should return the client id if it is valid', async () => {

            const res = await exec();

            expect(res.body).toHaveProperty("id");
        });
    });
    describe('GET /', () => {

        it('should return all clinets', async () => {

            const rides = [{
                pickupLocation: "place1",
                dropoffLocation: "place2",
                proposedPrice: 20
            }];


            await Ride.collection.insertMany(rides);

            const res = await request(server).get('/api/rides');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(g => g.pickupLocation === "place1")).toBeTruthy();
            expect(res.body.some(g => g.dropoffLocation === 'place2')).toBeTruthy();
            expect(res.body.some(g => g.proposedPrice === 20)).toBeTruthy();


        })
    });

});



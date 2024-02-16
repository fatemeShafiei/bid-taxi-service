const request = require('supertest');
const db = require("../../app/model");
const Ride = db.ride;
const Client = db.client;
const Bid = db.bid;
const mongoose = require('mongoose');


let server;


describe('/api/bids', () => {


    beforeEach(async () => {
        server = require('../../server');
        await Ride.remove({});
    });

    afterEach(async () => {
        server.close();
        await Ride.remove({});
    });


    describe('POST /', () => {

        let bid;
        let rideId;
        let fleetId;

        const exec = async () => {
            return await request(server)
                .post('/api/fleets/' + fleetId + '/rides/' + rideId + '/bids')
                .send(bid);
        }

        beforeEach(async () => {

            const ride = new Ride({
                pickupLocation: "place1",
                dropoffLocation: "place2",
                proposedPrice: 20
            });
            await ride.save();

            rideId = ride._id;

            const fleet = new Ride({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await fleet.save();

            fleetId = fleet._id;

            bid = {
                bidAmount: 30
            }
        })

        it('should return 400 if bidAmount is empty', async () => {
            bid = {
                bidAmount: ""
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return the bid id if the order is valid', async () => {

            const res = await exec();

            expect(res.body).toHaveProperty("id");
        });
    });
    describe('PUT /', () => {

        let rideId;
        let bidId;
        let fleetId;
        let bid;
        const createBid = async () => {

            return await request(server)
                .post('/api/fleets/' + fleetId + '/rides/' + rideId + '/bids')
                .send(bid);
        }
        const exec = async () => {
            return await request(server)
                .put('/api/rides/' + rideId + '/bids/' + bidId + '/approve')
                .send();
        }

        beforeEach(async () => {

            const ride = new Ride({
                pickupLocation: "place1",
                dropoffLocation: "place2",
                proposedPrice: 20
            });
            await ride.save();

            rideId = ride._id;

            const fleet = new Ride({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await fleet.save();

            fleetId = fleet._id;

            bid = {
                bidAmount: 30
            }

            const rideRes = await createBid()
            bidId = rideRes.body.bids[0]._id
        })

        it('should return the bid id if the order is valid', async () => {

            const res = await exec();

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("id");
        });
        //
        it('should return 404 if ride id is not valid', async () => {
           rideId = 1

            const res = await exec();

            expect(res.status).toBe(404);
        });
    });

});



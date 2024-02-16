const request = require('supertest');
const db = require("../../app/model");
const Fleet = db.fleet;
const mongoose = require('mongoose');


let server;


describe('/api/fleets', () => {


    beforeEach(async () => {
        server = require('../../server');
        await Fleet.remove({});
    });

    afterEach(async () => {
        server.close();
        await Fleet.remove({});
    });


    describe('GET /', () => {

        it('should return all fleets', async () => {

            const fleets = [
                {
                    name: "Swift Transits",
                    email: "swift.transits@gmail.com",
                    phone: "+1234567890"
                }
            ];

            await Fleet.collection.insertMany(fleets);

            const res = await request(server).get('/api/fleets');

            expect(res.status).toBe(200);
            expect(res.body.length).toBe(1);
            expect(res.body.some(g => g.name === "Swift Transits")).toBeTruthy();
            expect(res.body.some(g => g.email === 'swift.transits@gmail.com')).toBeTruthy();


        })
    });
    describe('GET /:id', () => {
        it('should return not fount if invalid id is passed', async () => {

            const INVALID_FLEET_ID = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/fleets/' + INVALID_FLEET_ID);

            expect(res.status).toBe(404);
            expect(res.body.message).toContain(INVALID_FLEET_ID.toString());
        });
        it('should return a fleet if valid id is passed', async () => {
            const fleet = new Fleet({
                name: "Emily",
                email: "emily@gmail.com",
                phone: "+1234007890"
            });
            await fleet.save();

            const res = await request(server).get('/api/fleets/' + fleet._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', fleet.name);
        });

    });
    describe('POST /', () => {

        let newFleet;

        const exec = async () => {
            return await request(server)
                .post('/api/fleets')
                .send(newFleet);
        }

        beforeEach(() => {
            newFleet = {
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            };
        })

        it('should return 400 if fleet name is empty', async () => {
            newFleet = {
                name: "",
                email: "john@gmail.com",
                phone: "+1234007890"
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if fleet phone is empty', async () => {
            newFleet = {
                name: "John",
                email: "john@gmail.com",
                phone: ""
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if fleet email is empty', async () => {
            newFleet = {
                name: "John",
                email: "",
                phone: "+1234007890"
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });


        it('should return the fleet id if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty("id");
        });
    });

    describe('PUT /:id', () => {
        let newFleet;
        let fleet;
        let id;

        const exec = async () => {
            return await request(server)
                .put('/api/fleets/' + id)
                .send(newFleet);
        }

        beforeEach(async () => {

            fleet = new Fleet({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await fleet.save();

            id = fleet._id;
            newFleet = {
                name: "Emily",
                email: "emily@gmail.com",
                phone: "+1234007890"
            };
        })

        it('should return 400 if new fleet is empty', async () => {
            newFleet = {};

            const res = await exec();

            expect(res.status).toBe(400);
        });


        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if fleet with the given id was not found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should update the fleet if input is valid', async () => {
            await exec();

            const updatedFleet = await Fleet.findById(fleet._id);

            expect(updatedFleet.name).toBe(newFleet.name);
        });
    });

    describe('DELETE /:id', () => {
        let fleet;
        let id;

        const exec = async () => {
            return await request(server)
                .delete('/api/fleets/' + id)
                .send();
        }

        beforeEach(async () => {
            fleet = new Fleet({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await fleet.save();

            id = fleet._id;
        })

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if no fleet with the given id was found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should delete the fleet if input is valid', async () => {
            await exec();

            const fleetDB = await Fleet.findById(id);

            expect(fleetDB).toBeNull();
        });

    });

});



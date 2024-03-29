const request = require('supertest');
const db = require("../../app/model");
const Client = db.client;
const mongoose = require('mongoose');


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

            const INVALID_CLIENT_ID = mongoose.Types.ObjectId();
            const res = await request(server).get('/api/clients/' + INVALID_CLIENT_ID);

            expect(res.status).toBe(404);
            expect(res.body.message).toContain(INVALID_CLIENT_ID.toString());
        });
        it('should return a client if valid id is passed', async () => {
            const client = new Client({
                name: "Emily",
                email: "emily@gmail.com",
                phone: "+1234007890"
            });
            await client.save();

            const res = await request(server).get('/api/clients/' + client._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('name', client.name);
        });

    });
    describe('POST /', () => {

        let newClient;

        const exec = async () => {
            return await request(server)
                .post('/api/clients')
                .send(newClient);
        }

        beforeEach(() => {
            newClient = {
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            };
        })

        it('should return 400 if client name is empty', async () => {
            newClient = {
                name: "",
                email: "john@gmail.com",
                phone: "+1234007890"
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if client phone is empty', async () => {
            newClient = {
                name: "John",
                email: "john@gmail.com",
                phone: ""
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });
        it('should return 400 if client email is empty', async () => {
            newClient = {
                name: "John",
                email: "",
                phone: "+1234007890"
            };

            const res = await exec();

            expect(res.status).toBe(400);
        });


        it('should return the client id if it is valid', async () => {
            const res = await exec();

            expect(res.body).toHaveProperty("id");
        });
    });

    describe('PUT /:id', () => {
        let newClient;
        let client;
        let id;

        const exec = async () => {
            return await request(server)
                .put('/api/clients/' + id)
                .send(newClient);
        }

        beforeEach(async () => {

            client = new Client({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await client.save();

            id = client._id;
            newClient = {
                name: "Emily",
                email: "emily@gmail.com",
                phone: "+1234007890"
            };
        })

        it('should return 400 if new client is empty', async () => {
            newClient = {};

            const res = await exec();

            expect(res.status).toBe(400);
        });


        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if client with the given id was not found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should update the client if input is valid', async () => {
            await exec();

            const updatedClient = await Client.findById(client._id);

            expect(updatedClient.name).toBe(newClient.name);
        });
    });

    describe('DELETE /:id', () => {
        let client;
        let id;

        const exec = async () => {
            return await request(server)
                .delete('/api/clients/' + id)
                .send();
        }

        beforeEach(async () => {
            client = new Client({
                name: "John",
                email: "john@gmail.com",
                phone: "+1234007890"
            });
            await client.save();

            id = client._id;
        })

        it('should return 404 if id is invalid', async () => {
            id = 1;

            const res = await exec();

            expect(res.status).toBe(400);
        });

        it('should return 404 if no client with the given id was found', async () => {
            id = mongoose.Types.ObjectId();

            const res = await exec();

            expect(res.status).toBe(404);
        });

        it('should delete the client if input is valid', async () => {
            await exec();

            const clientDB = await Client.findById(id);

            expect(clientDB).toBeNull();
        });

    });

});



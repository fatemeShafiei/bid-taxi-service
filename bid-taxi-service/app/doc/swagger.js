const swaggerAutogen = require('swagger-autogen')();

const PORT = process.env.PORT || 3000;

const HOST = 'localhost:' + PORT

const doc = {
    info: {
        title: 'Bid taxi service API',
        description: 'A taxi app with bidding: Riders propose prices, fleets bid, for efficient and cost-effective rides.'
    },
    host: HOST
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './app/controller/*.js'];


swaggerAutogen(outputFile, endpointsFiles, doc);

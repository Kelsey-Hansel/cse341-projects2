const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "Books and Movies API",
        description: "Books and Movies API"
    },
    host: "localhost:3000",
    schemas: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
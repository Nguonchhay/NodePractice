const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Express API with Swagger",
            version: "1.0.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Nguonchhay Touch",
                url: "",
                email: "tnguonchhay@gmail.com",
            },
        },
        servers: [
            {
                description: "Local server",
                url: "http://localhost:3001",
            },
            {
                description: "Production server",
                url: "https://api.example.com",
            }
        ],
    },
    apis: [
        "./routes/category.js"
    ]
};

const apiDoc = app => {
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerJsdoc(options), { explorer: true })
    );
};

module.exports = apiDoc;
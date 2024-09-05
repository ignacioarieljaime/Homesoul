const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Home Soul",
            version: "1.0.0",
        },
        servers: [{
            url: `${process.env.APP_BASE_URL}`
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [{
            bearerAuth: []
        }],
    },
    apis: ["./swaggerDocuments/*.js",],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
    swaggerSpec
}
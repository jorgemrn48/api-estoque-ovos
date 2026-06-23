import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi:"3.0.0",
        info: {
            title: "API de Estoque e Cálculos",
            version: "1.0.0",
            description: "API para estoque de distribuidora de ovos e cálculos"
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
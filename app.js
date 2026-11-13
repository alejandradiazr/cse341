import express from "express";
import router from "./src/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    return res.status(200).json({
        message: "Welcome to the CSE 341 Web Services API!"
    });
});

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/", router);

export default app;
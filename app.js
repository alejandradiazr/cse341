
import express from "express";

const app = express();

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the CSE 341 Web Services API!"
    });
});

export default app;
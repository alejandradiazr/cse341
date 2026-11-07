
import express from "express";
import { getDb } from "./src/db/connect.js";

const app = express();

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the CSE 341 Web Services API!"
    });
});

// Get all books
app.get("/books", async (req, res) => {
    try {
        const db = getDb();
        const books = await db.collection("books").find().toArray();

        return res.status(200).json(books);
    } catch (error) {
        console.error("Error retrieving books:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while retrieving books."
        });
    }
});

// Get a single book by ID
app.get("/books/:id", async (req, res) => {
    try {
        const db = getDb();
        const bookId = req.params.id;

        const book = await db.collection("books").findOne({
            id: bookId
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        return res.status(200).json(book);
    } catch (error) {
        console.error("Error retrieving book:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while retrieving the book."
        });
    }
});

export default app;
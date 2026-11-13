
import { Router } from "express";
import { getDb } from "./db/connect.js";

const router = Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Server error
 */
// Get all books
router.get("/books", async (req, res) => {
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

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the book
 *     responses:
 *       200:
 *         description: Book found
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
// Get a single book by ID
router.get("/books/:id", async (req, res) => {
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

export default router;
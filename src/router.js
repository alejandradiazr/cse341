import { Router } from "express";
import { getDb } from "./db/connect.js";

import {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} from "./controllers/authors.js";

const router = Router();


/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: List of all authors
 *       500:
 *         description: Server error
 */

// Get all authors
router.get("/authors", getAllAuthors);

/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - birthYear
 *             properties:
 *               id:
 *                 type: string
 *                 example: a4
 *               name:
 *                 type: string
 *                 example: Mark Twain
 *               birthYear:
 *                 type: integer
 *                 example: 1835
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid author data or duplicate ID
 *       500:
 *         description: Server error
 */

// Create a new author
router.post("/authors", createAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       200:
 *         description: Author found
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
// Get an author by ID
router.get("/authors/:id", getAuthorById);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - birthYear
 *             properties:
 *               name:
 *                 type: string
 *                 example: George Orwell
 *               birthYear:
 *                 type: integer
 *                 example: 1903
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid author data
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */

// Update an author
router.put("/authors/:id", updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the author
 *     responses:
 *       204:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       409:
 *         description: Cannot delete an author with associated books
 *       500:
 *         description: Server error
 */

// Delete an author
router.delete("/authors/:id", deleteAuthor);

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
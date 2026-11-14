
import {
    getAllBooks as getAllBooksModel,
    getBookById as getBookByIdModel,
    createBook as createBookModel,
    updateBook as updateBookModel,
    deleteBook as deleteBookModel
} from "../models/books.js";

import { getAuthorById as getAuthorByIdModel } from "../models/authors.js";

// Get all books
export async function getAllBooks(req, res) {
    try {
        const books = await getAllBooksModel();

        return res.status(200).json(books);
    } catch (error) {
        console.error("Error retrieving books:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while retrieving books."
        });
    }
}

// Get a book by ID
export async function getBookById(req, res) {
    try {
        const book = await getBookByIdModel(req.params.id);

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
}

// Create a new book
export async function createBook(req, res) {
    try {
        const { id, authorId, title, publicationDate } = req.body;

        if (
            !id ||
            typeof id !== "string" ||
            !id.trim() ||
            !authorId ||
            typeof authorId !== "string" ||
            !authorId.trim() ||
            !title ||
            typeof title !== "string" ||
            !title.trim() ||
            !publicationDate ||
            typeof publicationDate !== "string" ||
            !publicationDate.trim()
        ) {
            return res.status(400).json({
                message: "Invalid book data."
            });
        }

        const existingBook = await getBookByIdModel(id.trim());

        if (existingBook) {
            return res.status(400).json({
                message: "A book with this ID already exists."
            });
        }

        const author = await getAuthorByIdModel(authorId.trim());

        if (!author) {
            return res.status(400).json({
                message: "The specified author does not exist."
            });
        }

        const book = {
            id: id.trim(),
            authorId: authorId.trim(),
            title: title.trim(),
            publicationDate: publicationDate.trim()
        };

        await createBookModel(book);

        return res.status(201).json({
            message: "Book created successfully.",
            book
        });
    } catch (error) {
        console.error("Error creating book:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while creating the book."
        });
    }
}

// Update a book
export async function updateBook(req, res) {
    try {
        const { authorId, title, publicationDate } = req.body;

        if (
            !authorId ||
            typeof authorId !== "string" ||
            !authorId.trim() ||
            !title ||
            typeof title !== "string" ||
            !title.trim() ||
            !publicationDate ||
            typeof publicationDate !== "string" ||
            !publicationDate.trim()
        ) {
            return res.status(400).json({
                message: "Invalid book data."
            });
        }

        const bookId = req.params.id;

        const existingBook = await getBookByIdModel(bookId);

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        const author = await getAuthorByIdModel(authorId.trim());

        if (!author) {
            return res.status(400).json({
                message: "The specified author does not exist."
            });
        }

        const updatedBook = {
            authorId: authorId.trim(),
            title: title.trim(),
            publicationDate: publicationDate.trim()
        };

        await updateBookModel(bookId, updatedBook);

        return res.status(200).json({
            message: "Book updated successfully.",
            book: {
                id: bookId,
                ...updatedBook
            }
        });
    } catch (error) {
        console.error("Error updating book:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while updating the book."
        });
    }
}

// Delete a book
export async function deleteBook(req, res) {
    try {
        const bookId = req.params.id;

        const existingBook = await getBookByIdModel(bookId);

        if (!existingBook) {
            return res.status(404).json({
                message: "Book not found."
            });
        }

        await deleteBookModel(bookId);

        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting book:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while deleting the book."
        });
    }
}
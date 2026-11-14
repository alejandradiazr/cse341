
import { getDb } from "../db/connect.js";

// Get all books
export async function getAllBooks() {
    const db = getDb();

    return await db.collection("books").find().toArray();
}

// Get a book by ID
export async function getBookById(id) {
    const db = getDb();

    return await db.collection("books").findOne({ id });
}

// Create a new book
export async function createBook(book) {
    const db = getDb();

    return await db.collection("books").insertOne(book);
}

// Update a book
export async function updateBook(id, book) {
    const db = getDb();

    return await db.collection("books").updateOne(
        { id },
        {
            $set: {
                authorId: book.authorId,
                title: book.title,
                publicationDate: book.publicationDate
            }
        }
    );
}

// Delete a book
export async function deleteBook(id) {
    const db = getDb();

    return await db.collection("books").deleteOne({ id });
}
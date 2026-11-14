import { getDb } from "../db/connect.js";

// Get all authors
export async function getAllAuthors() {
    const db = getDb();

    return await db.collection("authors").find().toArray();
}

// Get an author by ID
export async function getAuthorById(id) {
    const db = getDb();

    return await db.collection("authors").findOne({ id });
}

// Create a new author
export async function createAuthor(author) {
    const db = getDb();

    return await db.collection("authors").insertOne(author);
}

// Update an author
export async function updateAuthor(id, author) {
    const db = getDb();

    return await db.collection("authors").updateOne(
        { id },
        {
            $set: {
                name: author.name,
                birthYear: author.birthYear
            }
        }
    );
}

// Check if an author has books
export async function authorHasBooks(id) {
    const db = getDb();

    const book = await db.collection("books").findOne({
        authorId: id
    });

    return Boolean(book);
}

// Delete an author
export async function deleteAuthor(id) {
    const db = getDb();

    return await db.collection("authors").deleteOne({ id });
}
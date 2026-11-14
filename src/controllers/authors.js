import {
    getAllAuthors as getAllAuthorsModel,
    getAuthorById as getAuthorByIdModel,
    createAuthor as createAuthorModel,
    updateAuthor as updateAuthorModel,
    authorHasBooks as authorHasBooksModel,
    deleteAuthor as deleteAuthorModel
} from "../models/authors.js";

// Get all authors
export async function getAllAuthors(req, res) {
    try {
        const authors = await getAllAuthorsModel();

        return res.status(200).json(authors);
    } catch (error) {
        console.error("Error retrieving authors:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while retrieving authors."
        });
    }
}

// Get an author by ID
export async function getAuthorById(req, res) {
    try {
        const author = await getAuthorByIdModel(req.params.id);

        if (!author) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        return res.status(200).json(author);
    } catch (error) {
        console.error("Error retrieving author:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while retrieving the author."
        });
    }
}

// Create a new author
export async function createAuthor(req, res) {
    try {
        const { id, name, birthYear } = req.body;

        if (
            !id ||
            typeof id !== "string" ||
            !id.trim() ||
            !name ||
            typeof name !== "string" ||
            !name.trim() ||
            !Number.isInteger(birthYear) ||
            birthYear <= 0 ||
            birthYear > new Date().getFullYear()
        ) {
            return res.status(400).json({
                message: "Invalid author data."
            });
        }

        const existingAuthor = await getAuthorByIdModel(id);

        if (existingAuthor) {
            return res.status(400).json({
                message: "An author with this ID already exists."
            });
        }

        const author = { id: id.trim(), name: name.trim(), birthYear };

        await createAuthorModel(author);

        return res.status(201).json({
            message: "Author created successfully.",
            author
        });
    } catch (error) {
        console.error("Error creating author:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while creating the author."
        });
    }
}

// Update an author
export async function updateAuthor(req, res) {
    try {
        const { name, birthYear } = req.body;

        if (
            !name ||
            typeof name !== "string" ||
            !name.trim() ||
            !Number.isInteger(birthYear) ||
            birthYear <= 0 ||
            birthYear > new Date().getFullYear()
        ) {
            return res.status(400).json({
                message: "Invalid author data."
            });
        }

        const existingAuthor = await getAuthorByIdModel(req.params.id);

        if (!existingAuthor) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        const author = {
            name: name.trim(),
            birthYear
        };

        await updateAuthorModel(req.params.id, author);

        return res.status(200).json({
            message: "Author updated successfully.",
            author: {
                id: req.params.id,
                ...author
            }
        });
    } catch (error) {
        console.error("Error updating author:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while updating the author."
        });
    }
}

// Delete an author
export async function deleteAuthor(req, res) {
    try {
        const authorId = req.params.id;

        const existingAuthor = await getAuthorByIdModel(authorId);

        if (!existingAuthor) {
            return res.status(404).json({
                message: "Author not found."
            });
        }

        const hasBooks = await authorHasBooksModel(authorId);

        if (hasBooks) {
            return res.status(409).json({
                message: "Cannot delete an author with associated books."
            });
        }

        await deleteAuthorModel(authorId);

        return res.status(204).send();
    } catch (error) {
        console.error("Error deleting author:", error);

        return res.status(500).json({
            message: "An unexpected error occurred while deleting the author."
        });
    }
}
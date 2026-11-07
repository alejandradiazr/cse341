
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

let db;

export async function connectToDatabase() {
    try {
        await client.connect();

        db = client.db("practice");

        console.log(`Connected to database: ${db.databaseName}`);

        return db;
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        throw error;
    }
}

export function getDb() {
    if (!db) {
        throw new Error("Database is not connected.");
    }

    return db;
}
require('dotenv').config();
const { MongoClient } = require('mongodb');

async function resetTags() {
    const uri = process.env.MONGO_MIGRATE_URL; // Using the same var as the config
    const dbName = process.env.MONGODB_NAME;

    if (!uri) {
        console.error("Error: MONGO_MIGRATE_URL is not defined in .env");
        process.exit(1);
    }

    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const db = client.db(dbName);

        // 1. Drop the tags collection
        const collections = await db.listCollections({ name: 'tags' }).toArray();
        if (collections.length > 0) {
            await db.collection('tags').drop();
            console.log("Dropped 'tags' collection.");
        } else {
            console.log("'tags' collection does not exist, skipping drop.");
        }

        // 2. Remove the migration entry
        const migrationFileName = '20251124114323-create-tags-collection.cjs';
        const result = await db.collection('changelog').deleteOne({ fileName: migrationFileName });
        
        if (result.deletedCount === 1) {
            console.log(`Removed migration entry for ${migrationFileName} from changelog.`);
        } else {
            console.log(`Migration entry for ${migrationFileName} not found in changelog.`);
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

resetTags();

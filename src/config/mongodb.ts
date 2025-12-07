import mongoose from 'mongoose';
import 'dotenv/config';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME ||  process.env.DB_NAME;

if (!MONGODB_URI || !MONGO_DB_NAME) {
    throw new Error('MONGODB_URI or MONGO_DB_NAME environment variable is not defined');
}

const mongoDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: MONGO_DB_NAME,
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default mongoDB;

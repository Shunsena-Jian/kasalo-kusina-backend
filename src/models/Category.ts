import mongoose, { Schema } from 'mongoose';
import { type ICategory } from '../types/category.js';

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true},
        description: { type: String },
        image: { type: String },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        autoIndex: false
    }
);

export default mongoose.model<ICategory>('Category', CategorySchema);
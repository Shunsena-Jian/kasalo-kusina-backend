import mongoose, { Schema } from "mongoose";
import { type ITag } from '../types/tag.js';

const TagSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        created_by: { type: String, required: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        autoIndex: false
    }
);

export default mongoose.model<ITag>('Tag', TagSchema);
import mongoose, { Schema } from 'mongoose';
import { type IReview } from '../types/review.js';

const ReviewSchema: Schema = new Schema(
    {
        user_id: { type: String, required: true },
        recipe_id: { type: Schema.Types.ObjectId, ref: 'Recipe', required: true },
        rating: { type: Number, min: 1, max: 5, required: true },
        comment: { type: String, required: true }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        autoIndex: false
    }
)

export default mongoose.model<IReview>('Review', ReviewSchema);
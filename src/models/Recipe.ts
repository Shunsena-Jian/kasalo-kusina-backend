import mongoose, { Schema } from 'mongoose';
import { type IRecipe } from '../types/recipe.js';

const RecipeSchema: Schema = new Schema(
    {
        user_id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        ingredients: [
            {
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                unit: { type: String, required: true },
                _id: false
            }
        ],
        instructions: [
            {
                step: { type: Number, required: true },
                text: { type: String, required: false },
                image: { type: String, required: false },
                _id: false
            }
        ],
        images: [
            {
                type: String,
                _id: false
            }
        ],
        prep_time_min: { type: Number, required: true },
        cook_time_min: { type: Number, required: true },
        servings: { type: Number, required: true },
        difficulty: { type: String, required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
        categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
        status: {
            type: String,
            enum: ['published', 'draft', 'archived'],
            default: 'draft'
        },
        average_rating: { type: Number, default: 0 },
        review_count: { type: Number, default: 0 }
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
        autoIndex: false,
        versionKey: false
    },
);

export default mongoose.model<IRecipe>('Recipe', RecipeSchema);
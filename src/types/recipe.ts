import { Document, Types } from "mongoose";

export interface IRecipeIngredient {
    name: string;
    quantity: number;
    unit: string;
}

export interface IRecipeInstruction {
    step: number;
    text: string;
    image?: string;
}

export interface IRecipe extends Document {
    user_id: Types.ObjectId;
    title: string;
    description: string;
    ingredients: IRecipeIngredient[];
    instructions: IRecipeInstruction[];
    images?: string[];
    prep_time_min: number;
    cook_time_min: number;
    servings: number;
    difficulty: string;
    tags: Types.ObjectId[];
    categories: Types.ObjectId[];
    status: 'published' | 'draft' | 'archived';
    average_rating: number;
    review_count: number;
    created_at: Date;
    updated_at: Date;
}
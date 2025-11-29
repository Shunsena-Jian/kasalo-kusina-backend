import { Document, Types } from "mongoose";

export interface IReview extends Document {
    user_id: Types.ObjectId;
    recipe_id: Types.ObjectId;
    rating: number;
    comment: string;
    created_at: Date;
    updated_at: Date;
}
import { Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
}
import { Document } from "mongoose";

export interface ITag extends Document {
    name: string;
    slug: string;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}
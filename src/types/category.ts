import { Document, type FilterQuery} from "mongoose";

export interface ICategory extends Document {
    name: string;
    slug: string;
    description?: string;
    image?: string;
    created_at: Date;
    updated_at: Date;
}

export type CreateCategory = Pick<ICategory, 'name' | 'slug' | 'description' | 'image'>;

export type CategoryWhere = FilterQuery<ICategory>;
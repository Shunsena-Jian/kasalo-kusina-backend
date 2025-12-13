import Tag from '../models/Tag.js';
import { type ITag } from "../types/tag.js";

class TagRepository {
    async findBySlug(slug: string): Promise<ITag | null> {
        return Tag.findOne({ slug });
    }

    async create(tagData: Partial<ITag>): Promise<ITag> {
        const tag = new Tag(tagData);
        return await tag.save();
    }

    async listTags(): Promise<ITag[]> {
        return Tag.find().sort({ created_at: -1 });
    }
}

export default new TagRepository();
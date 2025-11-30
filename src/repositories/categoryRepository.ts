import Category from '../models/Category.js';
import {
    type ICategory,
    type CategoryWhere,
    type CreateCategory
} from '../types/category.js';

class CategoryRepository {
    async listCategories(): Promise<ICategory[]> {
        return Category.find().sort({ createdAt: -1 });
    }

    async findCategoryWhere(where: CategoryWhere): Promise<ICategory | null> {
        return Category.findOne(where);
    }

    async insertCategory(category: CreateCategory) {
        const newCategory = new Category(category);

        return newCategory.save();
    }
}

export default new CategoryRepository();
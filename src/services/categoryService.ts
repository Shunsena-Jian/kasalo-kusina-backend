import CategoryRepository from "../repositories/categoryRepository.js";

class CategoryService {
    async listCategories() {
        return await CategoryRepository.listCategories();
    }
}

export default new CategoryService();
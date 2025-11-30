import RecipeRepository from '../repositories/recipeRepository.js';
import { type IRecipe } from "../types/recipe.js";
import {RECIPES_STATUS} from "../constants/recipes.js";

class RecipeService {
    async listRecipes(query?: string) {
        return await RecipeRepository.listRecipes(query);
    }

    async getRecipe(id: string) {
        return await RecipeRepository.getRecipeById(id);
    }

    async createRecipe(userId: string, body: Partial<IRecipe>) {
        return await RecipeRepository.insertRecipe({
            ...body,
            user_id: userId,
            status: RECIPES_STATUS.DRAFT
        });
    }
}

export default new RecipeService();
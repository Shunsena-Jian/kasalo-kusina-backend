import RecipeRepository from '../repositories/recipeRepository.js';
import UserRepository from '../repositories/userRepository.js';
import TagRepository from '../repositories/tagRepository.js';
import { type IRecipe } from "../types/recipe.js";
import {RECIPES_STATUS} from "../constants/recipes.js";

class RecipeService {
    async listRecipes(query?: string) {
        return await RecipeRepository.listRecipes(query);
    }

    async getFeaturedRecipes() {
        const recipes = await RecipeRepository.getFeaturedRecipes();
        return this.transformRecipes(recipes);
    }

    async getNewRecipes() {
        const recipes = await RecipeRepository.getNewRecipes();
        return this.transformRecipes(recipes);
    }

    async getHighRatedRecipes() {
        const recipes = await RecipeRepository.listRecipes();
        return this.transformRecipes(recipes);
    }

    async getRecipe(id: string) {
        return await RecipeRepository.getRecipeById(id);
    }

    async createRecipe(userId: string, body: any) {
        if (body.tags && Array.isArray(body.tags) && body.tags.length > 0) {
            const tagIds = [];

            for (const tagName of body.tags) {
                if (typeof tagName !== 'string') continue;

                const slug = tagName.toLowerCase().trim().replace(/\s+/g, '_');

                let tag = await TagRepository.findBySlug(slug);

                if (! tag) {
                    tag = await TagRepository.create({
                        name: tagName,
                        slug: slug,
                        created_by: userId
                    });
                }

                tagIds.push(tag._id);
            }

            body.tags = tagIds;
        }

        return await RecipeRepository.insertRecipe({
            ...body,
            user_id: userId,
            status: RECIPES_STATUS.DRAFT
        });
    }

    private async transformRecipes(recipes: any[]) {
        if (!recipes.length) {
            return [];
        }

        const userIds = [...new Set(recipes.map(r => r.user_id).filter(id => id))];
        const users = await UserRepository.getUsersByIds(userIds);
        const userMap = new Map(users.map(u => [u.id, u]));

        return recipes.map(recipe => {
            const user = userMap.get(recipe.user_id);
            return {
                _id: recipe._id,
                user_name: user ? `${user.first_name} ${user.last_name}` : null,
                title: recipe.title,
                description: recipe.description,
                image: recipe.image || null,
                prep_time_min: recipe.prep_time_min,
                cook_time_min: recipe.cook_time_min,
                difficulty: recipe.difficulty,
                categories: recipe.categories,
                tags: recipe.tags,
                average_rating: recipe.average_rating
            };
        });
    }
}

export default new RecipeService();

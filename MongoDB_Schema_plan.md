Collections
- Recipe
- Tags
- Categories
- Reviews

Review Collection
- _id
- user_id: String
- recipe_id: string
- rating: Number
- comment: String
- created_at: timestamp
- updated_at: timestamp

Recipe
- _id
- recipe_name: string
- user_id: string
- tags = [an array of tag_ids from recipe_tags collections]
- categories = [an array of category_ids from recipe_category collections]
- average_rating: Number
- review_count: Number
- recipe_description: string
- ingredients: array/object [{name, quantity, unit}]
- instructions: array
- media: (array of string (urls))
- prep_time: Number
- cook_time: Number
- servings: Number
- difficulty: Number (min: 1, max: 5)
- recipe_status: String
- created_at: Date
- updated_at: Date

Tags
- _id
- user_id: string (creator of the tag)
- tag_name: string

Categories
- _id
- name: string
- description: string
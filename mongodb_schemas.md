# MongoDB Schema Plan

## 1. Recipes Collection
**Fields:**
- `_id`: ObjectId
- `user_id`: String (Reference to RDS User ID)
- `title`: String
- `description`: String
- `ingredients`: Array<Object> `[{ name: String, quantity: Number, unit: String }]`
- `instructions`: Array<Object> `[{ step: Number, text: String, image: String }]`
- `images`: Array<String>
- `prep_time_min`: Number
- `cook_time_min`: Number
- `servings`: Number
- `difficulty`: Number (1-5)
- `tags`: Array<ObjectId> (Ref: Tags)
- `categories`: Array<ObjectId> (Ref: Categories)
- `status`: String (e.g., 'published', 'draft')
- `average_rating`: Number
- `review_count`: Number
- `created_at`: Date
- `updated_at`: Date

**Indexes:**
- **Text (Search):** `{ title: "text", description: "text", "ingredients.name": "text" }`
  - *Purpose:* Enables full-text search for recipes.
- **Multikey (Filter):** `{ tags: 1 }`
  - *Purpose:* Efficient filtering by tags.
- **Multikey (Filter):** `{ categories: 1 }`
  - *Purpose:* Efficient filtering by categories.
- **Compound (Sorting/Filtering):** `{ categories: 1, average_rating: -1 }`
  - *Purpose:* Fast retrieval of "Top Rated" recipes within a category.
- **Compound (Sorting/Filtering):** `{ tags: 1, created_at: -1 }`
  - *Purpose:* Fast retrieval of "Newest" recipes within a tag.
- **Compound (User Recipes):** `{ user_id: 1, status: 1 }`
  - *Purpose:* Quickly find all published recipes by a specific user.

---

## 2. Reviews Collection
**Fields:**
- `_id`: ObjectId
- `user_id`: String (Reference to RDS User ID)
- `recipe_id`: ObjectId (Ref: Recipes)
- `rating`: Number (1-5)
- `comment`: String
- `created_at`: Date
- `updated_at`: Date

**Indexes:**
- **Compound Unique (Business Logic):** `{ recipe_id: 1, user_id: 1 }`
  - *Purpose:* Ensures a user can only review a specific recipe once.
- **Compound (Sorting):** `{ recipe_id: 1, rating: -1 }`
  - *Purpose:* Efficiently fetch reviews for a recipe, sorted by highest rating.

---

## 3. Tags Collection
**Fields:**
- `_id`: ObjectId
- `name`: String
- `slug`: String
- `created_by`: String (Reference to RDS User ID)
- `created_at`: Date
- `updated_at`: Date

**Indexes:**
- **Unique (Case-Insensitive):** `{ name: 1 }` (with collation strength 2)
  - *Purpose:* Prevents duplicate tags like "Healthy" and "healthy".

---

## 4. Categories Collection
**Fields:**
- `_id`: ObjectId
- `name`: String
- `slug`: String
- `description`: String
- `image`: String
- `created_at`: Date
- `updated_at`: Date

**Indexes:**
- **Unique:** `{ name: 1 }`
- **Unique:** `{ slug: 1 }`

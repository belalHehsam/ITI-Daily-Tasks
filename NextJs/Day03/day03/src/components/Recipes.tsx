import { IRecipe } from "@/types/recipe";
import RecipeCard from "./RecipeCard";

interface RecipesProps {
  recipes: IRecipe[];
}

export default function Recipes({ recipes }: RecipesProps) {
  if (!recipes || recipes.length === 0) {
    return (
      <div className="text-center py-12 text-zinc-500 font-medium">
        No recipes found. Please make sure to seed the database.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recipes.map((recipe) => (
        <RecipeCard key={String(recipe._id)} recipe={recipe} />
      ))}
    </div>
  );
}

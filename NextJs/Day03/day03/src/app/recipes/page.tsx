import Recipe from "@/models/Recipe";
import dbConnect from "@/lib/db";
import Recipes from "@/components/Recipes";
import { IRecipe } from "@/types/recipe";

const getAllRecipes = async (): Promise<IRecipe[]> => {
  await dbConnect();

  const recipes = await Recipe.find({}).sort({ id: 1 }).lean();

  return recipes.map((recipe) => ({
    ...recipe,
    _id: String(recipe._id),
  })) as unknown as IRecipe[];
};

export default async function RecipesPage() {
  const allRecipes = await getAllRecipes();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
          Our Premium Recipes
        </h1>
        <p className="mt-3 text-base text-zinc-650 dark:text-zinc-450">
          Explore delicious meals served straight from our secure server and
          MongoDB database.
        </p>
      </div>

      <Recipes recipes={allRecipes} />
    </main>
  );
}

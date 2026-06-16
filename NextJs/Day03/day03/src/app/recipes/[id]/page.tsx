import Recipe from "@/models/Recipe";
import dbConnect from "@/lib/db";
import RecipeDetails from "@/components/RecipeDetails";
import { IRecipe } from "@/types/recipe";
import { isValidObjectId } from "mongoose";

const getRecipe = async (id: string): Promise<IRecipe | null> => {
  await dbConnect();

  if (isValidObjectId(id)) {
    const recipe = await Recipe.findById(id).lean();
    return recipe
      ? ({ ...recipe, _id: String(recipe._id) } as unknown as IRecipe)
      : null;
  }

  if (isNaN(Number(id)) || id.includes(".")) {
    return null;
  }

  const recipe = await Recipe.findOne({ id: Number(id) }).lean();

  if (!recipe) return null;

  return {
    ...recipe,
    _id: String(recipe._id),
  } as unknown as IRecipe;
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const resolvedParams = await params;

  const recipe = await getRecipe(resolvedParams.id);

  if (!recipe) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-card-border bg-card p-12 text-center shadow-sm">
          <h1 className="text-3xl font-bold text-zinc-950 dark:text-white">
            Recipe not found
          </h1>
          <p className="mt-4 text-zinc-650 dark:text-zinc-450">
            The requested recipe does not exist or may have been removed.
          </p>
          <div className="mt-8">
            <a
              href="/recipes"
              className="inline-flex rounded-3xl bg-amber-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-amber-600"
            >
              Back to Recipes
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <RecipeDetails recipe={recipe} />
    </main>
  );
}

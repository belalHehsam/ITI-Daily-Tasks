import Link from "next/link";
import { IRecipe } from "@/types/recipe";

interface RecipeDetailsProps {
  recipe: IRecipe;
}

export default function RecipeDetails({ recipe }: RecipeDetailsProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 rounded-[2rem] border border-card-border bg-card p-8 shadow-sm lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <span className="inline-flex rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
            {recipe.cuisine} • {recipe.difficulty}
          </span>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-950 dark:text-white">
            {recipe.name}
          </h1>
          <p className="mt-3 text-base leading-7 text-zinc-600 dark:text-zinc-300">
            Rated {recipe.rating} ★ with {recipe.reviewCount} reviews. Serves{" "}
            {recipe.servings} people and takes{" "}
            {recipe.prepTimeMinutes + recipe.cookTimeMinutes} minutes total.
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-zinc-50 p-5 dark:bg-zinc-900">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
                Meal Type
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {recipe.mealType.join(", ")}
              </p>
            </div>
            <div className="rounded-3xl bg-zinc-50 p-5 dark:bg-zinc-900">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-500">
                Calories per Serving
              </p>
              <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
                {recipe.caloriesPerServing} kcal
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-xl overflow-hidden rounded-[1.75rem] border border-card-border bg-zinc-100 shadow-sm dark:bg-zinc-950">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="h-80 w-full object-cover"
          />
          <div className="space-y-3 p-6">
            <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white">
              <span>Prep</span>
              <span>{recipe.prepTimeMinutes} min</span>
            </div>
            <div className="flex items-center justify-between gap-3 rounded-3xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 dark:bg-zinc-900 dark:text-white">
              <span>Cook</span>
              <span>{recipe.cookTimeMinutes} min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="space-y-6 rounded-[2rem] border border-card-border bg-card p-8 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Ingredients
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {recipe.ingredients.map((ingredient) => (
                <span
                  key={ingredient}
                  className="rounded-3xl bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-zinc-950 dark:text-white">
              Instructions
            </h2>
            <ol className="mt-4 space-y-3 text-zinc-600 dark:text-zinc-300">
              {recipe.instructions.map((step, index) => (
                <li
                  key={String(index)}
                  className="rounded-3xl bg-zinc-50 p-4 dark:bg-zinc-900"
                >
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    Step {index + 1}:
                  </span>
                  <p className="mt-2 text-sm leading-6">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <aside className="space-y-6 rounded-[2rem] border border-card-border bg-card p-8 shadow-sm">
          <div className="space-y-4 rounded-3xl bg-zinc-50 p-6 dark:bg-zinc-900">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">
              Quick Facts
            </p>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <li>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  Difficulty:
                </span>{" "}
                {recipe.difficulty}
              </li>
              <li>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  Cuisine:
                </span>{" "}
                {recipe.cuisine}
              </li>
              <li>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  Reviews:
                </span>{" "}
                {recipe.reviewCount}
              </li>
              <li>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  User ID:
                </span>{" "}
                {recipe.userId}
              </li>
            </ul>
          </div>

          <Link
            href="/recipes"
            className="inline-flex w-full items-center justify-center rounded-3xl bg-amber-500 px-5 py-4 text-sm font-bold text-black transition hover:bg-amber-600"
          >
            Back to Recipes
          </Link>
        </aside>
      </div>
    </div>
  );
}

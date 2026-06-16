import Link from "next/link";
import { IRecipe } from "@/types/recipe";

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group">
      <div>
        <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-full font-bold">
            ★ {recipe.rating}
          </span>
        </div>

        <div className="p-4">
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
            {recipe.cuisine} • {recipe.difficulty}
          </span>
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mt-1 line-clamp-1 group-hover:text-amber-500 transition-colors">
            {recipe.name}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 line-clamp-2">
            Ingredients: {recipe.ingredients.join(", ")}
          </p>
        </div>
      </div>

      <div className="p-4 pt-0">
        <Link
          href={`/recipes/${recipe._id ?? recipe.id}`}
          className="w-full inline-flex items-center justify-center px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors text-center cursor-pointer"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

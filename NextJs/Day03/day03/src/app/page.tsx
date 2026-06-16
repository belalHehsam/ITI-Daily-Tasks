import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <section className="space-y-8 rounded-[2rem] border border-card-border bg-card p-10 shadow-sm">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">
            Welcome to Recipe Hub
          </p>
          <h1 className="text-5xl font-extrabold tracking-tight text-zinc-950 dark:text-white sm:text-6xl">
            Discover, browse, and enjoy delicious recipes.
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-300">
            Explore a curated collection of recipes with ratings, ingredients,
            and cuisine details. Navigate to the Recipes page to load all
            recipes from the database.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/recipes"
            className="inline-flex items-center justify-center rounded-3xl bg-amber-500 px-6 py-4 text-base font-bold text-black transition hover:bg-amber-600"
          >
            See Recipes
          </Link>
          <div className="rounded-3xl bg-zinc-50 p-6 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-500">
              Quick start
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

interface ProductsFiltersProps {
  search: string;
  setSearch: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  categories: string[];
}

export default function ProductsFilters({
  search,
  setSearch,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  categories,
}: ProductsFiltersProps) {
  return (
    <div className="mb-8 p-4 bg-card border border-card-border rounded-2xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-3 rounded-xl border border-card-border bg-background outline-none"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 rounded-xl border border-card-border bg-background outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 rounded-xl border border-card-border bg-background outline-none"
        >
          <option value="">Default Sorting</option>

          <option value="price-asc">Price Low To High</option>

          <option value="price-desc">Price High To Low</option>

          <option value="rating">Top Rated</option>
        </select>
      </div>
    </div>
  );
}

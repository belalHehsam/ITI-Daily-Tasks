import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export default function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
        {children}
      </SearchContext.Provider>
    </>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("you are using the Search context outside the provider");
  return context;
}

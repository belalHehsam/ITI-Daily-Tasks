import AuthProvider from "./Auth-Context";
import SearchProvider from "./Search-Context";

export default function StateProvider({ children }) {
  return (
    <SearchProvider>
      <AuthProvider>{children}</AuthProvider>
    </SearchProvider>
  );
}

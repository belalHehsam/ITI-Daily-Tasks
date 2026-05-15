import { createContext, useContext, useState } from "react";

const UIContext = createContext(null);

export const UIProvider = ({ children }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => setIsFormVisible((prev) => !prev);

  return (
    <UIContext.Provider value={{ isFormVisible, setIsFormVisible, toggleForm }}>
      {children}
    </UIContext.Provider>
  );
};

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}

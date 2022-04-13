import { createContext, useEffect, useState } from "react";
import { getItemsFromAPI, getRecipeFromID } from "./utils";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [job, setJob] = useState(null);
  const [filters, setFilters] = useState([]);

  return (
    <GlobalContext.Provider value={{ job, setJob }}>
      {children}
    </GlobalContext.Provider>
  );
};

import React, { createContext, useState } from "react";

// Create the SearchContext
export const SearchContext = createContext();

// Create the SearchProvider component
export const SearchProvider = ({ children }) => {
  // Initialize the searchTerm state using the useState hook
  const [searchTerm, setSearchTerm] = useState("");

  // Define a function to update the searchTerm
  const updateSearchTerm = (term) => {
    setSearchTerm(term);
  };

  // The value object that will be passed to the context provider
  const value = { searchTerm, updateSearchTerm };

  // Render the provider component and pass the value object as the value prop
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};

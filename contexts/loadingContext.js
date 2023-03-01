import { useState, createContext, useEffect } from "react";
export const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  console.log(loading)

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
// Context.js
import { createContext, useContext, useState } from 'react';

const Context = createContext();

export function useSection() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [section, setSection] = useState('Dashboard');

  return (
    <Context.Provider value={{ section, setSection }}>
      {children}
    </Context.Provider>
  );
};

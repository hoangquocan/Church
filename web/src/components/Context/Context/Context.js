import { createContext } from "react";

const Context = createContext()

const ContextProvider = ({ children, groups }) => {
  const group = groups;
  return (
    <Context.Provider value={group}>
      {children}
    </Context.Provider>
  )
}

export { Context, ContextProvider }
import { createContext, useContext } from "react";

const TodoContext = createContext();

export const TodoContextProvider = TodoContext.Provider;

export const useTodoContext = () => {
    return useContext(TodoContext);
}
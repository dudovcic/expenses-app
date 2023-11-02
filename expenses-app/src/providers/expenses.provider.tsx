import { createContext, useState } from "react";
import { ExpenseType } from "../types/expense";

interface IItemContext {
  items: ExpenseType[];
  setItems: (expenses: ExpenseType[]) => void;
}

export const StoreContext = createContext<IItemContext>({
  items: [],
  setItems: () => void 0,
});

export const StoreContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [items, setItems] = useState<IItemContext["items"]>([]);

  return (
    <StoreContext.Provider
      value={{ items, setItems }}
    >
      {children}
    </StoreContext.Provider>
  );
};

import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import { HomePage } from "./pages/home/home";
import { ExpensePage } from "./pages/expense/expense";
import { AddExpensePage } from "./pages/add-expense/add-expense";
import { StoreContextProvider } from "./providers/expenses.provider";
import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <StoreContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expense/:id" element={<ExpensePage />} />
            <Route path="/expense/add" element={<AddExpensePage />} />
          </Routes>
        </BrowserRouter>
      </StoreContextProvider>
    </NextUIProvider>
  );
}

export default App;

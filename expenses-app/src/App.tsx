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
          <div style={{ textAlign: "center" }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/expense/:id" element={<ExpensePage />} />
              <Route path="/expense/add" element={<AddExpensePage />} />
              {/* <Route element={<NotFound />} /> */}
            </Routes>
          </div>
        </BrowserRouter>
      </StoreContextProvider>
    </NextUIProvider>
  );
}

export default App;

import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";

import { HomePage } from "./home";
import { StoreContextProvider } from "../../providers/expenses.provider";

const mockedAddExpense = jest.fn();
const mockedNavigate = jest.fn();

jest.mock("../../api", () => ({
  ...jest.requireActual("../../api"),
  getExpenses: async () => [
    {
      id: "expense-id",
      merchant: "Expense name",
      
    },
  ],
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("<HomePage />", () => {
  beforeEach(async () => {
    mockedAddExpense.mockClear();
  });
  describe("initial render", () => {
    it("should render the items", async () => {
      render(
        <StoreContextProvider>
          <MemoryRouter>
            <HomePage />
          </MemoryRouter>
        </StoreContextProvider>
      );

      await waitFor(() => {
        expect(screen.findByText("Expense name")).toBeInTheDocument();
      });
    });
  });
});

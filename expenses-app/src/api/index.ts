import { ExpenseType } from "../types/expense";
import { UserType } from "../types/user";

const BASE_URL = "http://localhost:3001";

export const getUsers = async (): Promise<UserType[]> => {
  const data = await fetch(`${BASE_URL}/users`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data.json();
};

export const getExpenses = async (
  search: string,
  page = 1,
  maxPerPage = 10
): Promise<ExpenseType[]> => {
  const data = await fetch(
    `${BASE_URL}/expenses?query=${search}&page=${page}&maxPerPage=${maxPerPage}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return data.json();
};

type AddExpenseBody = Omit<ExpenseType, "id">;

export const addExpense = async (data: AddExpenseBody) => {
  const res = await fetch(`${BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

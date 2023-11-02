export interface ExpenseType {
  id: number;
  merchant: string;
  amount: number;
  currency: "GBP";
  userId: string;
  date: string;
}

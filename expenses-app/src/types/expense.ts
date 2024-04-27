export interface ExpenseType {
  id: string;
  merchant: string;
  amount: number;
  currency: "GBP";
  userId: string;
  date: string;
}

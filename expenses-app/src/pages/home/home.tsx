import { getExpenses, deleteExpense as delExpense } from "../../api";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { StoreContext } from "../../providers/expenses.provider";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { items, setItems } = useContext(StoreContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    const expenses = await getExpenses("", page);

    setItems(expenses);

    setLoading(false);
  };

  const deleteExpense = (id: string) => async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    await delExpense(id);

    setItems(items.filter((itm) => itm.id !== id));

    setLoading(false);
  };

  const onPageChange = (page: number) => () => {
    setPage(page);

    fetchExpenses();
  };

  return (
    <div style={{ color: "black" }}>
      <form onSubmit={fetchExpenses}>
        {/* <Input
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={loading}
        /> */}
      </form>
      <ul>
        {items &&
          items.map((expense) => (
            <li key={expense.id} className="mb-2">
              <Card>
                <CardBody>
                  <div>
                    <p>{expense.merchant}</p>
                  </div>
                  <p>
                    {expense.amount} {expense.currency}
                  </p>
                </CardBody>
                <Button onClick={deleteExpense(expense.id)}>Delete</Button>
              </Card>
            </li>
          ))}
      </ul>
      <p>Page {page}</p>
      <Button disabled={loading} onClick={onPageChange(page - 1)}>
        Previous
      </Button>
      <Button disabled={loading} onClick={onPageChange(page + 1)}>
        Next
      </Button>
    </div>
  );
};

import { getExpenses } from "../../api";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import { StoreContext } from "../../providers/expenses.provider";

export const HomePage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { items, setItems } = useContext(StoreContext);

  useEffect(() => {
    onSubmit();
  }, []);

  const onSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    const expenses = await getExpenses("", page);

    setItems(expenses);

    setLoading(false);
  };

  const onPageChange = (page: number) => () => {
    setPage(page);

    onSubmit();
  };

  return (
    <div style={{ color: "black" }}>
      <form onSubmit={onSubmit}>
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
            <li key={expense.id} style={{ marginBottom: 10 }}>
              <Card>
                <CardBody>
                  <div>
                    <p>{expense.merchant}</p>
                  </div>
                  <p>
                    {expense.amount} {expense.currency}
                  </p>
                </CardBody>
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

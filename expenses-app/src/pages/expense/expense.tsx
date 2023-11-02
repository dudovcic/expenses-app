import { useContext } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../providers/expenses.provider";
import { Card, CardHeader } from "@nextui-org/react";

export const ExpensePage = () => {
  const params = useParams();
  const expenseId = Number(params?.id);
  const { items: expenses } = useContext(StoreContext);
  const expense = expenses.find((expense) => expense.id === expenseId);

  return (
    <>
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{expense?.merchant}</p>
          <small className="text-default-500">
            {expense?.currency}, {expense?.amount},{" "}
          </small>
        </CardHeader>
        {/* <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={expense?.img}
          />
        </CardBody> */}
      </Card>
    </>
  );
};

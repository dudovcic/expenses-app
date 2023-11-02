import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
  Spacer,
} from "@nextui-org/react";
import { addExpense, getUsers } from "../../api";
import { UserType } from "../../types/user";

export const AddExpensePage = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [merchant, setMerchant] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  useEffect(() => {
    getUsers().then((usrs) => setUsers(usrs));
  }, []);

  const onAddExpense = async () => {
    await addExpense({
      merchant,
      amount: Math.round(amount * 100),
      currency: "GBP",
      date,
      userId: selectedUser,
    });
  };

  return (
    <>
      <Card className="py-4">
        <CardBody className="overflow-visible py-2">
          <Input
            label="Merchant name"
            onChange={(e) => setMerchant(e.target.value)}
          />
          <Spacer />
          <Input
            label="Amount"
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Spacer />
          <Input label="Currency" value="GBP" disabled />
          <Spacer />
          <Input
            label="Date"
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
          <Spacer />
          <Select label="User" value={selectedUser}>
            {users.map((u, idx) => (
              <SelectItem
                onClick={() => setSelectedUser(u.id)}
                style={{ color: "black" }}
                key={idx}
              >
                {u.username}
              </SelectItem>
            ))}
          </Select>
          <Spacer />
          <Button onClick={() => onAddExpense()}>Submit</Button>
        </CardBody>
      </Card>
    </>
  );
};

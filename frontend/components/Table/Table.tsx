import Router from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { TableContainer } from "./styles";

interface Transaction {
  id: string;
  value: string;
  creditedAccountId: string;
  debitedAccountId: string;
  createdAt: string;
}

interface TableProps {
    filteredTransactions: Transaction[];
}

export default function Table({ filteredTransactions }: TableProps) {
  const [transactions, setTransactions] = useState([]);
  const [creditedUser, setCreditedUser] = useState("");
  const [debitedUser, setDebitedUser] = useState("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      Router.push("/");
    }
    const getTransactions = async () => {
      try {
        const transactions = await axios.get(
          "http://localhost:3001/transaction/all",
          {
            headers: {
              Authorization: JSON.parse(user as string).token,
            },
          }
        );
        setTransactions(transactions.data.transactions);
      } catch (e) {
        Router.push("/");
      }
    };
    getTransactions();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const getUsers = await Promise.all(
          transactions.map(
            async (transaction: Transaction): Promise<string[]> => {
              const creditedUser = await axios.get(
                `http://localhost:3001/users/${transaction.creditedAccountId}`
              );
              const debitedUser = await axios.get(
                `http://localhost:3001/users/${transaction.debitedAccountId}`
              );
              return [creditedUser.data.user, debitedUser.data.user];
            }
          )
        );
        getUsers.map((user) => {
          setCreditedUser(user[0]);
          setDebitedUser(user[1]);
        });
      } catch (e) {
        Router.push("/");
      }
    };
    getUsers();
  }, [transactions]);
  console.log(filteredTransactions);
  const transactionsToUse = filteredTransactions.length === 0 ? transactions : filteredTransactions;
  return (
    <div>
      <TableContainer data-aos="zoom-in">
        <thead>
          <tr>
            <th>#</th>
            <th>conta creditada</th>
            <th>recebeu de</th>
            <th>valor</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {transactionsToUse.map((transaction: Transaction, index: number) => {
            let valueAdapted
            if (transaction.value.indexOf(".") === -1) {
              valueAdapted = `${transaction.value},00`;
            } else {
                valueAdapted = transaction.value.split(".").join(",");
            }
            return (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{creditedUser}</td>
                <td>{debitedUser}</td>
                <td>{valueAdapted}</td>
                <td>{transaction.createdAt}</td>
              </tr>
            );
          })}
        </tbody>
      </TableContainer>
    </div>
  );
}

//esta bem legal para quando o banco estiver com varias transacoes
// com poucas transacoes no banco pode apresentar um comportamento estranho mas nada de grave

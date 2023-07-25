import Router from "next/router";
import { useEffect, useState } from "react";
import { TableContainer } from "./styles";
import bankApi from "../../utils/fetch";

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
  const [transactionsUsers, setTransactionsUsers] = useState([] as string[][]);
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      Router.push("/");
    }
    const getTransactions = async () => {
      try {
        const transactions = await bankApi("get", "/transaction/all", {}, user);
        setTransactions(transactions.data.transactions);
      } catch (e) {
        console.log(e);
      }
    };
    getTransactions();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      const transactionsToUse = filteredTransactions.length === 0 ? transactions : filteredTransactions;
      try {
        const getUsers = await Promise.all(
          transactionsToUse.map(
            async (transaction: Transaction): Promise<string[]> => {
              const creditedUser = await bankApi("get", `/user/${transaction.creditedAccountId}`, {}, localStorage.getItem("user"));
              const debitedUser = await bankApi("get", `/user/${transaction.debitedAccountId}`, {}, localStorage.getItem("user"));
              return [creditedUser.data.user, debitedUser.data.user];
            }
          )
        );
        setTransactionsUsers(getUsers);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();
  }, [transactions, filteredTransactions]);
  const transactionsToUse = filteredTransactions.length === 0 ? transactions : filteredTransactions;
  return (
    <div>
      <TableContainer data-aos="zoom-in">
        <thead>
          <tr>
            <th>#</th>
            <th>conta creditada</th>
            <th>conta debitada</th>
            <th>valor</th>
            <th>data</th>
          </tr>
        </thead>
        <tbody>
          {transactionsToUse.map((transaction: Transaction, index: number) => {
            let valueAdapted
            if (transaction.value.indexOf(".") === -1) {
              valueAdapted = `${transaction.value},00`;
            } else if (transaction.value.indexOf(".") === transaction.value.length - 2) {
              valueAdapted = `${transaction.value.split(".").join(",")}0`;
            } else {
              valueAdapted = transaction.value.split(".").join(",");
            }
            // if para segurar a asincronidade
            if(!transactionsUsers[index]) {
              return;
            }
            const users = transactionsUsers[index];
            return (
              <tr key={index}>
                <td>{transaction.id}</td>
                <td>{users[0]}</td>
                <td>{users[1]}</td>
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

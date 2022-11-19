import { useState } from "react";
import axios from "axios";
import { Container, FilterContainer } from "./styles";
import Table from "./Table";
import Router from "next/router";
import toast from "react-hot-toast";
import theme from "../../styles/theme";

export default function FilterWithTable() {
  const [filterTransactions, setFilterTransactions] = useState([]);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const handleClick = async () => {
    if (date === '' && type === '') {
      toast.error('Você precisa preencher pelo menos um campo', {
        style: {
          background: theme.error,
          color: '#fff'
        }
      });
    }
    try {
      if (date === '' && type === '') {
        toast.error('Você precisa preencher pelo menos um campo', {
          style: {
            background: theme.error,
            color: '#fff'
          }
        });
      }
      if (date === '') {
        const trasactions = await axios.get(`http://localhost:3001/transaction/search?query=${type}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") as string).token,
          }
        });
        setType('');
        return setFilterTransactions(trasactions.data.transactions);
      }
      if (date !== '' && type !== '') {
        const trasactions = await axios.get(`http://localhost:3001/transaction/search?query=${date}?${type}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("user") as string).token,
          }
        });
        setDate('');
        setType('');
        return setFilterTransactions(trasactions.data.transactions);
      }
      const dateTransactions = await axios.get(`http://localhost:3001/transaction/search?query=${date}`, {
        headers: {
          Authorization: JSON.parse(localStorage.getItem("user") as string).token,
        }
      });
      setFilterTransactions(dateTransactions.data.transactions);
      setDate('');
    } catch (e) {
      toast.error("Erro ao buscar transações", {
        style: {
          background: theme.error,
          color: "#fff"
        }
      });
    }
  };
  return (
    <Container>
      <h1 data-aos="fade-right">Histórico</h1>
      <FilterContainer data-aos="fade-right">
        <label htmlFor="cash-out">
          cash-out
          <input 
          type="radio"
          name="filter"
          id="cash-out"
          onClick={() => setType("cash-out")}
          />
        </label>
        <label htmlFor="cash-in">
          cash-in
          <input 
          type="radio"
          name="filter"
          id="cash-in"
          onClick={() => setType("cash-in")}
          />
        </label>
        <label htmlFor="Date">
          <input
            className="date"
            type="text"
            name="date"
            value={date}
            id="Date"
            placeholder="Digite uma data:"
            onChange={({ target }) => setDate(target.value)}
          />
        </label>
        <button type="button" onClick={handleClick}>Filtrar</button>
        <button type="button" onClick={() => setFilterTransactions([])}>Limpar filtros</button>
      </FilterContainer>
      <Table filteredTransactions={filterTransactions} />
    </Container>
  );
}

import { useState } from "react";
import { Container, FilterContainer } from "./styles";
import Table from "./Table";
import toast from "react-hot-toast";
import theme from "../../styles/theme";
import bankApi from "../../utils/fetch";

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
        const trasactions = await bankApi('get', `/transaction/search?query=${type}`, {}, localStorage.getItem("user"));
        setType('');
        return setFilterTransactions(trasactions.data.transactions);
      }
      if (date !== '' && type !== '') {
        const trasactions = await bankApi('get', `/transaction/search?query=${date}?${type}`, {}, localStorage.getItem("user"));
        setDate('');
        setType('');
        return setFilterTransactions(trasactions.data.transactions);
      }
      const dateTransactions = await bankApi('get', `/transaction/search?query=${date}`, {}, localStorage.getItem("user"));
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

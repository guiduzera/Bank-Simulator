import Router from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import theme from "../../styles/theme";
import { Container, TextContainer } from "./styles";

export default function Balance() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const user = localStorage.getItem("user");
    setUsername(JSON.parse(user as string).username);
    if (!user) {
      toast.error("Você precisa estar logado para acessar essa página", {
        style: {
          background: theme.error,
        },
      });
      Router.push("/");
    }
    const getBalance = async () => {
      try {
        const balance = await axios.get("http://localhost:3001/balance", {
          headers: {
            Authorization: JSON.parse(user as string).token,
          },
        });
        setBalance(balance.data.balance.split(".").join(","));
      } catch (e) {
        toast.error("Erro ao buscar saldo", {
          style: {
            background: theme.error,
            color: "#fff"
          }
        });
        Router.push("/");
      }
    };
    getBalance();
  }, [balance]);
  return (
    <Container data-aos="fade-up">
      <div>
        <TextContainer>
          <h1>{`Olá, ${username}`}</h1>
          <h2>{`Seu saldo é de: R$ ${balance}`}</h2>
          <button type="button">Realizar uma transferência</button>
        </TextContainer>
      </div>
    </Container>
  );
}

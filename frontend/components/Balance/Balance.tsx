import Router from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import theme from "../../styles/theme";
import { Container, TextContainer } from "./styles";
import TrasanctionsArea from "./TrasanctionsArea";
import bankApi from "../../utils/fetch";

export default function Balance() {
  const [username, setUsername] = useState("");
  const [balance, setBalance] = useState(0);
  const [transactionsArea, setTransactionsArea] = useState(false);
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
        const balance = await bankApi("get", "/balance", {}, user);
        let valueAdapted;
        if (balance.data.balance.indexOf(".") === -1) {
          valueAdapted = `${balance.data.balance},00`;
        } else {
          valueAdapted = balance.data.balance.split(".").join(",");
        }
        setBalance(valueAdapted);
      } catch (e) {
        toast.error("Erro ao buscar saldo", {
          style: {
            background: theme.error,
            color: "#fff",
          }
        });
        Router.push("/");
      }
    };
    getBalance();
  }, [balance]);
  const appearSection = () => {
    if (transactionsArea) {

      setTransactionsArea(false);
    } else {
      setTransactionsArea(true);
    }
  };
  return (
    <Container data-aos="fade-up">
      <div>
        <TextContainer>
          <h1>{`Olá, ${username}`}</h1>
          <h2>{`Seu saldo é de: R$ ${balance}`}</h2>
          <button type="button" onClick={appearSection}>Realizar uma transferência</button>
        </TextContainer>
        {transactionsArea && <TrasanctionsArea />}
      </div>
    </Container>
  );
}

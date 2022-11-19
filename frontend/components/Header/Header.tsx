import Router from "next/router";
import { Container, LinkContainer } from "./styles";


export default function Header() {
    const logout = () => {
        localStorage.removeItem('user');
        Router.push('/');
    };

  return (
    <Container>
        <ul data-aos="fade-down">
            <LinkContainer>
                Home
            </LinkContainer>
            <LinkContainer>
                <p
                onClick={ logout }
                >Sair</p>
            </LinkContainer>
        </ul>
    </Container>
  )
}

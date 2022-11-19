import { useEffect } from 'react';
import Aos from 'aos';
import Head from 'next/head';
import { HomeContainer } from '../styles/HomeStyles';
import 'aos/dist/aos.css';
import Form from '../components/FormLoginAndRegister/FormLogin';

export default function Login() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <HomeContainer>
      <Head>
        <title>Login | Ng.cash</title>
      </Head>
      <Form />
    </HomeContainer>
  );
}

import Aos from 'aos';
import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import FormRegister from '../../components/FormLoginAndRegister/FormRegister';

export default function Cadastro() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div>
        <Head>
            <title>Cadastro | Ng.cash</title>
        </Head>
        <FormRegister />
    </div>
  )
}

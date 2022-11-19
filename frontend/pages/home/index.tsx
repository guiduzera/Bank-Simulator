import Aos from 'aos';
import Head from 'next/head';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import Balance from '../../components/Balance/Balance';
import FilterWithTable from '../../components/Table/FilterWithTable';

export default function Home() {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  return (
    <div>
      <Head>
        <title>Home | Ng.cash</title>
      </Head>
      <Header />
      <Balance />
      <FilterWithTable />
    </div>
  );
}
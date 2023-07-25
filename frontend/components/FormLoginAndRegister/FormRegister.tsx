/* eslint-disable @next/next/no-img-element */
import { FormEvent, useState } from 'react';
import toast from 'react-hot-toast';
import theme from '../../styles/theme';
import { FormContainer, Input } from './styles';
import { GiWallet } from 'react-icons/gi';
import Router from 'next/router';
import axios from 'axios';
import { HOST, PROTOCOL } from '../../utils/fetch';

export default function FormRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error('Preencha todos os campos para logar', {
        style: {
          background: theme.error,
          color: '#fff'
        }
      });
      return;
    }

    try {
      const registerRequest = await axios.post(`${PROTOCOL}://${HOST}/register`, { username, password });
      localStorage.setItem('user', JSON.stringify({token: registerRequest.data.token, username}));
      toast.success('cadastro realizado com sucesso!', {
        style: {
          background: theme.background,
          color: '#fff'
        }
      });
      Router.push('/home');
    } catch (e) {
      // @ts-ignore
      const { error } = e.response.data;
      toast.error(error, {
        style: {
          background: theme.error,
          color: '#fff'
        }
      })
    } 
  }

  return (
      <FormContainer data-aos="fade-up" onSubmit={handleSubmit}>
        Cadastre-se no <GiWallet size={100} color={theme.primary} /> Ng.cash
        <Input
          placeholder="Nome"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        <Input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button
          type='submit'
        >
          Cadastrar-se
        </button>
      </FormContainer>
  );
}
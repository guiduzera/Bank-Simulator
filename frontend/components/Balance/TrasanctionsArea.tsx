import { useState } from 'react'
import { TransactionsContainer } from './styles'
import Router from 'next/router';
import toast from 'react-hot-toast';
import theme from '../../styles/theme';
import axios from 'axios';
import { HOST, PROTOCOL } from '../../utils/fetch';

export default function TrasanctionsArea() {
    const [transactionName, setTransactionName] = useState('');
    const [transactionValue, setTransactionValue] = useState('Valor da transação: R$ ');
    const makeTransfer = async () => {
        const trueValor = transactionValue.split('R$ ').join('').split(': ')[1].split(',').join('.');
        try {
            const user = localStorage.getItem('user');
            if (!user) {
                Router.push('/');
            }
            await axios.patch(`${PROTOCOL}://${HOST}/transaction`, {
                destinyUser: transactionName,
                value: trueValor,
            }, {
                headers: {
                    Authorization: JSON.parse(user as string).token,
                },
            });
            setTransactionName('');
            setTransactionValue('Valor da transação: R$ ');
            toast.success('Transferência realizada com sucesso', {
                style: {
                    background: theme.primary,
                    color: theme.background,
                },
            });
            window.location.reload();
        } catch (e) {
            // @ts-ignore
            const { error } = e.response.data;
            toast.error(error, {
                style: {
                    background: theme.error,
                    color: '#fff',
                },
            });
        }
    };
  return (
    <TransactionsContainer data-aos="fade-down">
            <label>
                <input 
                type="text"
                name="transaction"
                placeholder="Nome do usuário" 
                value={transactionName}
                onChange={({ target }) => setTransactionName(target.value)} 
                />
            </label>
            <label>
                <input 
                type="text" 
                name="transaction" 
                value={transactionValue} 
                onChange={({ target }) => setTransactionValue(target.value)}
                />
            </label>
            <button type='button' onClick={makeTransfer}>Transferir</button>
    </TransactionsContainer>
  )
}

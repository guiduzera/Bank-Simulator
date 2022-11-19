/* eslint-disable import/prefer-default-export */
import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.section`
    aling-self: center;
    border-radius: 0.5rem;
    border: 1px solid ${({ theme }) => theme.border};
`;

export const FormContainer = styled.form`
  color: ${({ theme }) => theme.primary};
  margin-top: 10rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  > button {
    border: none;
    padding: 1rem 2.5rem;
    color: ${({ theme }) => theme.gradient};
    font-weight: 300;
    font-size: 1.2rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.primary};
    transition: 0.5s;
    width: 30%;
    &:disabled {
      opacity: 0.5;
    }
    &:not(:disabled):hover {
      background: ${({ theme }) => darken(0.1, theme.primary)};
    }
  }
  @media (max-width: 700px) {
    margin-top: 5rem;
    grid-template-columns: 1fr;
  }
  @media (max-width: 450px) {
    > button {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
    }
  }
`;

export const Input = styled.input`
  height: 3rem;
  width: 30%;
  background: ${({ theme }) => theme.inputBackground};
  border: 1px solid ${({ theme }) => theme.border};
  padding: 1.7rem 1.5rem;
  color: ${({ theme }) => theme.primary};
  border-radius: 0.5rem;
  font-size: 1.2rem;
  outline: none;
  transition: 0.5s;
  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
  &::placeholder {
    color: ${({ theme }) => theme.primary};
  }
  @media (max-width: 450px) {
    padding: 1.4rem;
    font-size: 1rem;
  }
`;
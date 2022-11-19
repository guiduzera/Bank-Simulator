/* eslint-disable import/prefer-default-export */
import { lighten } from 'polished';
import styled from 'styled-components';

export const Container = styled.section`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 5rem;
  @media (max-width: 1450px) {
    > div {
      flex: 1;
    }
  }
  @media (max-width: 700px) {
    flex-direction: column;
    > div {
      width: 100%;
    }
  }
`;

export const TextContainer = styled.section`
  margin-left: 5rem;
  line-height: 6rem;
  margin-bottom: 2rem;
  width: 100%;
  h1 {
    font-size: 8rem;
    color: ${({ theme }) => theme.primary};
  }
  h2 {
    font-size: 3rem;
    font-weight: 400;
    color: ${({ theme }) => theme.secondary};
  }
  button {
    background: ${({ theme }) => theme.gradient};
    border: none;
    display: inline-block;
    padding: .75rem 1.25rem;
    border-radius: 10rem;
    color: ${({ theme }) => theme.primary};
    text-transform: uppercase;
    font-size: 1rem;
    letter-spacing: .15rem;
    transition: all .3s;
    position: relative;
    overflow: hidden;
    z-index: 1;
    cursor: pointer;
    &:hover {
      color: ${props => lighten(0.3, props.theme.primary)};
      &:before {
        width: 100%;
      }
    }
  }
  @media (max-width: 1450px) {
    line-height: 4rem;
    h1 {
      font-size: 5rem;
    }
    h2 {
      font-size: 2rem;
    }
  }
  @media (max-width: 1000px) {
    line-height: 4rem;
    h1 {
      font-size: 3rem;
    }
    h2 {
      font-size: 1.5rem;
    }
  }
`;

export const TransactionsContainer = styled.div`
    display: flex;
    transition: all .3s;
    gap: 1rem;
    margin-left: 5rem;
    margin-bottom: 2rem;
    input {
      width: 15rem;
      color: ${({ theme }) => theme.primary};
      font-size: 1rem;
      font-weight: 300;
      border: none;
      border-radius: 0.5rem;
      padding: 0.5rem;
      background: ${({ theme }) => theme.gradient};
  }
  input::placeholder {
      color: ${({ theme }) => theme.primary};
  }
  button {
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.background};
    background: ${({ theme }) => theme.primary};
    border: none;
    border-radius: 0.5rem;
    padding: 0.4rem 1rem;
  }
`;

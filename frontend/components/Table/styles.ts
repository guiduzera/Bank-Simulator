import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    h1 {
        font-size: 2rem;
        color: ${({ theme }) => theme.primary};
        margin-left: 5rem;
    }
`

export const TableContainer = styled.table`
    border-radius: 1rem;
    text-align: center;
    line-height: 3rem;
    margin-bottom: 2rem;
    background: ${({ theme }) => theme.gradient};
    color: ${({ theme }) => theme.primary};
    margin-left: 5rem;
    width: 60%;
`

export const FilterContainer = styled.div`
    margin-left: 6rem;
    display: flex;
    gap: 1rem;
    align-items: center;
    > label {
        cursor: pointer;
        display: flex;
        gap: 0.5rem;
        font-size: 1rem;
        color: ${({ theme }) => theme.primary};
    }
    input.date {
        width: 15rem;
        color: ${({ theme }) => theme.primary};
        font-size: 1rem;
        font-weight: 300;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
        background: ${({ theme }) => theme.gradient};
    }
    input.date::placeholder {
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
    input[type="radio" i] {
        margin-top: 0.3rem;
        cursor: pointer;
        -webkit-appearance: none;
        appearance: none;
        background: ${({ theme }) => theme.primary};
        color: currentColor;
        border: 1px solid ${({ theme }) => theme.background};
        border-radius: 50%;
        display: grid;
        place-content: center;
        width: 0.9rem;
        height: 0.8rem;
    }
    input[type="radio" i]::before {
        content: "";
        width: 0.65em;
        height: 0.65em;
        border-radius: 50%;
        transform: scale(0);
        transition: 120ms transform ease-in-out;
        box-shadow: inset 1em 1em var(--form-control-color);
    }
    input[type="radio"]:checked::before {
        transform: scale(1);
    }
    input[type="radio"]:focus {
        outline: max(2px, 0.15em) solid currentColor;
        outline-offset: max(2px, 0.15em);
    }
`
import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  boder-bottom: 1px solid ${({ theme }) => theme.primary};
  ul {
    display: flex;
    gap: 2rem;
    aling-items: center;
  }
`;

export const LinkContainer = styled.li`
    cursor: pointer;
    text-transform: uppercase;
    color: ${({ theme }) => theme.primary};
    transition: 0.5s;
    &:hover {
      color: ${props => lighten(0.3, props.theme.primary)};
    }
`;
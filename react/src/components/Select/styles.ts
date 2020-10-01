import styled, { css } from 'styled-components';
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #232129;
  border-radius: 10px;
  padding: 16px;
  width: 100%;

  border: 2px solid #232129;
  color: #636360;
  font-weight: 500;

  display: flex;
  align-items: center;

  transition: all 0.5s ease;

  margin-right: 8px;
  margin-top: 8px;
  
  & + div {
    margin-top: 8px;
  }
  
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      color: #ff9900;
      border-color: #ff9900;
    `}
  ${(props) =>
    props.isFilled &&
    css`
      color: #ff9900;
    `}

  select {
    color:  #fff;
    border: 0;
    flex: 1;
    background: #232129;
    font-size: 16px;
    font-weight: 500;
    &::placeholder {
      color: #636360;
    }
  }
  > svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #fff;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;

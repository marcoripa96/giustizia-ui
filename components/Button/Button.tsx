import styled from '@emotion/styled';
import { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'> & {
  appearance?: 'outlined' | 'filled'
}

const Button = styled.button<ButtonProps>(({ appearance = 'filled' }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 20px',
  outline: 'none',
  border: '2px solid #000',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,

  cursor: 'pointer',
  transition: 'background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',

  ...(appearance === 'filled' && {
    color: '#FFF',
    backgroundColor: '#000',
    '&:hover': {
      backgroundColor: '#2e2e2e'
    },
    '&:active': {
      backgroundColor: '#3b3b3b',
    }
  }),
  ...(appearance === 'outlined' && {
    color: '#414141',
    borderColor: '#414141',
    backgroundColor: '#FFF',
    '&:hover': {
      borderColor: '#000',
      color: '#000',
    },
  }),

  '&:disabled': {
    pointerRvents: 'none',
    backgroundColor: '#E0E0E0',
    borderColor: '#E0E0E0',
    color: 'rgba(0, 0, 0, 0.26)'
  }
}));

// const Button = styled.button<ButtonProps>`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 10px 20px;
//   outline: none;
//   border: 2px solid #000;
//   border-radius: 6px;
//   font-size: 14px;
//   font-weight: 600;
//   background-color: #000;
//   color: #FFF;
//   cursor: pointer;
//   transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
//   &:hover {
//     background-color: #2e2e2e;
//   }
//   &:active {
//     background-color: #3b3b3b;
//   }
//   &:disabled {
//     pointer-events: none;
//     background-color: #E0E0E0;
//     border-color: #E0E0E0;
//     color: rgba(0, 0, 0, 0.26);
//   }
// `

export default Button;
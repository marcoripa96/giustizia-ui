import styled from "styled-components";


const Button = styled.button({
  padding: '10px 20px',
  outline: 'none',
  border: '2px solid #000',
  borderRadius: '6px',
  fontSize: '14px',
  fontWeight: 600,
  backgroundColor: '#000',
  color: '#FFF',
  '&:hover': {
    backgroundColor: '#2e2e2e',
  },
  '&:active': {
    backgroundColor: '#3b3b3b',
  },
  cursor: 'pointer'
})

export default Button;
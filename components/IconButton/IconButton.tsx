import styled from "@emotion/styled";

type IconButtonProps = {
  active?: boolean;
}

const IconButton = styled.button<IconButtonProps>(({ active }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  outline: 'none',
  margin: 0,
  padding: '10px',
  borderRadius: '4px',
  color: '#0000006c',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 250ms ease-out',
  '> svg': {
    width: '22px',
    height: '22px',
  },
  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
  },
  '&:active': {
    background: '#cecece'
  },
  ...(active && {
    color: '#0070F3',
    background: '#bfd8fc',
    svg: {
      color: '#0070F3'
    },
    '&:hover': {
      background: '#a4caff',
    },
  })
}));

export default IconButton;
import styled from "@emotion/styled"
import { useEffect, useState } from "react"
import { FaCheck } from '@react-icons/all-files/fa/FaCheck';
import { FaRegCopy } from '@react-icons/all-files/fa/FaRegCopy';

const ButtonClipboard = styled.button({
  position: 'absolute',
  bottom: '3px',
  right: '5px',
  outline: 'none',
  border: 'none',
  color: 'rgb(0 0 0/0.50)',
  backgroundColor: '#F0F0F0',
  borderRadius: '6px',
  padding: '10px',
  cursor: 'pointer',
  svg: {
    width: '18px',
    height: '18px'
  }
})

const CopyToClipboardButton = ({ value }: { value: string }) => {
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    if (clicked) {
      timeoutId = setTimeout(() => {
        setClicked(false)
      }, 1000)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [clicked])

  const handleClick = () => {
    navigator.clipboard.writeText(`${window.location.origin}${value}`)
    setClicked(true)
  }

  return (
    <ButtonClipboard onClick={handleClick}>
      {clicked ? <FaCheck /> : <FaRegCopy />}
    </ButtonClipboard>
  )
}

export default CopyToClipboardButton;
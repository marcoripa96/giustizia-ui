import styled from "@emotion/styled"
import { FiX } from "@react-icons/all-files/fi/FiX"
import { FiPlus } from "@react-icons/all-files/fi/FiPlus"
import { FormEvent, KeyboardEvent, MouseEvent, useCallback, useRef, useState } from "react"
import { useClickOutside, useInput } from "@/hooks"
import { flushSync } from "react-dom"

export type TagListProps = {
  value: string[];
  onChange: (tags: string[]) => void;
}

const List = styled.div({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '10px',
})

const Tag = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
  background: 'rgba(0,0,0,0.05)',
  padding: '4px 6px',
  borderRadius: '6px',
  fontSize: '14px'
})

const DeleteTagButton = styled.button({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  padding: '2px',
  border: 'none',
  outline: 'none',
  borderRadius: '6px',
  background: 'transparent',
  cursor: 'pointer',
  transition: 'all 250ms ease-out',
  '&:active': {
    transform: 'scale(0.9)'
  },
  '&:hover': {
    background: 'rgba(0,0,0,0.1)',
  },
  '> svg': {
    color: 'rgba(0,0,0,0.5)'
  }
})


const AddTagContainer = styled.div<{ isActive: boolean }>(({ isActive }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
  background: 'rgba(0,0,0,0.05)',
  padding: '4px 6px',
  borderRadius: '6px',
  fontSize: '14px',
  height: '30px',

  ...(!isActive && {
    fontSize: '18px',
    transition: 'transform 250ms ease-out, background 250ms ease-out',
    '&:hover': {
      background: 'rgba(0,0,0,0.1)',
    },
    '&:active': {
      transform: 'scale(0.9)'
    },
    '> svg': {
      color: 'rgba(0,0,0,0.5)'
    },
    cursor: 'pointer'
  })
}));

const AddInput = styled.input({
  background: 'transparent',
  border: 'none'
})


const AddButton = ({ onAdd }: { onAdd: (str: string) => void }) => {
  const [isActive, setIsActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const udpate = useCallback(() => {
    const ref = inputRef.current;

    if (isActive && ref) {
      if (ref.value) {
        onAdd(ref.value);
      }
      setIsActive(false);
    }
  }, [isActive]);


  const ref = useClickOutside(udpate);

  const handleClick = () => {
    if (isActive) return;

    flushSync(() => {
      setIsActive(true);
    })
    inputRef.current?.focus();
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    event.stopPropagation();
    flushSync(() => {
      if (event.key === 'Enter' || event.key === 'Tab') {
        udpate();
      }
    })

    if (event.key === 'Tab') {
      event.preventDefault();
      flushSync(() => {
        setIsActive(true);
      })
      inputRef.current?.focus();

    }
  }


  return (
    <AddTagContainer ref={ref} isActive={isActive} onClick={handleClick} onKeyDown={handleKeyDown} >
      {isActive ? <AddInput ref={inputRef} /> : <FiPlus />}
    </AddTagContainer>
  )
}

const TagList = ({ value, onChange }: TagListProps) => {

  const handleAddTag = (str: string) => {
    if (value.includes(str)) return;

    onChange([...value, str]);
  }

  const handleDeleteTag = (event: MouseEvent, index: number) => {
    event.stopPropagation();
    event.preventDefault();
    onChange([...value.slice(0, index), ...value.slice(index + 1, value.length)]);
  }

  return (
    <List>
      {value.map((tag, index) => (
        <Tag key={index}>
          <span>{tag}</span>
          <DeleteTagButton onClick={(event) => handleDeleteTag(event, index)}>
            <FiX />
          </DeleteTagButton>
        </Tag>
      ))}
      <AddButton onAdd={handleAddTag} />
    </List>
  )
}

export default TagList;
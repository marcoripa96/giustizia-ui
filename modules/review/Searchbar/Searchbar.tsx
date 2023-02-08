import styled from "@emotion/styled";
import { ChangeEvent, HTMLAttributes, KeyboardEvent, PropsWithChildren, ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { selectCurrentEntities, useSelector } from "../ReviewProvider/selectors";
import SearchModal from "./SearchModal";
import Fuse from 'fuse.js'
import ScrollArea from "../ReviewList/ScrollArea";
import { FiPlus } from '@react-icons/all-files/fi/FiPlus';
import { motion } from "framer-motion";
import { useDocumentEventListener, useWindowEventListener } from "@/hooks";
import { useOnClickOutside } from "usehooks-ts";
import { Virtualizer } from "@tanstack/react-virtual";
import { Candidate } from "@/server/routers/document";
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import ShortcutButton from "@/components/ShortcutButton/ShortcutButton";
import { Text } from "@nextui-org/react";
import { createNewCandidate } from "../ReviewProvider/utils";

const Container = styled.div({
  display: 'flex',
  width: '100%',
  padding: '20px 0px'
});

const SearchContainer = styled.div<{ active: boolean }>(({ active }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
  height: '50px',
  gap: '10px',
  // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '10px',
  transition: 'box-shadow 200ms ease-in-out',
  '&:hover': {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  },
  '> svg': {
    color: 'rgba(0,0,0,0.7)'
  },
  ...(active && {
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
  })
}));

const Input = styled.input<{ active: boolean }>(({ active }) => ({
  height: '100%',
  flexGrow: 1,
  border: 'none',
  outline: 'none',
  background: 'transparent',
  color: active ? 'rgba(0,0,0,1)' : 'rgba(0,0,0,0.6)'
}));

const SearchModalContent = styled.div({
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
})

const ListItemContainer = styled.div<{ selected: boolean }>(({ selected }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  opacity: selected ? 1 : 0.6,
  transition: 'opacity 200ms ease-in-out',
  cursor: 'pointer'
}));

const ShortcutButtonContainer = styled.div({
  marginLeft: 'auto'
})

type ListItemProps = HTMLAttributes<HTMLDivElement> & PropsWithChildren<{
  selected: boolean;
  Icon?: ReactNode;
  shortcut?: string | string[];
}>;

const ListItem = ({ selected, Icon, children, shortcut, ...props }: ListItemProps) => {
  return (
    <ListItemContainer selected={selected} {...props}>
      {Icon && <IconContainer><FiPlus /></IconContainer>}
      {children}
      {selected && shortcut && shortcut.length > 0 && (
        <ShortcutButtonContainer>
          <ShortcutButton shortcut={shortcut} />
        </ShortcutButtonContainer>
      )}
      {selected && (
        <SelectedArea
          layoutId='box'
          initial={false}
          transition={{ type: 'spring', stiffness: 1000, damping: 80 }} />
      )}
    </ListItemContainer>
  )
}

const NavigationShortcutsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  gap: '5px',
  alignItems: 'center',
  padding: '5px',
  color: 'rgba(0,0,0,0.6)',
  // opacity: 0.6,
  '*': {
    fontSize: '12px',
  }
});

const NavigationShortcutsHeader = () => {
  return (
    <NavigationShortcutsContainer>
      <ShortcutButton shortcut="Enter" />
      <span>to select.</span>
      <ShortcutButton shortcut={['↑', '↓']} />
      <span>to navigate.</span>
      <ShortcutButton shortcut="Esc" />
      <span>to cancel.</span>
    </NavigationShortcutsContainer>
  )
}

const Link = styled.a({
  fontSize: '12px',
  textDecoration: 'none',
  color: 'rgba(56, 141, 239, 0.8)',
  transition: 'color 200ms ease-in-out',
  '&:hover': {
    color: 'rgba(56, 141, 239, 1)',
  }
})

const SelectedArea = styled(motion.div)({
  position: 'absolute',
  background: 'rgba(0,0,0,0.05)',
  borderRadius: '10px',
  inset: 4,
  zIndex: -1
})

const IconContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
  background: 'rgba(0,0,0,0.1)',
  color: 'rgba(0,0,0,0.7)',
  borderRadius: '6px',
  height: 30,
  width: 30,
  '> svg': {
    height: '20px',
    width: '20px'
  }
})

const Divider = styled.div({
  minHeight: '1px',
  width: '100%',
  background: 'rgba(0,0,0,0.1)'
})

const ItemContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minWidth: 0,
  flexGrow: 1
})

type SearchbarProps = HTMLAttributes<HTMLInputElement> & {
  active?: boolean;
  value?: string;
  onItemSelected: (candidate: Candidate) => void;
  onOpen: () => void;
  onClose: () => void;
}



const Searchbar = ({ value: searchKey, active, onChange, onClose, onOpen, onItemSelected }: SearchbarProps) => {
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const entities = useSelector(selectCurrentEntities);

  const refList = useRef<Virtualizer<HTMLDivElement, Element>>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(anchorRef, () => {
    onClose();
  });

  useEffect(() => {
    if (!active) {
      inputRef.current?.blur();
    } else {
      inputRef.current?.focus();
    }
  }, [active]);

  useDocumentEventListener('keydown', (event) => {
    if (active) {
      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault();
          setSelectedItem((index) => {
            const newIndex = index > 0 ? index - 1 : 0;
            refList.current?.scrollToIndex(newIndex + 1, {
              align: 'end'
            });

            return newIndex;
          });
        }
          break;
        case 'ArrowDown': {
          event.preventDefault();
          setSelectedItem((index) => {
            const newIndex = index < currentEntities.length ? index + 1 : index;
            refList.current?.scrollToIndex(newIndex + 1, {
              align: 'end'
            });

            return newIndex;
          });
        }
          break;
        case 'Enter': {
          event.preventDefault();
          selectItem();
        }
          break;
        case 'Escape': {
          event.preventDefault();
          onClose();
        }
      }
    }
  })

  const handleItemClick = () => {
    selectItem();
  }

  const selectItem = () => {
    if (selectedItem > 0) {
      onItemSelected(currentEntities[selectedItem - 1]);
    } else {
      if (searchKey) {
        onItemSelected(createNewCandidate({ title: searchKey, url: searchKey }));
      }
    }
    onClose();
  }


  const handleInputFocus = () => {
    onOpen();
    setSelectedItem(0);
  }

  const currentEntities = useMemo(() => {
    if (!searchKey || !active) {
      return entities;
    }

    const fuse = new Fuse(entities, {
      keys: ['title']
    })
    const result = fuse.search(searchKey).map(({ item }) => item);
    return result;
  }, [entities, searchKey, active]);

  return (
    <Container>
      <SearchContainer ref={anchorRef} active={!!active}>
        <FiSearch />
        <Input
          ref={inputRef}
          placeholder="Search candidate entity..."
          active={!!active}
          onFocus={handleInputFocus}
          value={searchKey}
          onChange={onChange}

        />
        <ShortcutButton shortcut={['\\']} />
        <Text css={{ opacity: 0.6, fontSize: '12px' }}>or</Text>
        <ShortcutButton shortcut={['Ctrl', 'A']} />
        <SearchModal anchorRef={anchorRef} open={active}>
          <SearchModalContent>
            <ListItem
              Icon={<FiPlus />}
              shortcut="Enter"
              selected={selectedItem === 0}
              onMouseMove={() => setSelectedItem(0)}
              onClick={handleItemClick}>
              <ItemContentContainer>
                <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>
                  {searchKey ? `Add "${searchKey}" as new entity...` : 'Add new entity'}
                </span>
              </ItemContentContainer>
            </ListItem>
            <Divider />

            <ScrollArea ref={refList} internalScrollbar>
              {currentEntities.map((item, index) => (
                <ListItem
                  key={item.url}
                  selected={selectedItem === index + 1}
                  onMouseMove={() => setSelectedItem(index + 1)}
                  onClick={handleItemClick}
                  shortcut="Enter">
                  <ItemContentContainer>
                    <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{item.title}</span>
                    <Link target="_blank" href={item.url} onClick={(e) => e.stopPropagation()}>{item.url}</Link>
                  </ItemContentContainer>
                </ListItem>
              ))}
            </ScrollArea>
            <Divider />
            <NavigationShortcutsHeader />
          </SearchModalContent>
        </SearchModal>
      </SearchContainer>
    </Container>
  )
};

export default Searchbar;
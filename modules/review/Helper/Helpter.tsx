import ShortcutButton from "@/components/ShortcutButton/ShortcutButton";
import { useClickOutside } from "@/hooks";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { FiInfo } from '@react-icons/all-files/fi/FiInfo';
import { AnimatePresence, m, motion } from "framer-motion";
import { useState } from "react";

const HelperIconContainer = styled.div({
  position: 'fixed',
  bottom: '20px',
  left: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  borderRadius: '50%',
  fontSize: '28px',
  cursor: 'pointer'
  // boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
})

const PopoverContainer = styled(motion.div)({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  width: '400px',
  left: '100%',
  bottom: '100%',
  padding: '10px',
  borderRadius: '12px',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  background: '#FFF'
})

const CommandRow = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  fontSize: '14px'
})

const Divider = styled.div({
  minHeight: '1px',
  width: '100%',
  background: 'rgba(0,0,0,0.1)'
})


const Helper = () => {
  const [open, setOpen] = useState(false);

  return (
    <HelperIconContainer onClick={() => setOpen((s) => !s)}>
      <FiInfo />
      <AnimatePresence>
        {open && (<PopoverContainer
          initial={{ opacity: 0, scale: 0.98, translateY: 10, translateX: -10 }}
          animate={{ opacity: 1, scale: 1, translateY: 0, translateX: 0 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          exit={{ opacity: 0, scale: 0.98, translateY: 10, translateX: -10 }}>
          <Text css={{ fontSize: '18px', fontWeight: 500 }}>Rapid commands</Text>
          <Divider />
          <CommandRow>
            <ShortcutButton shortcut={["1", "9", "\\"]} />
            →
            <Text>Select candidate as match</Text>
          </CommandRow>
          <CommandRow>
            <ShortcutButton shortcut={["Ctrl", "a"]} />
            →
            <Text css={{ lineHeight: 1.3 }}>Add precompiled entity to list of candidates and select it as match</Text>
          </CommandRow>
          <CommandRow>
            <ShortcutButton shortcut={["Ctrl", "Enter"]} />
            →
            <Text>Confirm current selection</Text>
          </CommandRow>
          <CommandRow>
            <ShortcutButton shortcut={["Ctrl", "Space"]} />
            →
            <Text>Assign NIL to annotation</Text>
          </CommandRow>
          <CommandRow>
            <ShortcutButton shortcut={["\\"]} />
            →
            <Text>Open search</Text>
          </CommandRow>
        </PopoverContainer>
        )}
      </AnimatePresence>

    </HelperIconContainer>
  )
};

export default Helper;
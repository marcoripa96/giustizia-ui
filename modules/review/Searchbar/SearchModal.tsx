import useBBox from "@/hooks/use-bbox";
import styled from "@emotion/styled";
import { MutableRefObject, PropsWithChildren } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { useSelector } from "../ReviewProvider/selectors";

type SearchModalProps = PropsWithChildren<{
  anchorRef: MutableRefObject<HTMLElement | null>;
  open?: boolean;
}>;

const Container = styled(motion.div)({
  position: 'absolute',
  bottom: 'calc(100% + 10px)',
  left: 0,
  width: '100%',
  maxHeight: '500px',
  height: '400px',
  display: 'flex',
  flexDirection: 'column',
  background: '#FFF',
  border: '1px solid rgba(0,0,0,0.1)',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0px 4px 12px',
  borderRadius: '12px',
});



const SearchModal = ({ anchorRef, open: openProp, children }: SearchModalProps) => {
  const bboxAnchor = useBBox(anchorRef);

  const open = openProp && bboxAnchor;

  return (
    <AnimatePresence>
      {open && (
        <Container
          initial={{ opacity: 0, scale: 0.98, translateY: 10 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ ease: "easeInOut", duration: 0.2 }}
          exit={{ opacity: 0, scale: 0.98, translateY: 10 }}>
          {children}
        </Container>
      )}
    </AnimatePresence>
  )
};

export default SearchModal;
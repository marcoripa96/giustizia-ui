import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import * as Portal from '@radix-ui/react-portal';
import { Candidate } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";

type Anchor = {
  x: number;
  y: number;
  candidate: Candidate;
}

type LinkPopoverProps = {
  anchor: Anchor | null;
}

const Container = styled.div<{ anchor: Anchor }>(({ anchor }) => ({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  gap: '5px',
  padding: '10px',
  borderRadius: '6px',
  background: '#FFF',
  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  ...(anchor && {
    top: anchor.y,
    left: anchor.x
  })
}));

const LoadingSpinner = styled(motion.div)({
  width: '10px',
  height: '10px',
  // border: '2px solid #000'
  background: '#000'
})

const LinkPopover = ({ anchor }: LinkPopoverProps) => {
  const { data, isFetching } = useQuery(['wikipedia.getData', { id: `${anchor?.candidate.wikipedia_id}` }], { enabled: !!anchor })

  return (
    <Portal.Root>
      {anchor && (
        <Container
          anchor={anchor}>
          {isFetching ? (
            <LoadingSpinner
              animate={{
                scale: [1, 2, 2, 1, 1],
                rotate: [0, 0, 180, 180, 0],
                borderRadius: ["10%", "10%", "50%", "50%", "10%"]
              }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                times: [0, 0.2, 0.5, 0.8, 1],
                repeat: Infinity,
                repeatDelay: 1
              }}
            />
          ) : (
            <>
              <Text b size="14px">{data?.title}</Text>
              <Text size="12px">{data?.extract}</Text>
            </>
          )}
        </Container>
      )}
    </Portal.Root>

    // <AnimatePresence>
    //   {anchor && (
    // <Container
    //   anchor={anchor}
    //   initial={{ opacity: 0, scale: 0.98, translateY: 10, }}
    //   animate={{ opacity: 1, scale: 1, translateY: 0 }}
    //   transition={{ ease: "easeInOut", duration: 0.2 }}
    //   exit={{ opacity: 0, scale: 0.98, translateY: 10 }}>
    //   <Text b size="14px">Title</Text>
    //   <Text size="12px">Some description</Text>
    // </Container>
    //   )}
    // </AnimatePresence>
  )
};

export default LinkPopover;
import { useParam } from "@/hooks";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { selectIsDocDone, selectSourceInfo, useSelector } from "../ReviewProvider/selectors";
import { FiChevronRight } from '@react-icons/all-files/fi/FiChevronRight';
import { FiChevronLeft } from "@react-icons/all-files/fi/FiChevronLeft";
import { FiFolder } from "@react-icons/all-files/fi/FiFolder";
import { FiSave } from "@react-icons/all-files/fi/FiSave";
import Link from "next/link";
import { motion } from "framer-motion";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '10px'
})

const ButtonsContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px'
})

const Button = styled(motion.a)<{ disabled: boolean }>(({ disabled = false }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  outline: 'none',
  textDecoration: 'none',
  borderRadius: '6px',
  background: 'rgba(0,0,0,0.05)',
  padding: '5px 10px',
  fontSize: '14px',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  transition: 'opacity 200ms ease-in-out',
  ...(disabled && {
    opacity: 0.6,
    pointerEvents: 'none'
  })
}));

const SourceTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '5px',
  minWidth: 0,
  '> svg': {
    flexShrink: 0
  }
})

type SourceHeaderProps = {
  handleOverwriteDocument: () => void;
}

const SourceHeader = ({ handleOverwriteDocument }: SourceHeaderProps) => {
  const { name, total, hasNextPage, hasPreviousPage } = useSelector(selectSourceInfo);
  const [sourceId] = useParam<string>('source');
  const [docId] = useParam<string>('doc');
  const isDocDone = useSelector(selectIsDocDone);

  return (
    <Container>
      <SourceTitle>
        <FiFolder />
        <Text css={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          {name}

        </Text>
        <Text css={{
          color: 'rgba(0,0,0,0.5)'
        }}>
          {`(${docId}/${total})`}
        </Text>
      </SourceTitle>

      <ButtonsContainer>
        <Link passHref href={`/review/${sourceId}/doc/${Number(docId) - 1}`} shallow>
          <Button
            whileTap={{ scale: 0.95 }}
            disabled={!hasPreviousPage}>
            <FiChevronLeft />
            Previous document
          </Button>
        </Link>
        <Link passHref href={`/review/${sourceId}/doc/${Number(docId) + 1}`} shallow>
          <Button disabled={!hasNextPage} whileTap={{ scale: 0.95 }}>
            Next document
            <FiChevronRight />
          </Button>
        </Link>
        {isDocDone && (
          <Button
            onClick={handleOverwriteDocument}
            whileTap={{ scale: 0.95 }}
            disabled={!hasPreviousPage}>
            <FiSave />
            Overwrite changes
          </Button>
        )}

      </ButtonsContainer>
    </Container>
  )
};

export default SourceHeader;
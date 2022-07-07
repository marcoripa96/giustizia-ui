import { useInput } from "@/hooks";
import useDebounce from "@/hooks/use-debounce";
import { GetPaginatedDocuments } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Loading, Modal, Text } from "@nextui-org/react";
import { FiSearch } from '@react-icons/all-files/fi/FiSearch';
import { FiFile } from '@react-icons/all-files/fi/FiFile'
import { FiArrowUpRight } from '@react-icons/all-files/fi/FiArrowUpRight'
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useText } from "@/components";


type SearchModalProps = {
  open: boolean;
  onClose: () => void;
}

const Toolbar = styled.div({
  width: '100%',
  height: '60px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '14px',
  borderBottom: '1px solid rgba(0,0,0,0.1)'
})

const SearchBar = styled.input({
  outline: 'none',
  border: 'none',
  flexGrow: 1,
  height: '100%',
  fontSize: '21px'
})

const Body = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '14px',
  height: '508px'
  // height: '1px',
  // minHeight: '300px'
})

const LoadingEmptyBody = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%'
})



type ResultItemProps = {
  doc: GetPaginatedDocuments['docs'][number]
}

const ResultItemContainer = styled.a({
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 42px 10px 10px',
  borderRadius: '4px',
  '&:not(:last-of-type)': {
    borderBottom: '1px solid rgba(0,0,0,0.1)'
  },
  '&:hover': {
    boxShadow: '0px 0px 0px 2px rgb(0, 114, 245)',
    backgroundColor: 'rgb(0, 114, 245, 0.1)',
    'svg': {
      visibility: 'visible'
    },
  },
  cursor: 'pointer'
})

const ItemActionsContainer = styled.div({
  position: 'absolute',
  right: '10px',
  top: '50%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  marginLeft: 'auto',
  transform: 'translateY(-50%)',
  '> svg': {
    color: 'rgb(0, 114, 245)',
    visibility: 'hidden'
  }
})

const ResultItem = ({ doc }: ResultItemProps) => {
  return (
    <Link href={`/documents/${doc.id}`} passHref>
      <ResultItemContainer>
        <FiFile />
        <Text css={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</Text>
        <ItemActionsContainer>
          <FiArrowUpRight size={18} />
        </ItemActionsContainer>
      </ResultItemContainer>
    </Link>

  )
}

type ResultListProps = {
  docs: GetPaginatedDocuments['docs']
}

const ResultListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column'
})

const ResultList = ({ docs }: ResultListProps) => {
  return (
    <ResultListContainer>
      {docs.map((doc) => <ResultItem key={doc.id} doc={doc} />)}
    </ResultListContainer>
  )
}

const ModalContent = () => {
  const t = useText('documents');
  const { binds } = useInput();
  const debouncedFilter = useDebounce(binds.value, 500);
  const { data, isFetching } = useQuery(['document.inifniteDocuments', { q: debouncedFilter, limit: 10 }], { enabled: !!debouncedFilter });
  const refInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (refInput.current) {
      refInput.current.focus();
    }
  }, []);

  const renderContent = () => {
    if (isFetching) {
      return (
        <LoadingEmptyBody>
          <Loading size="md" />
        </LoadingEmptyBody>
      )
    }
    if (!data) {
      return null;
    }
    if (data.docs.length === 0) {
      return (
        <LoadingEmptyBody>
          <Text size={24} css={{ color: 'rgba(0,0,0,0.5)' }}>{t('modals.noResults')}</Text>
        </LoadingEmptyBody>
      )
    }
    return <ResultList docs={data.docs} />
  }

  return (
    <>
      <Toolbar>
        <FiSearch size={24} />
        <SearchBar ref={refInput} placeholder={t('modals.searchInput')} spellCheck="false" autoComplete="off" {...binds} />
      </Toolbar>
      <Body>
        {renderContent()}
      </Body>
    </>
  )

}

const SearchModal = (props: SearchModalProps) => {
  return (
    <Modal
      blur
      width="650px"
      {...props}>
      <ModalContent />
    </Modal>
  )
};

export default SearchModal;
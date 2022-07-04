import type { GetServerSideProps, NextPage } from 'next'
import { Button, ToolbarLayout } from '@/components'
import styled from '@emotion/styled'
import { useInfiniteQuery, useQuery } from '@/utils/trpc'
import { NextPageWithLayout } from '../_app'
import { ReactElement, useCallback, useEffect } from 'react'
import { Card } from '@nextui-org/react'
import ActionBar from '@/modules/documents/ActionBar'
import DocumentCard from '@/modules/documents/DocumentCard'
import DocumentsList from '@/modules/documents/DocumentsList'
import ToolbarContent from '@/modules/documents/ToolbarContent'
import { useInView } from 'react-intersection-observer'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 24px;
`

const LoadMoreContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
})

const PageTitle = styled.h1`
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 48px;
`

/**
 * Homepage component
 */
const Documents: NextPageWithLayout = () => {
  // const { data: documents } = useQuery(['document.getAllDocuments']);
  const { ref, inView } = useInView({
    threshold: 0
  });
  const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery(['document.inifniteDocuments', { limit: 30 }], {
    staleTime: Infinity,
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    getPreviousPageParam: (firstPage) => firstPage.prevPage ?? undefined
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!data) {
    return null;
  }

  return (
    <Container>
      <ActionBar />
      <DocumentsList data={data} />
      {hasNextPage && (
        <LoadMoreContainer ref={ref}>
          <Button loading={isFetching} onClick={() => fetchNextPage()}>Load More</Button>
        </LoadMoreContainer>
      )}
    </Container>
  )
}

Documents.getLayout = function getLayout(page: ReactElement) {
  return (
    <ToolbarLayout
      toolbarContent={<ToolbarContent />}>
      {page}
    </ToolbarLayout>
  )
}

export default Documents

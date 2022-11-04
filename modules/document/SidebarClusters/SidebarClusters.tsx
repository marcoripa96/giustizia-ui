import { useText } from "@/components";
import { Tree } from "@/components/Tree";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { selectDocumentClusters, useSelector } from "../DocumentProvider/selectors";
import ClusterCard from "./ClusterCard";
import ClusterList from "./ClusterList";

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  height: '100%',
  overflowY: 'auto',
  padding: '10px',
  '::-webkit-scrollbar': {
    height: '4px',
    width: '2px'
  },
  '::-webkit-scrollbar-thumb': {
    background: 'rgba(0,0,0,0.1)'
  }
})


const ContentTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

// export const clusters = [
//   { id: 1, title: 'Cluster title', type: 'JDG', mentions: [{ id: 1, mention: 'something' }] },
//   { id: 2, title: 'Cluster title', type: 'ORG', mentions: [{ id: 2, mention: 'something' }] },
//   { id: 3, title: 'Cluster title', type: 'LOC', mentions: [{ id: 3, mention: 'something' }] }
// ]


const SidebarClusters = () => {
  const t = useText('document');

  const clusters = useSelector(selectDocumentClusters);

  return (
    <Container>
      <ContentTitle>
        <Text b>{t('leftSidebar.clustersContent.title')}</Text>
        <Text css={{ fontSize: '14px', lineHeight: '1', color: 'rgba(0,0,0,0.5)' }}>
          {t('leftSidebar.clustersContent.description')}
        </Text>
      </ContentTitle>
      <ClusterList clusters={clusters} />
    </Container>
  )
};

export default SidebarClusters;
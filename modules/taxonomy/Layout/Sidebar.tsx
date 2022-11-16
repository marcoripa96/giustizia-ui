import { buildTreeFromFlattenedObject, Tree } from "@/components/TreeSpecialization"
import { ContentProps } from "@/pages/taxonomy";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useState } from "react"
import NodeManagement from "../NodeManagement";
import { flatTaxonomy } from "../taxonomy"
import { selectTreeTaxonomy, useSelector } from "../TaxonomyProvider/selectors";
import ZeroShotCandidates from "../ZeroShotCandidates";

// type SidebarContentProps = {
//   changePageContent: (content: ContentProps) => void;
// }

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '450px',
  padding: '5px',
  borderRight: '1px solid #F3F3F5',
  '@media (max-width: 1276px)': {
    width: '400px',
  },
  '@media (max-width: 926px)': {
    width: '350px',
  }
});

const Sidebar = () => {
  const taxonomy = useSelector(selectTreeTaxonomy);
  const router = useRouter();
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');

  const handleNodeSelect = (key: string) => {
    setSelectedNodeKey(key);
    router.push(`/taxonomy/${key.toLowerCase()}/edit`, undefined, { shallow: true });
    // changePageContent({
    //   title: 'Gestisci tipo',
    //   content: <NodeManagement typeKey={key} changePageContent={changePageContent} />
    // })
  }

  const handleNodeDelete = (key: string) => {
    window.alert('TODO: \n1- delete node ' + key + ' from taxonomy (use component that already exists...) \n2- call updateTaxonomy(taxonomy) API');
  }

  const handleNodeAdd = (key: string) => {
    router.push(`/taxonomy/${key.toLowerCase()}/add`, undefined, { shallow: true });
  }

  const handleNodeEdit = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (precompiled)')
    // changePageContent({
    //   title: '',
    //   content: <NodeManagement typeKey={key} changePageContent={changePageContent} />
    // });
  }

  const handleNodeGetZeroShotCandidates = (key: string) => {
    router.push(`/taxonomy/${key.toLowerCase()}/zero-shot-candidates`, undefined, { shallow: true });
    // changePageContent({
    //   title: '',
    //   content: <ZeroShotCandidates typeKey={key} />
    // });
  }


  return (
    <Container>
      <Tree
        items={taxonomy}
        selected={selectedNodeKey}
        onNodeSelect={(key) => handleNodeSelect(key)}
        onNodeDelete={(key) => handleNodeDelete(key)}
        onNodeAdd={(key) => handleNodeAdd(key)}
        onNodeEdit={(key) => handleNodeEdit(key)}
        onNodeGetZeroShotCandidates={(key) => handleNodeGetZeroShotCandidates(key)}
      />
    </Container>
  )

}

export default Sidebar


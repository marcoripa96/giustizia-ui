import { buildTreeFromFlattenedObject, Tree } from "@/components/TreeSpecialization"
import { ContentProps } from "@/pages/taxonomy";
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { useState } from "react"
import NodeManagement from "./NodeManagement";
import { flatTaxonomy } from "./taxonomy"
import { selectTreeTaxonomy, useSelector } from "./TaxonomyProvider/selectors";
import ZeroShotCandidates from "./ZeroShotCandidates";

type SidebarContentProps = {
  changePageContent: (content: ContentProps) => void;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '5px'
})

const SidebarContent = ({ changePageContent }: SidebarContentProps) => {
  const taxonomy = useSelector(selectTreeTaxonomy);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');

  const handleNodeSelect = (key: string) => {
    setSelectedNodeKey(key);
    changePageContent({
      title: 'Gestisci tipo',
      content: <NodeManagement typeKey={key} changePageContent={changePageContent} />
    })
  }

  const handleNodeDelete = (key: string) => {
    window.alert('TODO: \n1- delete node ' + key + ' from taxonomy (use component that already exists...) \n2- call updateTaxonomy(taxonomy) API');
  }

  const handleNodeAdd = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (empty) \n2- set ' + key + ' as father in useState');
    changePageContent({
      title: 'Aggiungi nuovo tipo',
      content: <NodeManagement typeKey={key} addNode changePageContent={changePageContent} />
    });
  }

  const handleNodeEdit = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (precompiled)')
    changePageContent({
      title: '',
      content: <NodeManagement typeKey={key} changePageContent={changePageContent} />
    });
  }

  const handleNodeGetZeroShotCandidates = (key: string) => {
    window.alert('TODO: \n1- set state to show top candidates component')
    changePageContent({
      title: '',
      content: <ZeroShotCandidates typeKey={key} />
    });
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

export default SidebarContent


import { buildTreeFromFlattenedObject, Tree } from "@/components/TreeSpecialization"
import styled from "@emotion/styled";
import { Text } from "@nextui-org/react";
import { useState } from "react"
import NodeManagement from "./NodeManagement";
import { flatTaxonomy } from "./taxonomy"
import { selectTreeTaxonomy, useSelector } from "./TaxonomyProvider/selectors";
import ZeroShotCandidates from "./ZeroShotCandidates";

type SidebarContentProps = {
  changeRightContent: (content: JSX.Element) => void;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '5px'
})

const SidebarContent = ({ changeRightContent }: SidebarContentProps) => {
  const taxonomy = useSelector(selectTreeTaxonomy);
  const [selectedNodeKey, setSelectedNodeKey] = useState<string>('');

  const handleNodeSelect = (key: string) => {
    setSelectedNodeKey(key);
    changeRightContent(<NodeManagement typeKey={key} editMode={false} changeRightContent={changeRightContent} />)
  }

  const handleNodeDelete = (key: string) => {
    window.alert('TODO: \n1- delete node ' + key + ' from taxonomy (use component that already exists...) \n2- call updateTaxonomy(taxonomy) API');
  }

  const handleNodeAdd = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (empty) \n2- set ' + key + ' as father in useState');
    changeRightContent(<NodeManagement typeKey={key} editMode={false} changeRightContent={changeRightContent} />);
  }

  const handleNodeEdit = (key: string) => {
    window.alert('TODO: \n1- set state to show the node add component (precompiled)')
    changeRightContent(<NodeManagement typeKey={key} editMode={true} changeRightContent={changeRightContent} />);
  }

  const handleNodeGetZeroShotCandidates = (key: string) => {
    window.alert('TODO: \n1- set state to show top candidates component')
    changeRightContent(<ZeroShotCandidates typeKey={key} />);
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


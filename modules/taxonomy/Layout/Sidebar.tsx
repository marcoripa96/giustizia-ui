import { Tree } from "@/components/TreeSpecialization"
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { useState } from "react"
import { selectTreeTaxonomy, useSelector, useTaxonomyDispatch } from "../TaxonomyProvider/selectors";

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
  const dispatch = useTaxonomyDispatch();

  const handleNodeSelect = (key: string) => {
    setSelectedNodeKey(key);
    router.push(`/taxonomy/${key}/edit`, undefined, { shallow: true });
  }

  const handleNodeDelete = (key: string) => {
    dispatch({
      type: 'deleteType',
      payload: { key }
    })
    router.push(`/taxonomy`, undefined, { shallow: true });
  }

  const handleNodeAdd = (key: string) => {
    setSelectedNodeKey(key);
    router.push(`/taxonomy/${key}/add`, undefined, { shallow: true });
  }

  const handleNodeEdit = (key: string) => {
    setSelectedNodeKey(key);
    router.push(`/taxonomy/${key}/edit`, undefined, { shallow: true });
  }

  const handleNodeGetZeroShotCandidates = (key: string) => {
    setSelectedNodeKey(key);
    router.push(`/taxonomy/${key}/zero-shot-candidates`, undefined, { shallow: true });
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


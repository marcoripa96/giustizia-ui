import { Tag } from "@/components";
import styled from "@emotion/styled";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import { useMemo } from "react";
import { useDocumentTaxonomy } from "../DocumentProvider/selectors";
import { getNodesPath, isParentNode } from "../SidebarAddAnnotation/Tree";

const ContainerTypesHierarchy = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap'
})


const TypesHierarchy = ({ type }: { type: string }) => {
  const taxonomy = useDocumentTaxonomy();
  const nodes = useMemo(() => getNodesPath(taxonomy, type), [type]);
  return (
    <ContainerTypesHierarchy>
      {nodes.map((node, index) => {
        if (isParentNode(node)) {
          return <Tag key={index} node={node} />
        }
        return (
          <ContainerTypesHierarchy key={index}>
            <FiArrowRight color="rgba(0,0,0,0.1)'" />
            <Tag node={{ ...node, color: 'rgba(0,0,0,0.05)' }} />
          </ContainerTypesHierarchy>
        )
      })}
    </ContainerTypesHierarchy>
  )
}

export default TypesHierarchy;
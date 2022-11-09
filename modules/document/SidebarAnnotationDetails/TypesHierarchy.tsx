import styled from "@emotion/styled";
import { FiArrowRight } from "@react-icons/all-files/fi/FiArrowRight";
import { useMemo } from "react";
import { selectDocumentTaxonomy, useSelector } from "../DocumentProvider/selectors";
import { getAllNodeData, getNodesPath, isParentNode } from "../../../components/Tree";
import { darken } from "polished";

const Tag = styled.span<{ color: string }>(({ color }) => ({
  position: 'relative',
  padding: '2px',
  borderRadius: '6px',
  fontSize: '10px',
  fontWeight: 600,
  background: color,
  color: darken(0.7, color),
  border: `1px solid ${darken(0.05, color)}`,
}));

const TypesHierarchy = ({ type }: { type: string }) => {
  const taxonomy = useSelector(selectDocumentTaxonomy);

  const typesPath = useMemo(() => {
    const nodes = getNodesPath(taxonomy, type);
    return nodes.map((n) => n.label).join(' / ');
  }, [type]);

  const taxonomyNode = useMemo(() => {
    const node = getAllNodeData(taxonomy, type);
    return node;
  }, [taxonomy]);



  return (
    <Tag color={taxonomyNode.color}>{typesPath}</Tag>
  )
}

export default TypesHierarchy;
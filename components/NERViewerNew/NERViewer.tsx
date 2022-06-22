import { Annotation, useNER } from '@/hooks/use-ner';
import styled from '@emotion/styled';
import { Text, TooltipProps } from '@nextui-org/react';
import { NERTag } from '../NERTag';
import { MouseEvent, FocusEvent, useCallback, Fragment, useRef, useEffect, PropsWithChildren } from 'react';
import { FlattenedTaxonomy } from '@/modules/document/DocumentProvider/types';
import { getAllNodeData } from '@/modules/document/SidebarAddAnnotation/Tree';
import { getNodeSelectionOffset, getOriginalOffset, getTextSelection } from './utils';
import { AdditionalAnnotationProps, EntityAnnotation, SectionAnnotation } from '@/server/routers/document';
import { SectionNode, useNewNER } from '@/hooks/use-ner-new';
import { useWindowEventListener } from '@/hooks';
import { useThrottle } from '@/hooks/use-throttle';
import { beautifyString } from '@/utils/shared';
import { FiLink } from '@react-icons/all-files/fi/FiLink';


type NERViewerProps = {
  taxonomy: FlattenedTaxonomy;
  text: string;
  entityAnnotations: EntityAnnotation[];
  sectionAnnotations?: SectionAnnotation[];
  addMode?: boolean;
  addSelectionColor?: string;
  disableLink?: boolean;
  disablePreview?: boolean;
  tooltipPlacement?: TooltipProps['placement'],
  onTagClick?: (event: MouseEvent, tag: EntityAnnotation) => void;
  onTagFocus?: (event: FocusEvent, tag: EntityAnnotation) => void;
  onTextSelection?: (event: MouseEvent, node: SelectionNode) => void;
  onSectionChange?: (sectionId: string) => void;
};

export type SelectionNode = {
  text: string;
  startOffset: number;
  endOffset: number;
}

type MouseUpSelectionEvent = {
  sectionId: number;
  nodeId: number;
}

type SectionRefNode = {
  node: HTMLElement | null;
  section: SectionNode<AdditionalAnnotationProps>;
}

const TextNode = styled.span<{ selectionColor: string }>(({ selectionColor }) => ({
  ...(selectionColor && {
    '::selection': {
      background: selectionColor
    }
  })
}));

const Section = styled.section({
  display: 'flex',
  flexDirection: 'column'
})

const SectionContent = styled.div({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
})

const SectionTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  margin: '15px 0px',
  fontSize: '22px',
  fontWeight: 500,
  '> a': {
    display: 'none'
  },
  '&:hover': {
    '> a': {
      display: 'flex'
    }
  }
})

const IconLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(0,0,0,0.5)',
  fontSize: '18px'
})


const getDefaultProp = () => ({});

function NERViewer({
  taxonomy,
  text,
  entityAnnotations,
  sectionAnnotations,
  tooltipPlacement = 'top',
  addSelectionColor = '',
  addMode = false,
  disableLink = false,
  disablePreview = false,
  onTagClick = getDefaultProp,
  onTagFocus = getDefaultProp,
  onTextSelection = getDefaultProp,
  onSectionChange = getDefaultProp
}: NERViewerProps) {
  const nodes = useNewNER({ text, entityAnnotations, sectionAnnotations });
  const sectionRefs = useRef<SectionRefNode[]>([]);

  // const handleScrollEvent = useCallback(() => {
  //   if (sectionRefs.current.length === 0) {
  //     return;
  //   }

  //   const firstSectionRef = sectionRefs.current[sectionRefs.current.length - 1];
  //   if (firstSectionRef.node && window.scrollY < firstSectionRef.node.offsetTop) {
  //     onSectionChange(firstSectionRef.section.type)
  //     return;
  //   }
  //   for (const ref of sectionRefs.current) {
  //     if (!ref || !ref.node) {
  //       break;
  //     }
  //     if (window.scrollY >= ref.node.offsetTop) {
  //       onSectionChange(ref.section.type)
  //       break;
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   // get first section on render
  //   handleScrollEvent();
  // }, [handleScrollEvent])

  // const throttledScrollHandler = useThrottle(handleScrollEvent, 100);

  // useWindowEventListener('scroll', () => {
  //   // handle section on scroll
  //   handleScrollEvent();
  // })

  /**
   * Get the node from the taxonomy so that I have all info for a certain type
   */
  const getTaxonomyNode = useCallback((key: string) => {
    const node = getAllNodeData(taxonomy, key);
    return node;
  }, [taxonomy]);


  /**
   * Handle text selection
   */
  const handleMouseUp = (event: MouseEvent, eventSelection: MouseUpSelectionEvent) => {
    if (!addMode || !onTextSelection) return;
    // get user text selection
    const selection = getTextSelection();
    if (!selection) {
      return;
    }
    // get offset of what it is selected inside the node where the selection happens
    const nodeSelectionOffset = getNodeSelectionOffset(selection);
    if (!nodeSelectionOffset) {
      return;
    }
    // get the offset to the original text
    const offset = getOriginalOffset({ nodes, ...eventSelection, ...nodeSelectionOffset })
    if (!offset) {
      return;
    }
    const text = selection.toString();
    const selectionNode = { text, ...offset }
    onTextSelection(event, selectionNode);
  }

  const setSectionRefs = (node: HTMLElement | null, section: SectionNode<AdditionalAnnotationProps>) => {
    sectionRefs.current.unshift({
      section,
      node
    })
  }

  return (
    <>
      {nodes.map((section) => {
        return (
          <Section ref={(node) => setSectionRefs(node, section)} key={section.index}>
            <SectionTitle id={section.type}>
              {beautifyString(section.type)}
              <IconLink href={`#${section.type}`}><FiLink /></IconLink>
            </SectionTitle>
            <SectionContent>
              {section.nodes && section.nodes.map((node) => {
                if (node.type === 'text') {
                  return (
                    <TextNode
                      key={node.index}
                      selectionColor={addSelectionColor}
                      onMouseUp={(event) => handleMouseUp(event, {
                        sectionId: section.index,
                        nodeId: node.index
                      })}>
                      {node.text}
                    </TextNode>
                  )
                }
                return (
                  <NERTag
                    key={node.index}
                    annotation={node.props}
                    disableLink={disableLink}
                    tooltipPlacement={tooltipPlacement}
                    disablePreview={disablePreview}
                    onClick={onTagClick}
                    onFocus={onTagFocus}
                    getTaxonomyNode={getTaxonomyNode}
                  >
                    {node.text}
                  </NERTag>
                )
              })}
            </SectionContent>
          </Section>
        )
      })}
    </>
  );
}

export default NERViewer;

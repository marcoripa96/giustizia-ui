import { SectionNode } from "@/lib/ner/core/types";
import { AdditionalAnnotationProps } from "@/server/routers/document";
import { beautifyString } from "@/utils/shared";
import styled from "@emotion/styled"
import { FiLink } from "@react-icons/all-files/fi/FiLink";
import { PropsWithChildren } from "react";

type SectionProps = PropsWithChildren<Omit<SectionNode<AdditionalAnnotationProps, {}>, 'contentNodes'>>;

const SectionContainer = styled.section({
  display: 'flex',
  flexDirection: 'column'
})

const SectionTitle = styled.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '10px',
  margin: '15px 0px',
  fontSize: '22px',
  fontWeight: 600,
  '> a': {
    display: 'none'
  },
  '&:hover': {
    '> a': {
      display: 'flex'
    }
  }
})

const SectionContent = styled.div({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  lineHeight: 1.7,
})

const IconLink = styled.a({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(0,0,0,0.5)',
  fontSize: '18px'
})

function Section({ annotation, children }: SectionProps) {
  const { type } = annotation;

  return (
    <SectionContainer>
      <SectionTitle id={type}>
        {beautifyString(type)}
        <IconLink href={`#${type}`}><FiLink /></IconLink>
      </SectionTitle>
      <SectionContent>
        {children}
      </SectionContent>
    </SectionContainer>
  )
}

export default Section;
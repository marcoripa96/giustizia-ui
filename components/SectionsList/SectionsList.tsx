import styled from "@emotion/styled";
import { Fragment } from "react";

type SectionsListProps = {
  sections: Section[];
  activeSection?: string;
  level?: number;
}

export type Section = {
  id: string;
  label: string;
  subSections?: Section[]
}

type SectionListProps = {
  level: number;
}

type SectionItemProps = {
  active?: boolean;
}

const SectionList = styled.ul<SectionListProps>(({ level }) => ({
  listStyle: 'none',
  margin: 0,
  paddingLeft: `${level * 10}px`
}));

const SectionItem = styled.li<SectionItemProps>(({ active }) => ({
  padding: '3px 8px',
  borderRadius: '4px',
  ...(active && {
    fontWeight: 500,
    background: 'rgba(191, 216, 252, 0.3)',
    color: '#0070F3'
  })
}));


const SectionsList = ({
  sections,
  activeSection,
  level = 0
}: SectionsListProps) => {
  const renderSection = (section: Section) => {
    return (
      <Fragment key={section.id}>
        <SectionItem
          active={activeSection === section.id}>
          {section.label}
        </SectionItem>
        {section.subSections && section.subSections.length > 0
          && <SectionsList sections={section.subSections} level={level + 1} />}
      </Fragment>
    );
  };

  return (
    <SectionList level={level}>
      {sections.map((section) => renderSection(section))}
    </SectionList>
  )
};

export default SectionsList;
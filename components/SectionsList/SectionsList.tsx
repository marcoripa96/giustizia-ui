import styled from "@emotion/styled";
import { Fragment } from "react";

type SectionsListProps = {
  sections: Section[];
  onChange?: (sectionId: string) => void;
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
  '&:hover': {
    color: 'rgb(0, 112, 243)'
  },
  ...(active && {
    fontWeight: 500,
    background: 'rgba(191, 216, 252, 0.3)',
    color: 'rgb(0, 112, 243)'
  })
}));


const SectionsList = ({
  sections,
  activeSection,
  onChange = () => { },
  level = 0
}: SectionsListProps) => {
  const renderSection = (section: Section) => {
    return (
      <Fragment key={section.id}>
        <SectionItem
          active={activeSection === section.id}>
          <a
            href={`#${section.id}`}
            onClick={() => onChange(section.id)}>
            {section.label}
          </a>
        </SectionItem>
        {section.subSections && section.subSections.length > 0
          && (
            <SectionsList
              sections={section.subSections}
              onChange={onChange}
              level={level + 1} />
          )}
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
import { darken } from "polished";
import { FC } from "react";
import styled from "styled-components";
import { MENTION_COLORS } from "./mention-tag-colors";
import { Mention } from "./types";

type MentionTagProps = {
  mention: Mention;
};

type TagProps = {
  type: keyof typeof MENTION_COLORS;
}

const Tag = styled.a<TagProps>`
  padding: 2px 5px;
  border-radius: 6px;
  background: ${({ type }) => MENTION_COLORS[type]};
  transition: background 250ms ease-out;

  &:hover {
    background: ${({ type }) => darken(0.15, MENTION_COLORS[type])}
  }
`

const MentionType = styled.span<TagProps>`
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 6px;
  padding: 0 3px;
  background: ${({ type }) => darken(0.1, MENTION_COLORS[type])};
  border-radius: 4px;
`

const MentionTag: FC<MentionTagProps> = ({ children, mention }) => {
  const { ner_type, top_url } = mention;

  return (
    <Tag type={ner_type} href={top_url} target="_blank">
      {children}
      <MentionType type={ner_type}>{ner_type}</MentionType>
    </Tag>
  )
};

export default MentionTag;
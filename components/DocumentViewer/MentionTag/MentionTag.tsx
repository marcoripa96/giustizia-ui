import { darken } from "polished";
import { ElementType, FC, HTMLAttributes, KeyboardEvent, MouseEvent, useState } from "react";
import styled from "styled-components";
import { MENTION_COLORS } from "./mention-tag-colors";
import { Mention } from "../types";

type MentionTagProps = HTMLAttributes<HTMLDivElement> & {
  mention: Mention;
  virtualDocIndex: number;
  onClick?: (props: MentionTagOnClickProps) => void;
};

export type MentionTagOnClickProps = { virtualDocIndex: number, mention: Mention };

type TagProps = {
  type: keyof typeof MENTION_COLORS;
}

const Tag = styled.span<TagProps>`
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

const MentionTag: FC<MentionTagProps> = ({
  mention,
  virtualDocIndex,
  onClick,
  children,
  ...props
}) => {
  const [isLinkAction, setIsLinkAction] = useState(false);
  const { ner_type, top_url } = mention;



  const onMouseEnter = (event: MouseEvent) => {
    setIsLinkAction(event.ctrlKey);
  }
  const onMouseLeave = (event: MouseEvent) => {
    setIsLinkAction(false);
  }

  const element: ElementType = isLinkAction ? 'a' : 'span';
  // props for the click event
  const onClickProps = { virtualDocIndex, mention };
  // define the props for the tag
  const tagProps = {
    as: element,
    type: ner_type,
    // so that div is selectable
    tabIndex: 0,
    ...(isLinkAction && { href: top_url, target: '_blank' }),
    ...props
  }
  return (
    <Tag
      onMouseMove={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() => onClick ? onClick(onClickProps) : {}}
      {...tagProps}>
      {children}
      <MentionType type={ner_type}>{ner_type}</MentionType>
    </Tag>
  )
};

export default MentionTag;
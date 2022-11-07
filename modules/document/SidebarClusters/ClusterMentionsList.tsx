import { Cluster } from '@/server/routers/document';
import styled from '@emotion/styled';
import { Text } from '@nextui-org/react';
import { MouseEvent, useState } from 'react';
import { scrollEntityIntoView } from '../DocumentProvider/utils';
import { FiArrowRight } from '@react-icons/all-files/fi/FiArrowRight';
import { useDocumentDispatch } from '../DocumentProvider/selectors';

type ClusterMentionsListProps = {
  mentions: Cluster['mentions'];
};

const ListContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '100%',
});

const MentionButton = styled.button({
  position: 'relative',
  background: '#FFF',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  fontSize: '12px',
  border: '1px solid #F3F3F5',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background 250ms ease-out, transform 150ms ease-out',
  '&:active': {
    background: '#ececec',
    transform: 'scale(0.95)',
  },
  '&:hover': {
    paddingRight: '20px',
    background: '#fcfcfc',
    '> div': {
      visibility: 'visible',
      transform: 'translateY(-50%) translateX(10%)',
    },
  },
});

const IconButtonContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  top: '50%',
  right: '5px',
  transform: 'translateY(-50%)',
  transition: 'transform 150ms ease-out',
  visibility: 'hidden',
});

const ClusterMentionsList = ({ mentions }: ClusterMentionsListProps) => {
  const dispatch = useDocumentDispatch();

  const handleOnClick = (id: number) => (event: MouseEvent) => {
    event.stopPropagation();

    const element = document.getElementById(`entity-tag-${id}`);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          observer.unobserve(element);
          dispatch({
            type: 'highlightAnnotation',
            payload: {
              annotationId: id,
            },
          });
        }
      },
      { root: null, rootMargin: '0px', threshold: 1 }
    );

    observer.observe(element);
  };

  return (
    <ListContainer>
      {mentions.map((m) => (
        <MentionButton
          title={m.mention}
          onClick={handleOnClick(m.id)}
          key={m.id}
        >
          {m.mention}
          <IconButtonContainer>
            <FiArrowRight />
          </IconButtonContainer>
        </MentionButton>
      ))}
    </ListContainer>
  );
};

export default ClusterMentionsList;

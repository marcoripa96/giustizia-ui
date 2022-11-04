import { ChildNodeWithColor } from "@/components/Tree";
import { EntityAnnotation } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Grid, Image, Text } from "@nextui-org/react";
import { useMemo } from "react";
import { Button } from "../Button";
import { Tag } from "../Tag";
import EntityCardSkeleton from "./EntityCardSkeleton";

export type EntityCardProps = {
  annotation: EntityAnnotation;
  getTaxonomyNode: (key: string) => ChildNodeWithColor;
}

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  padding: '12px',
  width: '300px',
  gap: '5px'
})

const ContainerImgTitle = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
  width: '70%'
})

const EntityCard = ({ annotation, getTaxonomyNode }: EntityCardProps) => {
  const { top_candidate } = annotation.features.linking;

  const { data, isFetching } = useQuery(
    ['annotation.getAnnotationDetails', { id: top_candidate.id, indexer: top_candidate.indexer }],
    { staleTime: Infinity, enabled: !!top_candidate });

  const node = useMemo(() => getTaxonomyNode(annotation.type), [annotation]);

  if (isFetching) {
    return <EntityCardSkeleton />;
  }

  return (
    <Container>
      <Grid.Container
        direction="row"
        alignItems="flex-start">
        <ContainerImgTitle>
          {data?.thumbnail && (
            <Image
              css={{
                border: '1px solid #EAECED',
                margin: '0'
              }}
              width={100}
              height={80}
              objectFit="cover"
              src={data?.thumbnail.source}
              alt="" />)}
          <Text h5 css={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {data?.title}
          </Text>
        </ContainerImgTitle>
        <Button
          as="a"
          href={top_candidate.url}
          target="_blank"
          rounded
          bordered
          css={{
            margin: '0 auto',
            color: '#000',
            borderColor: '#000',
            minWidth: 'min-content',
            maxHeight: '30px'
          }}
          size="sm">
          Details
        </Button>
      </Grid.Container>
      <Tag node={node} css={{ alignSelf: 'flex-start' }} />
      <Text
        css={{
          fontSize: '14px'
        }}>
        {data?.extract}
      </Text>
    </Container>
  )
}

export default EntityCard;
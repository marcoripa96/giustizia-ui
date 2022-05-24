import { ChildNodeWithColor } from "@/modules/document/SidebarAddAnnotation/Tree";
import { NERAnnotation } from "@/server/routers/document";
import { useQuery } from "@/utils/trpc";
import styled from "@emotion/styled";
import { Grid, Image, Text } from "@nextui-org/react";
import { Button } from "../Button";
import { Tag } from "../Tag";
import EntityCardSkeleton from "./EntityCardSkeleton";

export type EntityCardProps = {
  annotation: NERAnnotation;
  node: ChildNodeWithColor;
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

const EntityCard = ({ annotation, node }: EntityCardProps) => {
  const { top_wikipedia_id, top_url, ner_type } = annotation;

  const { data, isFetching } = useQuery(['annotation.getAnnotationDetails', { id: top_wikipedia_id || '' }], { staleTime: Infinity });

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
          href={top_url}
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
import { Card, Col, Divider, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt'
import styled from "@emotion/styled";

type DocumentCardProps = {
  _id: string,
  id: number;
  name: string;
  preview: string;
}

const IconContainer = styled.div({
  flexShrink: 0
})

const DocumentCard = ({ id, name, preview }: DocumentCardProps) => {
  return (
    <Link href={`/documents/${id}`} passHref>
      <Card
        as="a"
        variant="bordered"
        isPressable
        isHoverable
        disableRipple
        css={{ borderWidth: '1px', width: 'auto', boxShadow: 'none !important' }}>
        <Card.Body css={{ overflow: 'hidden', height: '150px', fontSize: '14px', WebkitLineClamp: '7', WebkitBoxOrient: 'vertical', display: ' -webkit-box', wordBreak: 'break-word' }}>
          {preview}
        </Card.Body>
        <Card.Footer>
          <Row align="center" css={{ gap: '10px' }}>
            <Col>
              <Text h6 css={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{name}</Text>
              <Text css={{ color: 'rgba(0, 0, 0, .5)', fontSize: '14px' }}>Edited 2 days ago</Text>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  )
};

export default DocumentCard;
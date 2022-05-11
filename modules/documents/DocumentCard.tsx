import { Card, Col, Divider, Row, Text } from "@nextui-org/react";
import Link from "next/link";
import { FaFileAlt } from '@react-icons/all-files/fa/FaFileAlt'

type DocumentCardProps = {
  id: string;
  title: string;
  preview: string;
}

const DocumentCard = ({ id, title, preview }: DocumentCardProps) => {
  return (
    <Link href={`/documents/${id}`} passHref>
      <Card
        as="a"
        bordered
        clickable
        hoverable
        shadow={false}
        ripple={false}
        css={{ borderWidth: '1px', width: 'auto', boxShadow: 'none !important' }}>
        <Card.Body css={{ overflow: 'hidden', height: '150px', fontSize: '14px', padding: 0, WebkitLineClamp: '7', WebkitBoxOrient: 'vertical', display: ' -webkit-box' }}>
          {preview}
        </Card.Body>
        <Card.Footer>
          <Row align="center" css={{ gap: '10px' }}>
            <FaFileAlt color="#0D99FF" />
            <Col>
              <Text h6>{title}</Text>
              <Text css={{ color: 'rgba(0, 0, 0, .5)', fontSize: '14px' }}>Edited 2 days ago</Text>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Link>
  )
};

export default DocumentCard;
import Link from "next/link"
import { FC } from "react"
import styled from "styled-components"

const DocumentCard = styled.a`
  display: flex;
  flex-direction: column;
  height: 320px;
  min-width: 285px;
  padding: 24px;
  border-radius: 4px;
  background: #FFF;
  transition: box-shadow 250ms ease-out;

  &:hover {
    box-shadow: rgb(0 0 0 / 5%) 0px 1px 3px, rgb(0 0 0 / 5%) 0px 10px 15px -5px, rgb(0 0 0 / 4%) 0px 7px 7px -5px;
  }
`
const DocumentTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

const DocumentDate = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin: 0px 0px 10px 0px;
`

const DocumentPreview = styled.div`
  position: relative;
  font-size: 7px;
  border: 1px solid #e7e7e7;
  border-radius: 4px;
  flex-grow: 1;
  padding: 14px;
  overflow: hidden;
  white-space: pre-wrap;
  word-wrap: break-word;

  &::after{
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(255,255,255,0) 85%, rgba(255,255,255,1) 100%);
  }
`

type DocumentProps = {
  id: string;
  title: string;
  preview: string;
}

/**
 * Card used to visualize a preview of a document in the Homepage
 */
const Document: FC<DocumentProps> = ({ id, title, preview }) => {
  return (
    <Link href={`/documents/${id}`} passHref>
      <DocumentCard>
        <DocumentTitle>{title}</DocumentTitle>
        <DocumentDate>Last modified yesterday</DocumentDate>
        <DocumentPreview>{preview}</DocumentPreview>
      </DocumentCard>
    </Link>
  )
}

export default Document;

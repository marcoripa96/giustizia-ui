import { DocumentViewerSkeleton, NERViewer } from "@/components";
import styled from "@emotion/styled";
import { Card } from "@nextui-org/react";
import { useDocumentState } from "../DocumentProvider/selectors";

const Container = styled.div({
  padding: '0 20px'
})


const DocumentViewer = () => {
  const { data } = useDocumentState();

  return null;

  // if (!document) {
  //   return <DocumentViewerSkeleton />
  // }
  // return (
  //   <Container>
  //     <Card bordered shadow={false} borderWeight="light" css={{ maxWidth: '900px', margin: '60px auto', padding: '16px 12px', }}>
  //       <NERViewer
  //         onTagClick={(e, ann) => console.log(ann)}
  //         content={document.text}
  //         annotations={document.annotation}
  //         disablePreview
  //         disableLink />
  //     </Card>
  //   </Container>
  // )
}

export default DocumentViewer;
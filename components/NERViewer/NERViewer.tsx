import { Annotation, useNER } from "@/hooks/use-ner";
import styled from "@emotion/styled";
import { NERTag } from "../NERTag";

type NERViewerProps<P> = {
  content: string;
  annotations: Annotation<P>[];
};

const Container = styled.div({
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  lineHeight: 1.7
});

function NERViewer<P>({ content, annotations }: NERViewerProps<P>) {
  const nodes = useNER({ content, annotations });

  return (
    <Container>
      {nodes.map((node) =>
        node.type === "text" ? (
          node.text
        ) : (
          <NERTag key={node.props.id} annotation={node.props}>
            {node.text}
          </NERTag>
        )
      )}
    </Container>
  );
}

export default NERViewer;

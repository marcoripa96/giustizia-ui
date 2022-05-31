import { useDraftState } from "@/hooks";
import { ModalProps, Modal, Text } from "@nextui-org/react";
import { Dispatch, SetStateAction } from "react";
import { useDocumentCurrentEntity } from "../../DocumentProvider/selectors";
import EditAnnotationForm from "./EditAnnotationForm";

type EditModalProps = ModalProps & {
  setVisible: (value: boolean) => void;
}

const EditAnnotationModal = ({ setVisible, ...props }: EditModalProps) => {
  const [annotation, setAnnotation] = useDraftState(useDocumentCurrentEntity);

  if (!annotation) {
    return null;
  }

  return (
    <Modal
      scroll
      width="800px"
      aria-labelledby="edit-entity-modal"
      css={{ maxHeight: '100%' }}
      {...props}
    >
      <Modal.Header>
        <Text size={24}>
          Edit entity annotation
        </Text>
      </Modal.Header>
      <EditAnnotationForm
        annotation={annotation}
        setAnnotation={setAnnotation}
        setVisible={setVisible} />
    </Modal>
  )
};

export default EditAnnotationModal;
import { useText } from "@/components";
import { useDraftState } from "@/hooks";
import { ModalProps, Modal, Text } from "@nextui-org/react";
import { selectCurrentEntity } from "../../DocumentProvider/selectors";
import { useViewIndex } from "../../ViewProvider/ViewProvider";
import EditAnnotationForm from "./EditAnnotationForm";

type EditModalProps = ModalProps & {
  setVisible: (value: boolean) => void;
}

const EditAnnotationModal = ({ setVisible, ...props }: EditModalProps) => {
  const t = useText('document');
  const [annotation, setAnnotation] = useDraftState(selectCurrentEntity);

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
          {t('modals.editAnnotation.title')}
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
import useModal from "@/hooks/use-modal";
import { Button, Grid, Modal, ModalProps, Text } from "@nextui-org/react";
import { ReactNode, useCallback, useState } from "react";

type ConfirmationDialogProps = ModalProps & {
  content: ReactNode,
  onConfirm?: () => void;
};

type UseConfirmationDialogProps<T> = {
  // open: boolean;
  props?: T
}

type SetVisibleParams<T> = {
  open: boolean,
  props?: T
}

export function useConfirmationDialog<T>() {
  const {
    bindings: {
      open,
      ...binds
    },
    setVisible: setVisibleProp,
    ...rest
  } = useModal();

  const [props, setProps] = useState<UseConfirmationDialogProps<T>>();

  const setVisible = useCallback((params: SetVisibleParams<T>) => {
    const { open, props } = params;
    setVisibleProp(open);
    setProps(props);
  }, []);

  return {
    bindings: {
      open,
      ...binds
    },
    setVisible,
    props,
    ...rest
  }
}

const ConfirmationDialog = ({ content, onConfirm, ...props }: ConfirmationDialogProps) => {
  return (
    <Modal
      {...props}
    >
      <Modal.Header>
        <Text b size={18}>Confirm</Text>
      </Modal.Header>
      <Modal.Body>
        <Text>
          {content}
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Grid.Container justify="space-between" alignContent="center">
          <Grid>
            <Button size="sm" light onClick={props.onClose}>
              Cancel
            </Button>
          </Grid>
          <Grid>
            <Button size="sm" shadow color="error" onClick={onConfirm}>
              Delete
            </Button>
          </Grid>
        </Grid.Container>
      </Modal.Footer>
    </Modal>
  )
};

export default ConfirmationDialog;
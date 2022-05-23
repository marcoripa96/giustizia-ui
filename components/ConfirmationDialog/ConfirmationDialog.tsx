import { Button, Grid, Modal, ModalProps, Text } from "@nextui-org/react";
import { ReactNode, useState } from "react";

type ConfirmationDialogProps = ModalProps & {
  content: ReactNode,
  onConfirm?: () => void;
};

type UseConfirmationDialogState<T> = {
  open: boolean;
  props?: T
}

export function useConfirmationDialog<T>() {
  const [state, setState] = useState<UseConfirmationDialogState<T>>({ open: false });

  const setOpen = (state: UseConfirmationDialogState<T>) => {
    setState(state);
  }

  return [state, setOpen] as const
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
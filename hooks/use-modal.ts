import { forEachElement, removeStopScroll, stopScroll } from "@/utils/shared";
import { useModal as useNextModal } from "@nextui-org/react";
import { useCallback, useEffect } from "react";





/**
 * Higher order hook which uses the useModal hook from NextUI so that I can apply additional props to the body.
 */
const useModal = () => {
  const modalProps = useNextModal();

  useEffect(() => {
    // I do this in the useEffect otherswise properties are overwritten
    // setTimeout(() => {
    if (modalProps.bindings.open) {
      stopScroll();
    } else {
      // console.log(modalProps.bindings)
      removeStopScroll();
    }
    // }, 0)

  }, [modalProps.bindings.open])


  return modalProps
};

export default useModal;
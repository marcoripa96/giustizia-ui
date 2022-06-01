import { useModal as useNextModal } from "@nextui-org/react";
import { useCallback, useEffect } from "react";

const elementsToShift = ['right-sidebar', 'toolbar'];

const forEachElement = (arr: string[], cb: (elem: HTMLElement) => void) => {
  arr.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      cb(element);
    };
  });
}

const stopScroll = () => {
  document.body.setAttribute('style', 'overflow: hidden; padding-right: 17px');
  forEachElement(elementsToShift, (elem) => {
    elem.setAttribute('style', 'right: 17px');
  });
}

const removeStopScroll = () => {
  document.body.setAttribute('style', '');
  forEachElement(elementsToShift, (elem) => {
    elem.setAttribute('style', '');
  });
}

/**
 * Higher order hook which uses the useModal hook from NextUI so that I can apply additional props to the body.
 */
const useModal = () => {
  const modalProps = useNextModal();

  useEffect(() => {
    // I do this in the useEffect otherswise properties are overwritten
    if (modalProps.bindings.open) {
      stopScroll();
    } else {
      removeStopScroll();
    }
  }, [modalProps.bindings.open])


  return modalProps
};

export default useModal;
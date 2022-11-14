import { createContext, useContext } from "react";

type TreeContextProps = {
  isSelected: (key: string) => boolean;
  onNodeSelect: (key: string) => void;
  onNodeDelete: (key: string) => void;
  onNodeAdd: (key: string) => void;
  onNodeEdit: (key: string) => void;
  onNodeGetZeroShotCandidates: (key: string) => void;
};

export const TreeContext = createContext<TreeContextProps | undefined>(
  undefined
);

export const useTreeContext = () => {
  const context = useContext(TreeContext);

  if (context === undefined) {
    throw new Error("useTreeContext must be within TreeContext.Provider");
  }
  return context;
};

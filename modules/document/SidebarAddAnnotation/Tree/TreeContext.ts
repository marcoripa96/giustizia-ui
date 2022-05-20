import { createContext, useContext } from "react";

type TreeContextProps = {
  isSelected: (key: string) => boolean;
  onNodeSelect: (key: string) => void;
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

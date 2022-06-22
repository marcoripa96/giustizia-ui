import { useContext, useMemo } from "react";
import View from "./View"
import { ViewContext } from "./ViewContext"

type ViewProviderProps = {
  viewIndex: number;
}

export const useViewIndex = () => {
  const context = useContext(ViewContext);

  if (context === undefined) {
    throw new Error('useViewIndex must be used within a ViewProvider');
  }

  return context.viewIndex;
}

const ViewProvider = ({ viewIndex }: ViewProviderProps) => {
  const value = useMemo(() => ({ viewIndex }), [viewIndex]);

  return (
    <ViewContext.Provider value={value}>
      <View />
    </ViewContext.Provider>
  )
}

export default ViewProvider;
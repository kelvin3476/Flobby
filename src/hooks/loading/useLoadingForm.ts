import { useEffect } from "react";

import useLoadingStore from "../../store/loading/useLoadingStore";

const useLoadingForm = () => {

  const { 
    isLoading, 
    setIsLoading 
  } = useLoadingStore();

  useEffect(() => {
    setIsLoading(true);

    return () => {
      setIsLoading(false);
    };
  }, [setIsLoading]);

    return { isLoading, setIsLoading };
  };

export default useLoadingForm;
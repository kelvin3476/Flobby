import { useEffect } from "react";

import useLoadingStore from "../../store/loading/useLoadingStore";

import loadingSVG from "../../assets/svg/loading/loading-spinner.svg";
import "../../styles/loading/loading.scss";

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

  useEffect(() => {
    const $loadingDiv = document.createElement("div");
    document.body.appendChild($loadingDiv);

    return () => {
      document.body.removeChild($loadingDiv);
    };
  }, []);

    return { isLoading, loadingSVG };
  };

export default useLoadingForm;
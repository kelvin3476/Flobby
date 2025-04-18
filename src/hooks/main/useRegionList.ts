import { useEffect, useState } from 'react';
import { RegionItem } from '../../api/ApiTypes';
import { RegionListController } from '../../services/main/controllers/RegionListController';

export const useRegionList = () => {
  const [regionList, setRegionList] = useState<Record<string, RegionItem[]>>(
    {},
  );

  useEffect(() => {
    const controller = RegionListController.getInstance();

    controller
      .initialize()
      .then(() => {
        setRegionList(controller.getRegionList());
      })
      .catch(console.error);
  }, []);

  return regionList;
};

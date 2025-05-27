import React from 'react';
import useClubCategoryStore from '../../store/club/useClubCategoryStore';
import MainCategory from '../../components/club/list/MainCategory';
import Title from '../../components/club/text/Title';
import SubCategory from '../../components/club/list/SubCategory';
import '../../styles/club/list/ClubMain.scss';

const ClubAll = () => {
  const { mainCategory } = useClubCategoryStore();

  return (
    <>
      <MainCategory />
      <Title titleName={mainCategory ? mainCategory : '모임'} />
      <SubCategory />
    </>
  );
};

export default ClubAll;

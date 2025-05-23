import React from 'react';
import ClubItem from '../../main/club/ClubItem';
import { clubItems } from './clubItems';
import '../../../styles/club/list/ClubList.scss';
import logger from '../../../utils/Logger';

const ClubList = () => {
  return (
    <div className="club-list-container">
      <div className="club-list-box">
        {clubItems
          .reduce((rows, clubItem, index) => {
            if (index % 4 === 0) rows.push([]);
            rows[rows.length - 1].push(clubItem);
            return rows;
          }, [])
          .map((clubItemsInRow, rowIndex) => (
            <div className="club-row" key={rowIndex}>
              {clubItemsInRow.map(clubItemInRow => (
                <ClubItem
                  className={'club-list-item'}
                  key={clubItemInRow.clubId}
                  clubId={clubItemInRow.clubId}
                  photo={clubItemInRow.photo}
                  hostId={clubItemInRow.hostId}
                  hostNickname={clubItemInRow.hostNickname}
                  category={clubItemInRow.category}
                  maxMember={clubItemInRow.maxMember}
                  clubName={clubItemInRow.clubName}
                  locationName={clubItemInRow.locationName}
                  currentMembers={clubItemInRow.currentMembers}
                />
              ))}
            </div>
          ))}
      </div>
    </div>
  );
};

export default ClubList;

import { ChallengeReviewImageType } from '@/api/ApiTypes';
import React, { useRef } from 'react';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import '@/styles/challenge/review/ChallengeReviewModal.scss';
import { Navigation, Pagination } from 'swiper/modules';

export interface ChallengeReviewModalRef {
  open: (orderNo: number) => void;
  close: () => void;
}

export const ChallengeReviewModal = forwardRef<
  ChallengeReviewModalRef,
  { images: ChallengeReviewImageType[] }
>(({ images }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const paginationRef = useRef(null);

  const multiImages = images.length > 1;

  useImperativeHandle(ref, () => ({
    open: orderNo => {
      setActiveIndex(orderNo);
      setCurrentPage(orderNo + 1);
      setIsOpen(true);
    },
    close: () => setIsOpen(false),
  }));

  if (!isOpen) return null;

  return (
    <div className="challenge-review-img-modal-wrapper">
      <div className="challenge-review-img-modal-overlay" />
      <div
        className="challenge-review-img-modal-close-btn"
        onClick={() => setIsOpen(false)}
      ></div>
      <div className="challenge-review-img-modal-content">
        <Swiper
          initialSlide={activeIndex}
          pagination={
            multiImages
              ? {
                  el: paginationRef.current,
                  type: 'fraction',
                  renderFraction: function (currentClass, totalClass) {
                    return (
                      '<span class="' +
                      currentClass +
                      '"></span>/<span class="' +
                      totalClass +
                      '"></span>'
                    );
                  },
                }
              : false
          }
          navigation={
            multiImages
              ? {
                  prevEl: '.review-img-slide-prev-btn',
                  nextEl: '.review-img-slide-next-btn',
                }
              : false
          }
          modules={[Pagination, Navigation]}
          onSlideChange={swiper => {
            setCurrentPage(swiper.activeIndex + 1);
          }}
        >
          {images.map(img => (
            <SwiperSlide key={img.orderNo}>
              <img src={img.imageUrl} alt={`review-img-slide-${img.orderNo}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        {multiImages && (
          <div className="review-img-slide-pagination" ref={paginationRef}>
            {currentPage}/{images.length}
          </div>
        )}

        {multiImages && (
          <>
            <div className="review-img-slide-prev-btn">
              <div className="review-img-slide-prev-btn-icon"></div>
            </div>
            <div className="review-img-slide-next-btn">
              <div className="review-img-slide-next-btn-icon"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

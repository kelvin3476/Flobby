import React, { useEffect, useRef, useState } from 'react';
import DragAndDropHandler from '../../../utils/DragAndDropHandler';
import useClubCreateStore from '../../../store/club/useClubCreateStore';
import logger from '../../../utils/Logger';
import '../../../styles/club/create/ImageUploader.scss';

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const { setFile } = useClubCreateStore();

  useEffect(() => {
    if (!dragAreaRef.current) return;

    const dropHandler = new DragAndDropHandler(dragAreaRef.current);

    dropHandler.on('file-drop', files => {
      if (!files || files.length === 0) return;

      const file = files[0];
      if (file.size > 500 * 1024) return;

      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setFile(file);
      logger.log('imageFile', file);
    });

    return () => {
      dropHandler.remove();
    };
  }, []);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 500 * 1024) return;

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    setFile(file);
    logger.log('imageFile', file);
  };

  return (
    <div className="image-uploader-container">
      <div className="image-uploader-label-box">
        <span className="image-uploader-label">대표 이미지 첨부</span>
        <span className="image-uploader-required">*</span>
      </div>
      <div className="image-uploader-box" ref={dragAreaRef}>
        {imageUrl ? (
          <div className="image-preview">
            <img src={imageUrl} alt="썸네일 미리보기" />
            <button
              className="image-change-btn"
              type="button"
              onClick={handleClick}
            >
              <span>이미지 변경</span>
            </button>
          </div>
        ) : (
          <div className="image-uploader-info-box">
            <div className="add-photo-icon"></div>
            <div className="image-uploader-info">
              <div className="image-uploader-info-text-box">
                <span>이미지를 드래그하여 업로드하세요.</span>
                <span>
                  500KB 이하의 jpg, png 이미지만 업로드할 수 있습니다.
                </span>
              </div>
              <button
                className="image-uploader-btn"
                type="button"
                onClick={handleClick}
              >
                <span>이미지 선택</span>
              </button>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          accept="image/png, image/jpeg"
          className="image-uploader-file-input"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default ImageUploader;

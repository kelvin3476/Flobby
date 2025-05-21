import React, { useEffect, useRef, useState } from 'react';
import useClubRegisterStore from '../../../store/club/useClubRegisterStore';
import logger from '../../../utils/Logger';
import FilePickerInput from '../../../utils/FilePickerInput';
import Label from './Label';
import DragAndDropHandler from '../../../utils/DragAndDropHandler';
import { ImageExtensionConverter } from '../../../utils/ImageExtensionConverter';
import '../../../styles/club/create/ImageUploader.scss';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [filePicker, setFilePicker] = useState<FilePickerInput<File> | null>(
    null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const {
    setFile,
    isImageFileValid,
    setIsImageFileValid,
    imageFileError,
    setImageFileError,
  } = useClubRegisterStore();

  // 파일 처리 함수
  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      setIsImageFileValid(false);
      setImageFileError('5MB 이하의 이미지 파일만 등록할 수 있습니다.');
      return;
    }

    if (file.type === 'image/heic' || file.type === 'image/heif') {
      ImageExtensionConverter(file).then(result => {
        const convertedImageUrl = URL.createObjectURL(result);
        setImageUrl(prevUrl => {
          if (prevUrl) {
            URL.revokeObjectURL(prevUrl);
          }
          return convertedImageUrl;
        });
      });
    } else {
      const url = URL.createObjectURL(file);
      setImageUrl(prevUrl => {
        if (prevUrl) {
          URL.revokeObjectURL(prevUrl);
        }
        return url;
      });
    }

    setFile(file);
    setIsImageFileValid(true);
    setImageFileError('');
    logger.log('ImageUploader', 'imageFile', file);
  };

  // 드래그 앤 드롭
  useEffect(() => {
    let init = true;

    if (!dragAreaRef.current) return;

    if (init) {
      const dragAndDrop = new DragAndDropHandler(
        dragAreaRef.current,
        true,
        true,
      );
      init = false;

      if (!dragAndDrop) return;

      dragAndDrop.on('file-drop', files => {
        if (files?.length > 0) handleFile(files[0]);

        // FilePicker 이미지 파일 업로드 처리 추가
        if (files.length > 0 && filePicker) {
          if (files.length > 0 && filePicker) {
            filePicker
              .getFiles(undefined, [...files])
              .then(result => logger.log('업로드 성공', result))
              .catch(error => logger.error('업로드 실패', error));
          }
        }
      });

      dragAndDrop.on('file-drop-cancel', e => {
        logger.log('file-drop-cancel');
      });
      dragAndDrop.on('file-over', () => logger.log('file-over'));

      return () => {
        dragAndDrop.destroy();
      };
    }
  }, []);

  // 파일 인풋
  useEffect(() => {
    if (!fileInputRef.current) return;

    const picker = new FilePickerInput<File>(
      fileInputRef.current,
      async files => {
        if (files.length > 0) {
          handleFile(files[0]);
        }
        return files;
      },
    );

    setFilePicker(picker);
  }, []);

  // 클릭 이벤트 핸들러
  const handleClick = () => {
    filePicker?.getFiles();
  };

  // 파일 변경 이벤트 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="image-uploader-container">
      <Label className="image-uploader" labelTitle="대표 이미지 첨부"></Label>

      <div className="image-uploader-box">
        <div className="image-uploader" ref={dragAreaRef} tabIndex={0}>
          {imageUrl ? (
            <div className="image-preview">
              <img src={imageUrl} alt="썸네일 미리보기" />
              <div className="overlay">
                <button
                  className="image-change-btn"
                  type="button"
                  onClick={handleClick}
                >
                  <span>이미지 선택</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="image-uploader-info-box">
              <div className="add-photo-icon"></div>
              <div className="image-uploader-info">
                <div className="image-uploader-info-text-box">
                  <span>이미지를 드래그하여 업로드하세요.</span>
                  <span>5MB 이하의 이미지 파일만 등록할 수 있습니다.</span>
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
            accept="image/png, image/jpeg, image/jpg, image/heic, image/heif"
            className="image-uploader-file-input"
            onChange={handleFileChange}
          />
        </div>

        {!isImageFileValid && (
          <div className="image-error-message">
            <span>{imageFileError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;

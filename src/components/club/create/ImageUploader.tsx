import React, { useEffect, useRef, useState } from 'react';
import useClubCreateStore from '../../../store/club/useClubCreateStore';
import logger from '../../../utils/Logger';
import DragAndDropController from '../../../services/DragAndDrop/DragAndDropController';
import FilePickerInput from '../../../utils/FilePickerInput';
import '../../../styles/club/create/ImageUploader.scss';

const MAX_FILE_SIZE = 500 * 1024;

const ImageUploader = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragAreaRef = useRef<HTMLDivElement>(null);
  const [filePicker, setFilePicker] = useState<FilePickerInput<File> | null>(
    null,
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { setFile } = useClubCreateStore();

  // 파일 처리 함수
  const handleFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      // TODO: 에러 문구 나오면 수정
      alert('500KB 이하의 jpg, png 이미지만 업로드할 수 있습니다.');
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(prevUrl => {
      if (prevUrl) {
        URL.revokeObjectURL(prevUrl);
      }
      return url;
    });
    setFile(file);
    logger.log('ImageUploader', 'imageFile', file);
  };

  // 드래그 앤 드롭
  useEffect(() => {
    if (!dragAreaRef.current) return;

    const dropHandler = DragAndDropController.init(
      dragAreaRef.current,
      true,
      true,
    );

    if (!dropHandler) return;

    dropHandler.on('file-drop', (files, text) => {
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

    dropHandler.on('file-drop-cancel', () => logger.log('file-drop-cancel'));
    dropHandler.on('file-over', () => logger.log('file-over'));

    return () => {
      if (dragAreaRef.current) {
        DragAndDropController.destroy(dragAreaRef.current);
      }
    };
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
      <div className="image-uploader-label-box">
        <span className="image-uploader-label">대표 이미지 첨부</span>
        <span className="image-uploader-required">*</span>
      </div>
      <div className="image-uploader-box" ref={dragAreaRef} tabIndex={0}>
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

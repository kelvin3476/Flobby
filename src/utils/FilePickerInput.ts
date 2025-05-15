import logger from './Logger';

export default class FilePickerInput<T> {
  private fileInput: HTMLInputElement;
  private fileUploader: (file: File[]) => Promise<T[]>;

  constructor(
    fileInput: HTMLInputElement,
    fileUploader: (file: File[]) => Promise<T[]>,
  ) {
    this.fileInput = fileInput;
    this.fileUploader = fileUploader;
  }

  // 파일 선택 및 업로드 실행
  getFiles(
    fileFilter?: (files: File[]) => Promise<File[]>,
    customFiles?: File[],
  ): Promise<T[]> {
    return new Promise<T[]>((resolve, reject) => {
      if (customFiles && customFiles.length > 0) {
        this.handleFileUpload(customFiles, resolve, reject, fileFilter);

        logger.log('FilePickerInput', 'customFiles', 'getFile', customFiles);
      } else {
        const onChange = (e: Event) => {
          const files = this.fileInput.files;
          if (!files || files.length === 0) {
            resolve([]);
            return;
          }

          const fileList = Array.from(files);
          this.handleFileUpload(fileList, resolve, reject, fileFilter);
          this.fileInput.value = '';
          this.fileInput.removeEventListener('change', onChange);

          logger.log('FilePickerInput', 'getFile', fileList);
        };

        this.fileInput.addEventListener('change', onChange);
        this.fileInput.click();
      }
    });
  }

  // 파일 업로드
  private async handleFileUpload(
    files: File[],
    resolve: any,
    reject: any,
    fileFilter?: (files: File[]) => Promise<File[]>,
  ) {
    const fileList = fileFilter ? await fileFilter(files) : files;

    if (fileList.length === 0) {
      resolve([]);
      return;
    }

    this.fileUploader(fileList)
      .then(urls => {
        resolve(urls);
      })
      .catch(e => {
        logger.error('cannot upload file', e);
        reject(e);
      });
  }
}

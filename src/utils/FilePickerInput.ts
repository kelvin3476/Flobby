import logger from './Logger';

// toast 관련 로직은 주석처리

export default class FilePickerInput<T> {
  private fileInput: HTMLInputElement;
  private fileUploader: (file: File[]) => Promise<T[]>;
  //   private isShowToast = true;

  // 생성자
  constructor(
    fileInput: HTMLInputElement,
    fileUploader: (file: File[]) => Promise<T[]>,
    // isShowToast = true,
  ) {
    this.fileInput = fileInput;
    this.fileUploader = fileUploader;
    // this.isShowToast = isShowToast;
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
    // const time = new Date().getTime();
    // this.sendToastMessage(
    //   '파일을 업로드 중입니다.',
    //   ToastPopupBgColor.GRAY,
    //   time,
    // );
    // do filter
    const fileList = fileFilter ? await fileFilter(files) : files;

    if (fileList.length === 0) {
      //   this.removeToastMessage(
      //     '파일을 업로드 중입니다.',
      //     ToastPopupBgColor.GRAY,
      //     time,
      //   );
      resolve([]);
      return;
    }

    this.fileUploader(fileList)
      .then(urls => {
        // this.removeToastMessage(
        //   '파일을 업로드 중입니다.',
        //   ToastPopupBgColor.GRAY,
        //   time,
        // );
        resolve(urls);
      })
      .catch(e => {
        logger.error('cannot upload file', e);

        reject(e);
      });
  }

  // EventBus 토스트 메시지 띄우기
  //   private sendToastMessage(
  //     message: string,
  //     bgColor = ToastPopupBgColor.GRAY,
  //     time: number,
  //   ) {
  //     if (!this.isShowToast) return;
  //     EventBus.$emit('setToastPopUp', {
  //       bgColor: bgColor,
  //       title: message,
  //       time: time,
  //     });
  //   }

  // EventBus 토스트 메시지 지우기
  //   private removeToastMessage(
  //     message: string,
  //     bgColor = ToastPopupBgColor.GRAY,
  //     time: number,
  //   ) {
  //     if (!this.isShowToast) return;
  //     EventBus.$emit('removeToastPopUp', {
  //       bgColor: bgColor,
  //       title: message,
  //       time: time,
  //     });
  //   }
}

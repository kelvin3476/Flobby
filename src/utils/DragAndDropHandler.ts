import logger from './Logger';

type FileDropHandlerEvents = 'file-over' | 'file-drop-cancel' | 'file-drop';

export type FileDropHandlerFunction = (files?: File[]) => void;

export default class DragAndDropHandler {
  private element: HTMLElement;
  private eventListeners: Map<
    FileDropHandlerEvents,
    Array<FileDropHandlerFunction>
  >;

  private preventDefaultsEvent = this.preventDefaults.bind(this); // 기본 동작 방지(브라우저 파일 열기 동작)
  private handleFileDropEvent = this.handleFileDrop.bind(this);

  constructor(element: HTMLElement) {
    this.element = element;

    this.eventListeners = new Map<
      FileDropHandlerEvents,
      Array<FileDropHandlerFunction>
    >();

    this.init();
  }

  on(event: FileDropHandlerEvents, callback: FileDropHandlerFunction): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  remove(): void {
    // 기본동작 방지
    ['dragover', 'drop'].forEach(eventName => {
      this.element.removeEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    // 파일 드롭 이벤트 등록
    this.element.removeEventListener('drop', this.handleFileDropEvent, false);
  }

  private init(): void {
    // 기본동작 방지
    ['dragover', 'drop'].forEach(eventName => {
      this.element.addEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    // 파일 드롭 이벤트 등록
    this.element.addEventListener('drop', this.handleFileDropEvent, false);
  }

  private preventDefaults(event: Event) {
    event.preventDefault();
  }

  private handleFileDrop(event: DragEvent) {
    if (!event.dataTransfer) {
      // dataTransfer = 드래그되고 있는 데이터인가
      return;
    }

    logger.log('handleFileDrop', event);
    this.handleDrop(event.dataTransfer);
  }

  private handleDrop(data: DataTransfer) {
    const files = Array.from(data.files);

    if (files.length > 0) {
      this.emit('file-drop', files);
    }
  }

  private emit(event: FileDropHandlerEvents, files?: File[]): void {
    this.eventListeners.get(event)?.forEach(callback => callback(files));
  }
}

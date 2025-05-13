import logger from './Logger';

type FileDropHandlerEvents = 'file-over' | 'file-drop-cancel' | 'file-drop';

export type FileDropHandlerFunction = (files?: File[]) => void;

export default class DragAndDropHandler {
  isFileDropOver = false;

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
    ['dragover', 'drop'].forEach(eventName => {
      this.element.removeEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    this.element.removeEventListener('drop', this.handleFileDropEvent, false);
  }

  private init(): void {
    ['dragover', 'drop'].forEach(eventName => {
      this.element.addEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    this.element.addEventListener('drop', this.handleFileDropEvent, false);
  }

  private preventDefaults(event: Event) {
    event.preventDefault();
  }

  private async handleFileDrop(event: DragEvent) {
    if (!event.dataTransfer) {
      // dataTransfer = 드래그되고 있는 데이터인가
      this.isFileDropOver = false;
      return;
    }

    logger.log('handleFileDrop', event);
    await this.handleDrop(event.dataTransfer);
  }

  private async handleDrop(data: DataTransfer) {
    const files = Array.from(data.files);

    this.isFileDropOver = false;

    if (files.length > 0) {
      this.emit('file-drop', files);
    }
  }

  private emit(event: FileDropHandlerEvents, files?: File[]): void {
    this.eventListeners.get(event)?.forEach(callback => callback(files));
  }
}

import logger from './Logger';

type FileDropHandlerEvents = 'file-over' | 'file-drop-cancel' | 'file-drop';

export type FileDropHandlerFunction = (files?: File[], text?: string) => void;

export default class DragAndDropHandler {
  isFileDropOver = false;

  private element: HTMLElement;
  private eventListeners: Map<
    FileDropHandlerEvents,
    Array<FileDropHandlerFunction>
  >;
  private usePaste: boolean;
  private preventDefaultsEvent = this.preventDefaults.bind(this);
  private handleFileEnterEvent = this.handleFileEnter.bind(this);
  private handleFileDropCancelEvent = this.handleFileDropCancel.bind(this);
  private handleFileDropEvent = this.handleFileDrop.bind(this);
  private handlePasteEvent = this.handlePaste.bind(this);

  constructor(element: HTMLElement, usePaste: boolean) {
    this.element = element;
    this.usePaste = usePaste;
    this.eventListeners = new Map<
      FileDropHandlerEvents,
      Array<FileDropHandlerFunction>
    >();

    this.init();
  }

  public on(
    event: FileDropHandlerEvents,
    callback: FileDropHandlerFunction,
  ): void {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, []);
    }
    this.eventListeners.get(event)?.push(callback);
  }

  destroy(): void {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.element.removeEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    this.element.removeEventListener(
      'dragenter',
      this.handleFileEnterEvent,
      false,
    );
    this.element.removeEventListener(
      'dragleave',
      this.handleFileDropCancelEvent,
      false,
    );
    this.element.removeEventListener('drop', this.handleFileDropEvent, false);
    if (this.usePaste)
      document.body.removeEventListener('paste', this.handlePasteEvent, false);
  }

  private init(): void {
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
      this.element.addEventListener(
        eventName,
        this.preventDefaultsEvent,
        false,
      );
    });

    this.element.addEventListener(
      'dragenter',
      this.handleFileEnterEvent,
      false,
    );
    this.element.addEventListener(
      'dragleave',
      this.handleFileDropCancelEvent,
      false,
    );
    this.element.addEventListener('drop', this.handleFileDropEvent, false);
  }

  private preventDefaults(event: Event) {
    event.preventDefault();
  }

  private handleFileEnter(event: DragEvent) {
    // const files = event.dataTransfer?.files
    // if(files && files.length > 0) {
    //
    // }
    this.isFileDropOver = true;
    this.emit('file-over');
  }

  private handleFileDropCancel(event: DragEvent) {
    // const files = event.dataTransfer?.files
    // if (files && files.length > 0) {
    //
    // }

    const isLeavingChild =
      event.relatedTarget && this.element.contains(event.relatedTarget as Node);

    if (!isLeavingChild) {
      this.isFileDropOver = false;
      this.emit('file-drop-cancel');
    }
  }

  private async handleFileDrop(event: DragEvent) {
    if (!event.dataTransfer) {
      // dataTransfer = 드래그되고 있는 데이터 여부
      return;
    }

    logger.log('handleFileDrop', event);
    this.handleDrop(event.dataTransfer);
  }

  private async handleDrop(data: DataTransfer) {
    const files = Array.from(data.files);

    let text: undefined | string = undefined;

    let textPromise: Promise<string> | undefined = undefined;

    for (let i = 0; i < (data.types.length || 0); i++) {
      const item: DataTransferItem = data.items[i] as DataTransferItem;
      if (item.kind === 'string' && item.type === 'text/plain') {
        textPromise = this.getDropItemString(item);
      }
    }

    if (textPromise) {
      text = await textPromise;
    }

    this.isFileDropOver = false;
    if ((files && files.length > 0) || text) {
      this.emit('file-drop', files, text);
    }
  }

  private async handlePaste(event: ClipboardEvent) {
    if (!event.clipboardData) return;
    logger.debug('handlePaste', event.clipboardData);

    event.preventDefault();
    event.stopPropagation();

    await this.handleDrop(event.clipboardData);
  }

  private getDropItemString(item: DataTransferItem): Promise<string> {
    return new Promise((resolve, reject) => {
      item.getAsString(str => {
        resolve(str);
      });
    });
  }
  private emit(
    event: FileDropHandlerEvents,
    files?: File[],
    text?: string,
  ): void {
    logger.debug('emit', event, files, text);
    this.eventListeners.get(event)?.forEach(callback => callback(files, text));
  }
}

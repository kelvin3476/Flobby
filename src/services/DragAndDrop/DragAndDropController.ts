import DragAndDropHandler from '../../utils/DragAndDropHandler';

class DragAndDropController {
  private static instances: Map<HTMLElement, DragAndDropHandler> = new Map();

  static init(
    element: HTMLElement,
    usePaste: boolean,
    useGlobalEvents: boolean,
  ) {
    if (!this.instances.has(element)) {
      const handler = new DragAndDropHandler(
        element,
        usePaste,
        useGlobalEvents,
      );
      this.instances.set(element, handler);
    }
    return this.instances.get(element);
  }

  static destroy(element: HTMLElement) {
    const instance = this.instances.get(element);
    if (instance) {
      instance.destroy();
      this.instances.delete(element);
    }
  }
}

export default DragAndDropController;

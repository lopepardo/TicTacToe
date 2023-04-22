export class DOMUtils {
  public static createElement = (
    tag: string,
    className?: string,
    dataset?: Array<any>
  ): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (dataset) element.dataset[dataset[0]] = dataset[1];
    return element;
  };

  public static getElement = (selector: string): HTMLElement => {
    return <HTMLElement>document.querySelector(selector);
  };

  public static getAllElements = (selector: string): NodeList => {
    return <NodeList>document.querySelectorAll(selector);
  };
}

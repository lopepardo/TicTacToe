/**
 * DOMUtils class provides utility functions to manipulate the DOM.
 */
export class DOMUtils {
  /**
   * Creates and returns a new DOM element with the specified tag.
   * @param tag - The HTML tag of the element to create.
   * @param [className] - The CSS class to assign to the element.
   * @param [dataset] - An array containing the name and value of the dataset attribute to add to the element.
   * @returns The newly created DOM element.
   */
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

  /**
   * Find an element in the DOM that matches the specified selector and return it
   * @param selector - The CSS selector of the element to be searched.
   * @returns The found DOM element, or null if it is not found.
   */
  public static getElement = (selector: string): HTMLElement => {
    return <HTMLElement>document.querySelector(selector);
  };

  /**
   * Find all elements in the DOM that match the specified selector and return them in a list of nodes.
   * @param selector - The CSS selector of the elements to be searched.
   * @returns A list of nodes containing the found elements, or null if they are not found.
   */
  public static getAllElements = (selector: string): NodeList => {
    return <NodeList>document.querySelectorAll(selector);
  };
}

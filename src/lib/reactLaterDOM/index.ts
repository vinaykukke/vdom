import { IVdom } from '../types';

// Globally scoped VDOM object for reference.
let vdomTreeOriginal: IVdom;

/**
 * This is the setter method to `set` and `freeze` the `vdomTree` Object.
 * @param tree This is the virtual DOM tree
 */
function setVdomTree(tree: IVdom) {
  vdomTreeOriginal = tree;
  Object.freeze(vdomTreeOriginal); // Making the VDOM tree immutable
}

/**
 * This is the getter method to `get` the `vdomTree` Object.
 * @returns The Original DOM tree object
 */
export function getVdomTree(): IVdom {
  return vdomTreeOriginal;
}

/**
 * This method only attaches events to the DOM node
 * @param props An object that contains all the props for the element
 * @param propName The name of the prop event that you want to attach to the DOM node
 */
function addEvent(props: Object, propName: string) {
  const event = propName.substring(2).toLowerCase();
  this.addEventListener(event, props[propName])
}

/**
 * This function set the HTML properties provided to the element provided.
 * @param element An HTML element to attach the props on
 * @param props The properties that you need to attach
 */
function setProps(element: HTMLElement, props: Object) {
  Object.keys(props).forEach(propName => {
    if (propName === 'className') {
      element.setAttribute('class', props[propName]);
      return;
    }

    if (typeof props[propName] === 'function') {
      addEvent.call(element, props, propName);
      return;
    }

    element.setAttribute(propName, props[propName])
  });
}

/**
 * This is the method that actually generates real DOM Nodes.
 * This function is recursive.
 * @param node A node of type `IVdom`
 * @returns A text node or HTML element
 */
export function createElement(node: IVdom): HTMLElement | Text {
  const el: HTMLElement = document.createElement(node.type);
  node.props && setProps(el, node.props);
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  node.children.map(createElement).forEach(el.appendChild.bind(el));
  return el;
}

/** 
 * Should take an element and render it to the rootElement.
 * @param {HTMLElement} element This is the `VDOM JS Object`.
 * At the time of render this object will contain the entire VDOM.
 * */
export function render(element: IVdom, rootElement: HTMLElement) {
  setVdomTree(element);
  rootElement.appendChild(createElement(element));
}

const reactLaterDOM = {
  render,
  createElement,
  getVdomTree
};

export default reactLaterDOM;
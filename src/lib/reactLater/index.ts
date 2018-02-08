import { IVdom } from './types';

function setProps(element: HTMLElement, props: Object) {
  Object.keys(props).forEach(propName => {
    if (propName === 'className') {
      return element.setAttribute('class', props[propName])
    }
    element.setAttribute(propName, props[propName])
  });
}

/**
 * This is the method that actuall generates real DOM Nodes.
 * This function is recursive.
 * @param node A node of type `IVdom`
 * @returns A text node or HTML element
 */
function createElement(node: IVdom): HTMLElement | Text {
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
 * @param {HTMLElement} element
 * */
export default function render(element: IVdom, rootElement: HTMLElement) {
  rootElement.appendChild(createElement(element));
}

/**
 * This method just flattens the given nested array to just one level
 * @param arr A regular array of objects (Regular or nested)
 * @return arr A regular array of objects, but flattened to just one level
 */
function flatten(arr: any[]): any[] {
  return [].concat.apply([], arr);
}

/**
 * This is the methos that `babel-plugin-transform-react-jsx` will call
 * to generate real VDOM Objects.
 * @param type A regular string
 * @param props A JS Object
 * @param children An array of JS Objects or a list of comma seperated values
 * @returns An Object of type `IVdom`
 */
export function vdom(type: string, props: Object, ...children: Object[]): IVdom {
  props = props || {};
  return { type, props, children: flatten(children) }
}
import { IVdom } from './types';

// Globally scoped VDOM object for reference.
let vdomTree: IVdom;

/**
 * These are the four type of actions that will occur throughout the VDOM 
 */
const CREATE = 'CREATE'; // Create new node
const UPDATE = 'UPDATE'; // Update node, because some props have changed
const REMOVE = 'REMOVE'; // Remove the node from the DOM
const REPLACE = 'REPLACE'; // Replace the node with aother node

/**
 * This is the setter method to `set` and `freeze` the `vdomTree` Object.
 * @param tree This is the virtual DOM tree
 */
function setVdomTree(tree: IVdom) {
  vdomTree = tree;
  Object.freeze(vdomTree); // Making the VDOM tree immutable
}

/**
 * This is a diff-ing function that will differentiate between 2 given nodes
 * @param newNode The `newNode` with all the changes
 * @param oldNode The `oldNode`to compare wtih the `newNodes`
 */
function diff(node: IVdom) {
  // Compare effectively the node object with the vdomTree object
  // And return the changes/ differences OR return an object with the actions type and the changes
  // This should then go to a `patch()` function that should work based on the action type
  // TODO: you need to split up thhe initial render and the render of the components.
  // Initial render will create the vdomTree but the component render 
  // will be recurrsive calling itself and checking the diff()
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
 * @param {HTMLElement} element This is the `VDOM JS Object`.
 * At the time of render this object will contain the entire VDOM.
 * */
export function render(element: IVdom, rootElement: HTMLElement) {
  setVdomTree(element);
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
 * This is the methos that `babel-plugin-transform-react-jsx` 
 * is setup to call to generate VDOM Objects.
 * The `h` in the method name stands for `hyperscript`.
 * In `client.bundle.js` this method will be called by `realtLater.default()`
 * @param type A regular string
 * @param props A JS Object
 * @param children An array of JS Objects or a list of comma seperated values
 * @returns An Object of type `IVdom`
 */
export default function h(type: string, props: Object, ...children: Object[]): IVdom {
  props = props || {};
  return { type, props, children: flatten(children) }
}
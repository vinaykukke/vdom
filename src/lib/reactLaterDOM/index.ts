import { IVdom } from 'Lib/types';
import Queue from 'Lib/reactLater/queue';

// Globally scoped VDOM object for reference.
let DOMTree: IVdom;
const queue = new Queue;

/**
 * This function checks if the `dataId` prop exists or not on a given node.
 * It will return `true` only if the `dataId` prop is missing.
 * @param node This is a node of type `IVdom`
 * @returns `boolean` indicating whether or not `dataId` exists on the given node.
 */
function dataIdMissing(node: IVdom): boolean {
  return (node.props.dataId === null || node.props.dataId === undefined);
}

/**
 * This function adds the `dataId` prop to all the items in the `queue`.
 * Since the `queue.items` array only holds a reference to the original `nodes` in the tree,
 * any mutations to the items in the `queue` will result in respective mutations
 * in the original tree.
 * @param level The `level` of the tree that you are currently in
 */
function addId(level: number) {
  if (!queue.isEmpty()) {
    const items: IVdom[] = queue.items;

    items.forEach((item: IVdom, i: number) => {
      if (typeof item === 'string') return;
      if (dataIdMissing(item)) {
        const dataId = level + parseFloat('.' + i++);
        item.props = { ...item.props, dataId };
      }
    });
  }
}

/**
 * This function adds a given `node` to the `queue`
 * @param node A `node` of type `IVdom` that needs to be added to the `queue`
 * @param level The level that this node exists in.
 */
function addNodeToQueue(node: IVdom, level: number) {
  const { children } = node;
  if (dataIdMissing(node)) {
    queue.enqueue(node);
    addId(level);
  } else {
    children.forEach((child: IVdom) => {
      if (typeof child === 'string') return;
      if (dataIdMissing(child)) {
        queue.enqueue(child);
      }
    });
    addId(level++);
  }
}

// The only thing is to dequeue the queue correctly so the id can be correctly numbered
function traverse(node: IVdom, level: number = 1): IVdom {
  if (typeof node === 'string') return;
  const { children } = node;
  addNodeToQueue(node, level);
  children.forEach((child: IVdom) => traverse(child, level));
  return node;
}

/**
 * This is the setter method to `set` and `freeze` the `vdomTree` Object.
 * @param tree This is the virtual DOM tree
 */
function setVdomTree(tree: IVdom) {
  if (dataIdMissing(tree)) { tree.props = { ...tree.props, dataId: 0 }; }
  DOMTree = Object.freeze(traverse(tree)); // Making the VDOM tree immutable
}

/**
 * This is the getter method to `get` the `vdomTree` Object.
 * @returns The Original DOM tree object
 */
export function getVdomTree(): IVdom {
  return DOMTree;
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
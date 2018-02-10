import { IVdom } from '../types';
import { createElement } from 'Lib/reactLaterDOM';

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
 * Should take an element and render it to the rootElement.
 * @param {HTMLElement} element This is the `VDOM JS Object`.
 * At the time of render this object will contain the entire VDOM.
 * */
export function render(element: IVdom, rootElement: HTMLElement) {
  setVdomTree(element);
  rootElement.appendChild(createElement(element));
}
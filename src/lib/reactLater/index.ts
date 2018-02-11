import { IVdom } from '../types';
import { createElement, getVdomTree } from 'Lib/reactLaterDOM';
import Component from './component';

// Globally scoped VDOM object for reference.
let vdomTree: IVdom;

/**
 * These are the four type of actions that will occur throughout the VDOM 
 */
const CREATE = 'CREATE'; // Create new node
const UPDATE = 'UPDATE'; // Update node, because some props have changed
const REMOVE = 'REMOVE'; // Remove the node from the DOM
const REPLACE = 'REPLACE'; // Replace the node with another node

/**
 * This is the setter method to `set` and `freeze` the `vdomTree` Object.
 * @param tree This is the virtual DOM tree
 */
function setVdomTree(tree: IVdom) {
  vdomTree = tree;
}

function diffChildren(oldNode, newNode) {
  
}

/**
 * This is the patcher function that applies patches to the node based on the event type.
 * @param parent The parent node to apply the patches to
 * @param patches The patches to be applied. 
 * This must have a `type` object which has the type of the patch to apply,
 * and a `node` object that need these patches
 * @param index Just a holder
 */
function patch(parent, patches, index = 0) {
  const el = parent.childNodes[index];

  switch (patches.type) {
    case CREATE: {
      const { node } = patches;
      const newEl = createElement(node);
      return parent.appendChild(newEl);
    }
    
    case REMOVE: {
      return parent.removeChild(el)
    }

    case REPLACE: {
      const { node } = patches;
      const newEl = createElement(node);
      return parent.replaceChild(newEl);
    }

    case UPDATE:
      break;
  }
}

function changed(oldNode, newNode) {
  return (typeof oldNode !== typeof newNode) || (oldNode.type !== newNode.type);
}

/**
 * This is a diff-ing function that will differentiate between 2 given nodes
 * @param newNode The `newNode` with all the changes
 * @param oldNode The `oldNode`to compare wtih the `newNodes`
 */
function diff(node?: IVdom) {
  const oldNode: IVdom = getVdomTree();

  if (!oldNode) {
    return { type: CREATE, node }
  }
  if (!node) {
    return { type: REMOVE }
  }
  if (changed(oldNode, node)) {
    return { type: REPLACE, node }
  }
  if (node.type) {
    return { type: UPDATE, children: diffChildren(oldNode, node) }
  }
}

/** 
 * Should take an element and render it to the rootElement.
 * @param {HTMLElement} element This is the `VDOM JS Object`.
 * At the time of render this object will contain the entire VDOM.
 * */
function render() {
  
}

export { 
  render, 
  Component, 
  diff,
  patch
};
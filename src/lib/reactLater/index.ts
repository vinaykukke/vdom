function createElement(node) {
  const el: HTMLElement = document.createElement(node.type);
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  node.children.map(createElement).forEach(child => el.appendChild(child))
  return el;
}

/** 
 * Should take an element and render it to the rootElement.
 * @param {HTMLElement} element
 * */
export default function render(element: any, rootElement: HTMLElement) {
  rootElement.appendChild(createElement(element));
}

export function flatten(arr) {
  return [].concat.apply([], arr);
}

export function vdom(type: string, props: Object, ...children: Object[]) {
  props = props || {};

  return { type, props, children: flatten(children) }
}
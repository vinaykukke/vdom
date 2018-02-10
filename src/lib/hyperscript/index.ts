import { IVdom } from '../types';

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
 * @param type A regular string OR function
 * @param props A JS Object
 * @param children An array of JS Objects or a list of comma seperated values
 * @returns An Object of type `IVdom`
 */
type TComponent = ObjectConstructor | string;
export default function h(type: TComponent, props: Object, ...children: Object[]): IVdom {
  props = props || {};

  if (typeof type === 'function') {
    const instance = new type(props);
    return instance.render();
  }

  return { type, props, children: flatten(children) }
}
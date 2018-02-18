import { diff, patch } from './index';
import { getVdomTree } from 'Lib/reactLaterDOM';

/** 
 * This is the base component class. 
 * All `stateful` components need to extend form this base class
 */
export default class Component {
  public props: Object;
  public state: any;
  private isDirty: boolean;
  
  constructor(props) {
    this.props = props;
  }

  public setState(state: Object) {
    this.state = state;
    this.markDirty();
    // const patches = diff(this.render());
    // console.log(this.render());

    // Can use data-id as prop on vdom objects to keep track of parents and children.
    // Then when you have a state change get the data-id of the node that was changed,
    // and look through the frozen vdom and find this object of data-id.
    // clone the frozen vdom object with object.assign and in the new object replace
    // the node of data-id which will give you a new vdom object. 
  }

  private markDirty() {
    this.isDirty = true;
  }
}
import { diff, patch } from './index';

/** 
 * This is the base component class. 
 * All `stateful` components need to extend form this base class
 */
export default class Component {
  public props;
  public state;
  
  constructor(props) {
    this.props = props;
  }

  public setState(state: Object) {
    this.state = state;
    const patches = diff(this.render());
  }
}
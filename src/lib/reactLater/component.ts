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

  setState(state: Object) {
    this.state = state;
    console.log(this);
  }
}
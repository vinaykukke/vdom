export default class Component {
  public props;
  public state;
  
  constructor() {
    this.props = {}
  }

  setState(state: Object) {
    this.state = state;
    console.log(this);
  }
}
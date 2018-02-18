import { Component } from 'Lib/reactLater';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'state'
    }
  }

  someFunc() {
    this.setState({test: 'hello new state'});
  }

  render() {
    return <div>
      {this.state.test}
      <br/>
      <div>
        <div>this</div>
        <div>that</div>
      </div>
      <div>
        <div>test</div>
        <div>level</div>
      </div>
      <div>
        <div>
          <div>test</div>
          <div>level</div>
        </div>
        <div>
          <div>test</div>
          <div>level</div>
        </div>
      </div>
      <input type='text' placeholder='Enter you name' />
      <input type='password' placeholder='Enter you password' />
      <button onClick={this.someFunc.bind(this)}>Submit</button>
    </div>
  }
}

export default Form;
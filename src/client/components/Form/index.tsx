import { Component } from 'Lib/reactLater';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    }
  }

  someFunc() {
    this.setState({test: 'hello'});
  }

  render() {
    return <div>
      <input type='text' placeholder='Enter you name' />
      <input type='password' placeholder='Enter you password' />
      <button onClick={this.someFunc.bind(this)}>Submit</button>
    </div>
  }
}

export default Form;
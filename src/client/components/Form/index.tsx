import reactLater from 'Lib/reactLater';

const Form = () => {
  return<div>
    <input type='text' placeholder='Enter you name' />
    <input type='password' placeholder='Enter you password' />
    <button onClick={() => console.log('Click works')}>Submit</button>
  </div>
}

export default Form;
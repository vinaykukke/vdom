import { render } from 'Lib/reactLater';
import 'Lib/reactLater';
import Form from './components/Form';

function view() {
  return <div className='test-class' id='rrr'>
    <h3>This works</h3>
    { Form() }
  </div>;
}

const rootElement = document.getElementById('root');
render(view(), rootElement);
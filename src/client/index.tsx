import reactLaterDOM from 'Lib/reactLaterDOM';
import Form from './components/Form';

function view() {
  return <div className='test-class' id='rrr'>
    <h3>This works</h3>
    <Form test={'test'}/>
  </div>;
}

const rootElement = document.getElementById('root');
reactLaterDOM.render(view(), rootElement);
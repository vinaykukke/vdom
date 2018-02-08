import render from 'Lib/reactLater';

// import { IVdom } from 'Lib/reactLater/types';

function view() {
  return <div className='test-class' id='rrr'>
    <strong>This works</strong>
    <strong>This works</strong>
    <strong>This works</strong>
    <h3>This works</h3>
  </div>;
}

const rootElement = document.getElementById('root');
render(view(), rootElement);
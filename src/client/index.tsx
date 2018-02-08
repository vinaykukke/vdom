import render, { vdom } from 'Lib/reactLater';

function view(vdom) {
  return <div className='test-class' id='rrr'>
    <h3>This works</h3>
    <div>This works</div>
    <div>This works</div>
    <div>This works</div>
  </div>;
}

const rootElement = document.getElementById('root');
render(view(vdom), rootElement);
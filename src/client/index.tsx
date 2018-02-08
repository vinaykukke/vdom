import render from 'Lib/reactLater';

function view() {
  return <div>
    <strong>This works</strong>
    <strong>This works</strong>
    <strong>This works</strong>
    <h3>This works</h3>    
  </div>;
}

const rootElement = document.getElementById('root');
render(view(), rootElement);
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/main.scss';
import registerServiceWorker from './registerServiceWorker';
import Root from './Root';

const render = (window as any).__REDUX_STATE__
  ? ReactDOM.hydrate
  : ReactDOM.render;

render(<Root />, document.getElementById('root') as HTMLElement);

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import './assets/index.css';

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker();

import * as React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import routes from './application/routes';
import hashHistory from './hashHistory';
import store from './application/store';
import {syncHistoryWithStore} from 'react-router-redux';
import {Provider} from 'react-redux';
import {Router} from 'react-router';

const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);

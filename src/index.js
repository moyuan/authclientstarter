import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import reduxThunk from 'redux-thunk';
// import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token, consider the user to be signed in
if (token) {
  // we need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container')
);

// ReactDOM.render(
//   <Provider store={createStoreWithMiddleware(reducers)}>
//     <Router history={browserHistory}>
//       <Route path="/" component={App}>
//         <Route path="signin" component={Signin} />
//       </Route>
//     </Router>
//   </Provider>
//   , document.querySelector('.container'));
  
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import { BrowserRouter } from 'react-router-dom';
// import './index.css';
// import App from './components/App';
// import reducers from './reducers';
// import registerServiceWorker from './registerServiceWorker';
// const createStoreWithMiddleware = applyMiddleware()(createStore);
// ReactDOM.render(
//   <Provider
//     store={createStoreWithMiddleware(reducers)}
//   >
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </Provider>,
//   document.querySelector('#root')
// );
// registerServiceWorker();

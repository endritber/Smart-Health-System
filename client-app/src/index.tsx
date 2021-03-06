import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import { BrowserRouter, Router} from 'react-router-dom';
import { store, StoreContext } from './app/stores/store';
import {createBrowserHistory} from 'history';


export const history = createBrowserHistory();

ReactDOM.render(
<StoreContext.Provider value={store} >
<BrowserRouter >
<Router history={history}>
    <App/>
    </Router>
</BrowserRouter>
</StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

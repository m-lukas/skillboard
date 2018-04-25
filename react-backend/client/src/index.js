import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Project from './components/Project';
import LoginPage from './components/pages/LoginPage';
import rootReducer from './rootReducer';

const root = document.getElementById('root');
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/projects/:project" component={Project} />
                <Route path="/login" component={LoginPage} /> 
            </div>
        </Provider>
    </HashRouter>
, root);
registerServiceWorker();

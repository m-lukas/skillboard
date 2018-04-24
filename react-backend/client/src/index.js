import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Project from './components/Project';
import LoginPage from './components/pages/LoginPage';

const root = document.getElementById('root');

ReactDOM.render(
    <HashRouter>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/projects/:project" component={Project} />
            <Route path="/login" component={LoginPage} /> 
        </div>
    </HashRouter>
, root);
registerServiceWorker();

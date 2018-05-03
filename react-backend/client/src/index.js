import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import 'semantic-ui-css/semantic.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Project from './components/Project';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import CreateProjectPage from './components/pages/CreateProjectPage';
import rootReducer from './rootReducer';
import { userLoggedIn } from './actions/auth';
import UserRoute from './components/routes/UserRoute';
import GuestRoute from './components/routes/GuestRoute';

const root = document.getElementById('root');
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if(localStorage.skillboardJWT){
    const user = { token: localStorage.skillboardJWT };
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Switch>
                <Route exact path="/" exact component={App} />
                <UserRoute path="/projects/:project" exact component={Project} />
                <UserRoute path="/create" exact component={CreateProjectPage} />
                <GuestRoute path="/login" exact component={LoginPage} />
                <GuestRoute path="/signup" exact component={SignUpPage} /> 
            </Switch>
        </Provider>
    </BrowserRouter>
, root);
registerServiceWorker();

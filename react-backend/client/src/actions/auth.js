import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_SIGNED_UP } from '../types';
import api from '../api';

export const userSignedUp = user => ({
    type: USER_SIGNED_UP,
    user
});

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});


export const login = credentials => dispatch => 
    api.user.login(credentials).then(user => {
        localStorage.skillboardJWT = user.token;
        dispatch(userLoggedIn(user));
    });

export const logout = () => dispatch => {
        localStorage.removeItem('skillboardJWT');
        dispatch(userLoggedOut());
    };

export const signup = credentials => dispatch => 
    api.user.signup(credentials).then(user => {
        localStorage.skillboardJWT = user.token;
        dispatch(userSignedUp(user));
    });
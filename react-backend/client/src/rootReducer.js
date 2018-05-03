import { combineReducers } from 'redux';

import user from './reducers/user';
import project from './reducers/project';

export default combineReducers({
    user,
    project
});
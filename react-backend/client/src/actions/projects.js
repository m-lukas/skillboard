import { PROJECT_CREATED, USER_JOINED_PROJECT } from '../types';
import api from '../api';

export const projectCreated = (project) => ({
    type: PROJECT_CREATED,
    project
});

export const projectJoined = (project) => ({
    type: USER_JOINED_PROJECT,
    project
});

export const createProject = data => dispatch => 
    api.project.create(data).then(project => {
        dispatch(projectCreated(project));
    });

export const joinProject = (data) => dispatch => 
    api.project.join(data).then((project) => {
        dispatch(projectJoined(project));
    });
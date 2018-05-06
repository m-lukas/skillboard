import { PROJECT_CREATED, USER_JOINED_PROJECT, USER_RECEIVED_DATA } from '../types';
import api from '../api';

export const projectCreated = project => ({
    type: PROJECT_CREATED,
    project
});

export const projectJoined = project => ({
    type: USER_JOINED_PROJECT,
    project
});

export const projectDataReceived = (project) => ({
    type: USER_RECEIVED_DATA,
    project
});

export const createProject = (data, addition) => dispatch => 
    api.project.create(data, addition).then(project => {
        dispatch(projectCreated(project));
    });

export const joinProject = data => dispatch => 
    api.project.join(data).then(project => {
        dispatch(projectJoined(project));
    });

export const getProjectData = data => dispatch => 
    api.project.get(data).then(project => {
        dispatch(projectDataReceived(project));
    });
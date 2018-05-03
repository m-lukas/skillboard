import { PROJECT_CREATED, USER_JOINED_PROJECT, USER_RECEIVED_DATA } from "../types";

export default function project(state = {}, action = {}){
    switch(action.type){
        case PROJECT_CREATED:
            return action.project;
        case USER_JOINED_PROJECT:
            return action.project;
        case USER_RECEIVED_DATA:
            return action.project;
        default: 
            return state;
    }
}
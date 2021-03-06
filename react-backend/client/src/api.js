import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post('/api/user/login', { credentials }).then(res => res.data.user),
        signup: user =>
            axios.post('/api/user/signup', { user }).then(res => res.data.user)
    },
    project: {
        create: (data, addition) =>
            axios.post('/api/project/create', { data, addition }).then(res => res.data.project),
        join: data =>
            axios.post('/api/project/join', { data }).then(res => res.data.project),
        get: data =>
            axios.post('/api/project/get', { data }).then(res => res.data.project)
    }
}
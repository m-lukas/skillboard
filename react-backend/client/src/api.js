import axios from 'axios';

export default {
    user: {
        login: credentials => 
            axios.post('/api/user/login', { credentials }).then(res => res.data.user),
        signup: user =>
            axios.post('/api/users/signup', { user }).then(res => res.data.user)
    },
    project: {
        create: project =>
            axios.post('/api/project/create', { project }).then(res => res.data.project),
        join: data =>
            axios.post('/api/project/join', { data }).then(res => res.data.project),
        get: project =>
            axios.post('/api/project/get', { project }).then(res => res.data.project)
    }
}
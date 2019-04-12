import AuthService from '../services/authService'

const RequiresAuth = (to, from, next) => {
    if(!AuthService.loggedIn()){
        return next({
            path: '/register'
        })
    }
    return next()
}

export default RequiresAuth
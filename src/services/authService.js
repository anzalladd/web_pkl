import BaseService from './baseService'

const storage = window.localStorage

class AuthService extends BaseService {
    constructor(){
        super()
    }

    login(email, password){
        this.endpoint = '/api/login'
        let payload = {
            email : email,
            password : password
        }

        return this.post(payload)
    }

    register(username, email, password, confirmPassword){
        this.endpoint = '/api/register'
        let payload = {
            name : username,
            email : email,
            password : password,
            passwords : confirmPassword
        }

        return this.post(payload)
    }

    loggedIn () {
        const authToken = storage.getItem('token')
        return typeof authToken === 'string' && authToken.length > 0
    }

}

export default new AuthService()
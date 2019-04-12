import config from './config'
import axios from 'axios'

class BaseService{
    constructor () {
        this.endpoint = ''
        this.useApi = 'api'
        this.setBaseUrl()
    }

    setBaseUrl () {
        let base = config[this.useApi].baseURL
        this.http = axios.create({
            headers: {
                'Accept' : 'application/json',
                'Access-Control-Allow-Origin' : '*',
            },
            baseURL: base
        })
    }

    includeDefaultOptions (options) {
        let accessToken = null

        if(this.useApi === 'api'){
            accessToken = window.localStorage.getItem('token')
        }

        this.setBaseUrl()
        if(accessToken !== null){
            const defaultData = {
                headers: {
                    'Content-Type' : 'application/json',
                    Authorization : 'Bearer' + accessToken
                }
            }

            return Object.assign(option, defaultData)
        }
        return options
    }

    get (options = {}, api = 'api'){
        this.useApi = api
        const opts = this.includeDefaultOptions(options)
        return this.http.get(this.endpoint, opts)
    }

    post (payloads, options ={}) {
        const opts = this.includeDefaultOptions(options)
        return this.http.post(this.endpoint, payloads, opts)
    }
}

export default BaseService
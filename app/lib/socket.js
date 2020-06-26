import getConfig from "next/config";
const io = require('socket.io-client');
const {publicRuntimeConfig} = getConfig();

class SocketManager {

    constructor() {
        if(typeof localStorage != 'undefined'){
            let options = {};
            options = {query: `token=3c5e8be1d0e44456b5a831157593b383`};
            // if(localStorage[`${publicRuntimeConfig.baseUrl}:authResult`] && JSON.parse(localStorage[`${publicRuntimeConfig.baseUrl}:authResult`]).idToken){
            //     // options = {query: `token=${JSON.parse(localStorage[`${publicRuntimeConfig.baseUrl}:authResult`]).idToken}`};
            //     console.log(options.query);
            // }
            this.socket = io(publicRuntimeConfig.apiUrl, options);
            this.socket.callbacks = {};
            this.socket.on('connect', () => {
                console.log("connected!");
            });
            let verbs = ['get', 'post', 'put', 'patch', 'delete'];
            let that = this;
            for (let i in verbs) {
                let verb = verbs[i];
                that.socket[verb] = (url, data, cb) => {
                    url = `${publicRuntimeConfig.apiPrefix}${url}`;
                    that.socket.emit(String(verb).toUpperCase(), url, data, verb);
                    if (cb !== undefined) {
                        that.socket.callbacks[url] = cb;
                    }
                }
            };
            this.socket.on('response', (url, data) => {
                if(this.socket.callbacks[url] != undefined) {
                    this.socket.callbacks[url](data);
                }
            });

            this.socket.on('unauthorized', (data) => {
                console.log('data', data);
            });
        }
    }

    isConnected = () => {
        return this.socket.connected;
    };

    getSocket = () => {
        return this.socket;
    };

    get = async (path, body) => {
        let promise = new Promise(((resolve, reject) => {
            this.socket.get(path, body, resolve);
        }));
        return promise;
    };

    put = (path, body) => {
        let promise = new Promise(((resolve, reject) => {
            this.socket.put(path, body, resolve);
        }));
        return promise;
    };

    post = (path, body) => {
        let promise = new Promise(((resolve, reject) => {
            this.socket.post(path, body, resolve);
        }));
        return promise;
    };

    patch = (path, body) => {
        let promise = new Promise(((resolve, reject) => {
            this.socket.patch(path, body, resolve);
        }));
        return promise;
    };

    delete = (path, body) => {
        let promise = new Promise(((resolve, reject) => {
            this.socket.delete(path, body, resolve);
        }));
        return promise;
    };

    fetch = (path, options={}) => {
        options.headers = options.headers || {};
        // options.headers['Authorization'] = 'Bearer '+ JSON.parse(localStorage[`${publicRuntimeConfig.baseUrl}:authResult`]).idToken
        options.headers['Authorization'] = 'Bearer '+ '95e1586ehi7bc2hi4f0ahibc57hi8dbb609a9b63';
        options.headers["Accept"] = "application/json, text/plain, */*";
        options.headers["Content-Type"] = "application/json;charset=utf-8";
        path = `${publicRuntimeConfig.apiUrl}${publicRuntimeConfig.apiPrefix}${path}`;
        return fetch(path, options)
    }

}

const manager = new SocketManager;

export default manager;

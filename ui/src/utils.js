import { Paths } from './config';

import Wow from 'wow.js';

const HEADERS = new Headers({
    "Accept": "application/json",
});

export let Api = {
    get: (url, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'GET',
                    headers: HEADERS,
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    },
    delete: (url, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'DELETE',
                    headers: HEADERS,
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    },
    put: (url, data, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                var payload = new FormData();
                payload.append("json", JSON.stringify(data));
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'PUT',
                    headers: HEADERS,
                    body: payload,
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    },
    post: (url, data, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                var payload = new FormData();
                payload.append("json", JSON.stringify(data));
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'POST',
                    headers: HEADERS,
                    body: payload,
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    }
}

export class Events {

    constructor() {
        this.preventSubmitOnEnter();
        this.wow();
    }

    wow() {
        new Wow().init();
    }

    preventSubmitOnEnter() {
        window.$(document).on('keyup keypress', 'form input[type="text"]', function (e) {
            if (e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
    }

}
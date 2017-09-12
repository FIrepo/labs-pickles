import { Paths } from './config';
import Wow from 'wow.js';
import _ from 'lodash';

const HEADERS = {
    "Accept": "application/json"
}

export let Api = {
    get: (url, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'GET',
                    headers: new Headers(HEADERS),
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
                    headers: new Headers(HEADERS),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    },
    put: (url, body, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'PUT',
                    headers: new Headers(_.merge(_.clone(HEADERS), { 'Content-Type': 'application/json' })),
                    body: JSON.stringify(body),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                reject(err);
            }
        });
    },
    post: (url, body, base) => {
        return new Promise(async (resolve, reject) => {
            try {
                let data = await fetch((base || Paths.to.api.endpoint) + url, {
                    method: 'POST',
                    headers: new Headers(_.merge(_.clone(HEADERS), {'Content-Type': 'application/json'})),
                    body: JSON.stringify(body),
                    mode: 'cors',
                    cache: 'default'
                });
                resolve(data.json());
            } catch (err) {
                console.log(err);
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
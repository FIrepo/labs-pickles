const
    _ = require('lodash'),
    debug = require('debug')('PICKLES:UTILS');

/**
 * Utils class
 * 
 * @author Alexandre Moraes | alcmoraes89@gmail.com
 */
class Utils {

    /**
     * 
     * This routine calculates the distance between two points
     * in Kilometers (given the latitude/longitude of those points).
     * 
     * @param {String} lat1 first latitude to calculate
     * @param {String} lon1  first longitude to calculate
     * @param {String} lat2  second latitude to calculate
     * @param {String} lon2  first longitude to calculate
     */
    distanceBetweenCoordinates(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1 / 180
        var radlat2 = Math.PI * lat2 / 180
        var theta = lon1 - lon2
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344;
        return dist
    }

    /**
     * Remove not allowed parameters
     * 
     * @param {Object} body 
     * @param {Object} parameters 
     */
    async clearNotAllowedParameters(body, parameters) {
        return new Promise(async (resolve, reject) => {
            if(!Object.keys(body).length) return resolve(body);
            Object.keys(body).map((k)=> { if(parameters.indexOf(k) < 0) delete body[k]; });
            resolve(body);
        });
    }

    /**
     * Remove not allowed parameters
     * 
     * @param {Object} body 
     * @param {Array} parameters 
     */
    async ensureRequiredParameters(body, parameters) {
        return new Promise(async (resolve, reject) => {
            if(!Object.keys(body).length) return resolve(body);
            Object.keys(parameters).map((k)=> {
                if(!body.hasOwnProperty(k)) return reject(`Attribute missing: ${k}`);
                if(typeof body[k] !== parameters[k]) return reject(`Invalid format for ${k}. Expected ${parameters[k]}.`);
            });
            resolve(body);
        });
    }

    /**
     * Check if a given email is valid
     * 
     * @param {String} email 
     */
    isValidEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    /**
     * Check if a given coordinate is valid
     * 
     * @param {String} coordinate 
     */
    isValidCoordinate(coordinate) {
        var re = /^-?([1-8]?[1-9]|[1 - 9]0)\.{1}\d{1,6}/
        return re.test(coordinate);
    }

    /**
     * Send a default error
     * 
     * @param {restify.Response} res 
     * @param {string} msg
     */
    sendError(res, msg) {
        return res.send(500, { status: 0, message: msg, at: (new Date()) });
    }

    /**
     * Send a default response
     * 
     * @param {restify.Response} res 
     * @param {object|array} data
     */
    jsonResponse(res, data) {
        return res.send({ status: 1, data: data || false, at: (new Date()) });
    }
}

module.exports = Utils;
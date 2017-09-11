
const
    debug = require('debug')('PICKLES:SERVER'),
    restify = require('restify'),
    Utils = require('../services/utils');


module.exports = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let server = restify.createServer();

            await require('./sanitizers')(server);
            await require('./cors')(server);
            await require('./swagger')(server);
            
            // Set the Utilities lib on server
            server.UTILS = new Utils();

            await require('./routes')(server);

            resolve(server);
        } catch(ERR) {
            reject(ERR);
        }
    });
}
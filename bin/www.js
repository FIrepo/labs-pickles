#!/usr/bin/env node

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const
    debug = require('debug')("COMMAND:WWW");

async function start() {
    let server, port;
    try {
        server = await require('../server/app')();
        debug("SERVER LOADED!");
        port = process.env.PORT || 3005;
        server.listen(port, () => {
            debug("API running under " + port + " | Environment: " + process.env.NODE_ENV);
        });
    } catch(ERR) {
        debug(ERR);
        throw new Error(ERR);
    }
    
}

start();
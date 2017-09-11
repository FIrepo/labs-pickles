const
    restify = require('restify'),
    qs = require('qs');

module.exports = (server) => {
    return new Promise((resolve, reject) => {
        try {
            server.pre(restify.pre.sanitizePath());
            server.use(restify.acceptParser(server.acceptable));
            server.use(restify.queryParser());
            server.use(restify.bodyParser());

            server.use((req, res, next) => {
                req.body = qs.parse(req.body);
                req.locale = req.headers['content-language'] || 'en';
                next();
            });

            resolve(server);
        } catch(ERR) {
            reject(ERR);
        }
    })
}
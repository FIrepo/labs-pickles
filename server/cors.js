const restify = require('restify');

module.exports = (server) => {
    return new Promise((resolve, reject) => {
        try {
            server.use(restify.fullResponse());
            server.on('MethodNotAllowed', (req, res) => {
                if (req.method.toLowerCase() === 'options') {
                    let origins = ['*'],
                        allowHeaders = [
                            'Accept-Version',
                            'Content-Language',
                            'Content-Type',
                            'Accept',
                            'Api-Version',
                            'Origin',
                            'X-Requested-With'
                        ];
                    if (res.methods.indexOf('OPTIONS') === -1) res.methods.push('OPTIONS');
                    res.header('Access-Control-Allow-Credentials', true);
                    res.header('Access-Control-Allow-Headers', allowHeaders.join(', '));
                    res.header('Access-Control-Allow-Methods', res.methods.join(', '));
                    res.header('Access-Control-Allow-Origin', origins.join(', '));
                    return res.send(204);
                } else {
                    return res.send(new restify.MethodNotAllowedError());
                }
            });

            // Ensure only requests containing "Accept: application/json" headers
            server.use((req, res, next) => {
                if (req.xhr || req.headers['accept'] == 'application/json') {
                    next();
                } else {
                    return res.send(new restify.errors.MethodNotAllowedError((typeof err != 'undefined' ? err : "Method not allowed")))
                }
            });

            resolve(server);
        } catch(ERR) {
            reject(ERR);
        }
    })
}
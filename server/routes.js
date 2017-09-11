module.exports = (server) => {
    return new Promise(async (resolve, reject) => {
        try {
            await require('../api/drivers')(server);
            resolve(server);
        } catch(ERR) {
            reject(ERR);
        }
    })
}
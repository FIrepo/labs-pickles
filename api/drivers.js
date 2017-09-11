const
    debug = require('debug')('PICKLES:ENDPOINTS:DRIVERS'),
    Q = require('q'),
    _ = require('lodash'),
    restify = require('restify'),
    database = require('../services/database'),
    fs = require('fs-extra');

let allowed_parameters = ["email", "name", "lat", "lng"];
let required_parameters = {"email": "string", "name": "string", "lat": "string", "lng": "string"};

/**
 * @swagger
 * resourcePath: /drivers
 * description: Drivers endpoint
 */
module.exports = (server) => {

    return new Promise((resolve, reject) => {

        /**
         * If the path matches driver/:id set the driver into the request object
         */
        server.use(async (req, res, next) => {
            switch (true) {
                // Case user is at /:id somehow, set req.entity
                case (new RegExp('drivers/:id').test(req.route.path)):
                    let driver;
                    try {
                        driver = await database.findById(req.params.id);
                        req.driver = driver;
                        next();
                    } catch(ERR) {
                        return server.UTILS.sendError(res, ERR);
                    }
                    break;
                default:
                    next();
            }
        });

        /**
         * @swagger
         * path: /
         * operations:
         *   -  httpMethod: GET
         *      summary: Get all drivers
         *      notes: Return an array of all registered drivers
         *      responseClass: String
         *      nickname: get_drivers
         *      consumes:
         *        - text/html
         */
        server
            .get({
                name: 'get_drivers',
                path: '/drivers',
                version: '1.0.0'
            }, async (req, res, next) => {
                let drivers;
                try {
                    if (req.query.coordinates) {
                        let [lat, lng] = req.query.coordinates.split(',');
                        if (!server.UTILS.isValidCoordinate(lat)) throw "Invalid latitude";
                        if (!server.UTILS.isValidCoordinate(lng)) throw "Invalid longitude";
                        return server.UTILS.jsonResponse(res,
                            await database.findByCoordinates(lat, lng));
                    } else {
                        return server.UTILS.jsonResponse(res,
                            await database.findAll());
                    }
                } catch (ERR) {
                    debug(ERR);
                    return server.UTILS.sendError(res, ERR);
                }
            });

        /**
         * @swagger
         * path: /
         * operations:
         *   -  httpMethod: POST
         *      summary: Create a driver
         *      responseClass: String
         *      nickname: create_driver
         *      consumes:
         *        - text/html
         *      parameters:
         *        - name: name
         *          description: The driver name
         *          paramType: body
         *          required: true
         *          dataType: string
         *        - name: email
         *          description: The driver email
         *          paramType: body
         *          required: true
         *          dataType: string
         *        - name: lat
         *          description: The driver latitude
         *          paramType: body
         *          required: true
         *          dataType: string
         *        - name: lng
         *          description: The driver longitude
         *          paramType: body
         *          required: true
         *          dataType: string
         */
        server
            .post({
                name: 'create_driver',
                path: '/drivers',
                version: '1.0.0'
            }, async (req, res, next) => {
                let body, driver;
                try {
                    body = await server.UTILS.clearNotAllowedParameters(req.body, allowed_parameters);
                    body = await server.UTILS.ensureRequiredParameters(req.body, required_parameters);
                    if (!server.UTILS.isValidEmail(body.email)) throw "Invalid email";
                    if (!server.UTILS.isValidCoordinate(body.lat)) throw "Invalid latitude";
                    if (!server.UTILS.isValidCoordinate(body.lng)) throw "Invalid longitude";
                    return server.UTILS.jsonResponse(res,
                        await database.save(body));
                } catch (ERR) {
                    return server.UTILS.sendError(res, ERR);
                }
            });

        /**
         * @swagger
         * path: /{id}
         * operations:
         *   -  httpMethod: GET
         *      summary: Get driver by ID
         *      notes: Return the driver from the given ID
         *      responseClass: String
         *      nickname: get_driver
         *      consumes:
         *        - text/html
         *      parameters:
         *        - name: id
         *          in: path
         *          description: ID from the driver to get
         *          paramType: integer
         *          required: true
         */
        server
            .get({
                name: 'get_driver',
                path: '/drivers/:id',
                version: '1.0.0'
            }, async (req, res, next) => {
                return server.UTILS.jsonResponse(res,
                    req.driver);
            });

        /**
         * @swagger
         * path: /{id}
         * operations:
         *   -  httpMethod: DELETE
         *      summary: Delete a driver by ID
         *      notes: Deletes a driver from a given ID
         *      responseClass: String
         *      nickname: delete_driver
         *      consumes:
         *        - text/html
         *      parameters:
         *        - name: id
         *          in: path
         *          description: ID from the driver to delete
         *          paramType: integer
         *          required: true
         */
        server
            .del({
                name: 'delete_driver',
                path: '/drivers/:id',
                version: '1.0.0'
            }, async (req, res, next) => {
                try {
                    await database.delete(req.driver);
                    return server.UTILS.jsonResponse(res);
                } catch(ERR) {
                    return server.UTILS.sendError(res, ERR);
                }
            });

        resolve(server);

    });

}
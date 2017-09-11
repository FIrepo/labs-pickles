const
    debug = require('debug')('PICKLES:ENDPOINTS:DRIVERS'),
    Q = require('q'),
    path = require('path'),
    _ = require('lodash'),
    utils = require('./utils'),
    fs = require('fs-extra');

// Get the database file path based on the environment.
function getDatabasePath() {
    return path.join(__dirname, '..', 'db', `database_${process.env.NODE_ENV || 'development'}.json`)
}
// Load the database file and parse it.
async function loadDatabase() {
    return JSON.parse(await fs.readFileSync(getDatabasePath(), 'utf-8'));
}

const Utils = new utils();

/**
 * Database service
 * 
 * @author Alexandre Moraes | alcmoraes89@gmail.com
 */
module.exports = {
    /**
     * Find by id.
     * 
     * Returns a driver from the database by ID
     */
    findById: (id) => {
        let dbase, driver;
        return new Promise(async (resolve, reject) => {
            try {
                // Load the database file in runtime.
                dbase = await loadDatabase();
                // Find for a driver with a given id.
                driver = _.find(dbase.drivers.table, {id: parseInt(id)});
                // If no driver was found. Reject it.
                if(!driver)
                    return reject("Not found!");
                //  Return the driver
                resolve(driver);
            } catch(ERR) {
                reject(ERR);
            }
        });
    },
    /**
     * Find all.
     * 
     * Returns all drivers from database
     */
    findAll: () => {
        let dbase, drivers;
        return new Promise(async (resolve, reject) => {
            try {
                // Load the database file in runtime.
                dbase = await loadDatabase();
                // Return all drivers
                resolve(dbase.drivers.table);
            } catch(ERR) {
                reject(ERR);
            }
        });
    },
    /**
     * Delete driver.
     * 
     * Delete a driver by giving a driver object
     */
    delete: (driver) => {
        let dbase;
        return new Promise(async (resolve, reject) => {
            try {
                // Load the database file in runtime.
                dbase = await loadDatabase();
                // Remove the given driver from table.
                dbase.drivers.table = dbase.drivers.table.filter((d) => { return d.id !== parseInt(driver.id)});
                await fs.writeFileSync(getDatabasePath(), JSON.stringify(dbase, null, 4), 'utf-8');
                resolve();
            } catch(ERR) {
                reject(ERR);
            }
        });
    },
    /**
     * Find by Lat Lng
     * 
     * Returns the closest drivers (2km radius) from given Latitude and Longitude
     */
    findByCoordinates: (lat, lng) => {
        return new Promise(async (resolve, reject) => {
            let drivers, dbase;
            try {
                dbase = await loadDatabase();
                drivers = dbase.drivers.table.filter((d) => {
                    return Utils.distanceBetweenCoordinates(lat, lng, d.lat, d.lng, 'K') <= 2
                });
                resolve(drivers);
            } catch(ERR) {
                reject(ERR);
            }
        });
    },
    /**
     * Creates a new driver
     * 
     * By passing a driver object {name: String, email: String, lat: String, lng: String}
     */
    save: (driver) => {
        let dbase;
        return new Promise(async (resolve, reject) => {
            try {
                // Load the database file in runtime
                dbase = await loadDatabase();
                // If there's a driver with the given email. Reject it.
                if (_.find(dbase.drivers.table, { email: driver.email }))
                    return reject("This email has been taken!");
                // Iterate the table index
                dbase.drivers.index += 1;
                // Save the driver
                dbase.drivers.table.push(_.merge(driver, {id: dbase.drivers.index}));
                // Update the database file
                await fs.writeFileSync(getDatabasePath(), JSON.stringify(dbase, null, 4), 'utf-8');
                // Return the driver
                resolve(driver);
            } catch(ERR) {
                reject(ERR);
            }
        });
    }
}
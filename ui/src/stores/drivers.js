// @flow

import Alt from '../vendors/alt';
import DriversActions from '../actions/drivers';

class DriversStore {

    constructor() {

        this.drivers = [];
        this.from_coordinates = false;
        this.driver_form_msg = false;
        this.goto = false;

        this.bindListeners({
            handleFetchDrivers: DriversActions.FETCH_DRIVERS,
            handleFetchDriversFromCoordinates: DriversActions.FETCH_DRIVERS_FROM_COORDINATES,
            handleSetDrivers: DriversActions.SET_DRIVERS,
            handleCreateDriver: DriversActions.CREATE_DRIVER,
            handleDeleteDriver: DriversActions.DELETE_DRIVER,
            handleSetError: DriversActions.SET_ERROR,
            handleGoToDriver: DriversActions.GO_TO_DRIVER,
        });

    }

    handleGoToDriver(coordinates) {
        this.goto = coordinates;
    }

    handleSetError(message) {
        this.driver_form_msg = message;
    }

    handleCreateDriver(driver) {
        this.driver_form_msg = false;
        this.drivers.push(driver);
    }

    handleDeleteDriver(id) {
        this.driver_form_msg = false;
        this.drivers = this.drivers.filter((d) => { return parseInt(d.id, 10) !== parseInt(id, 10)});
    }

    handleFetchDrivers() {
        this.drivers = [];
        this.from_coordinates = false;
    }

    handleFetchDriversFromCoordinates() {
        this.drivers = [];
        this.from_coordinates = false;
        this.driver_form_msg = false;
        this.goto = false;
    }

    handleSetDrivers(options) {
        this.drivers = options.drivers;
        this.from_coordinates = options.coordinates || false
    }


}

export default Alt.createStore(DriversStore, 'DriversStore');
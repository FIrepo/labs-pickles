import Alt from '../vendors/alt';

import DriversActions from '../actions/drivers';

class DriversStore {

    constructor() {

        this.drivers = [];
        this.from_coordinates = false;

        this.bindListeners({
            handleFetchDrivers: DriversActions.FETCH_DRIVERS,
            handleFetchDriversFromCoordinates: DriversActions.FETCH_DRIVERS_FROM_COORDINATES,
            handleSetDrivers: DriversActions.SET_DRIVERS
        });

    }

    handleFetchDrivers() {
        this.drivers = [];
        this.from_coordinates = false;
    }

    handleFetchDriversFromCoordinates() {
        this.drivers = [];
        this.from_coordinates = false;
    }

    handleSetDrivers(options) {
        this.drivers = options.drivers;
        this.from_coordinates = options.coordinates || false
    }


}

export default Alt.createStore(DriversStore, 'DriversStore');
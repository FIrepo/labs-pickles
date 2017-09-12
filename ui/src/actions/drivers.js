import { Api } from '../utils';
import { Paths } from '../config';
import Alt from '../vendors/alt';

import NProgress from 'nprogress/nprogress';

import CommonsActions from './commons';

class DriversActions {
    
    /**
     * Fetch drivers from coordinates
     * 
     * @param {String} lat The latitude
     * @param {String} lng The longitude
     */
    fetchDriversFromCoordinates(lat, lng) {
        return (dispatch) => {
            dispatch();
            NProgress.start();
            Api.get(`${Paths.to.api.drivers}?coordinates=${lat},${lng}`)
            .then((data) => {
                NProgress.done();
                if(data.status) {
                    this.setDrivers({drivers: data.data || [], coordinates: true});
                } else {
                    CommonsActions.showSnack(data.message);
                }
            })
            .catch((err) => {
                NProgress.done();
                console.log(err);
                CommonsActions.showSnack(err.message);
            });
        }
    }

    goToDriver(driver) {
        return {lat: driver.lat, lng: driver.lng};
    }

    /**
     * Fetch all drivers
     */
    fetchDrivers() {
        return (dispatch) => {
            dispatch();
            NProgress.start();
            Api.get(Paths.to.api.drivers)
            .then((data) => {
                NProgress.done();
                if(data.status) {
                    this.setDrivers({drivers: data.data || []});
                } else {
                    CommonsActions.showSnack(data.message);
                }
            })
            .catch((err) => {
                NProgress.done();
                console.log(err);
                CommonsActions.showSnack(err.message);
            });
        }
    }

    /**
     * Create a driver
     */
    createDriver(body) {
        return (dispatch) => {
            NProgress.start();
            Api.post(Paths.to.api.drivers, body)
            .then((data) => {
                NProgress.done();
                if(data.status) {
                    dispatch(body);
                } else {
                    this.setError(data.message);
                }
            })
            .catch((err) => {
                NProgress.done();
                console.log(err);
                this.setError(err.message);
            });
        }
    }

    /**
     * Delete a driver
     */
    deleteDriver(id) {
        return (dispatch) => {
            NProgress.start();
            Api.delete(Paths.to.api.driver.replace(':id', id))
            .then((data) => {
                NProgress.done();
                if (data.status) {
                    dispatch(id);
                } else {
                    CommonsActions.showSnack(data.message);
                }
            })
            .catch((err) => {
                NProgress.done();
                console.log(err);
                CommonsActions.showSnack(err.message);
            });
        }
    }

    setError(message) {
        return message;
    }

    setDrivers(options) {
        return options;
    }

}

export default Alt.createActions(DriversActions);
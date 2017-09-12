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
                this.setDrivers({drivers: data.data || [], coordinates: true});
            })
            .catch((err) => {
                console.log(err);
                CommonsActions.openDialog({ title: err.message, content: "There was an error loading your board. Please contact the administrator" });
            });
        }
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
                this.setDrivers({drivers: data.data || []});
            })
            .catch((err) => {
                console.log(err);
                CommonsActions.openDialog({ title: err.message, content: "There was an error loading your board. Please contact the administrator" });
            });
        }
    }

    setDrivers(options) {
        return options;
    }

}

export default Alt.createActions(DriversActions);
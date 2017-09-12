import { Api } from '../utils';
import { Maps } from '../config';
import Alt from '../vendors/alt';

import NProgress from 'nprogress/nprogress';

import CommonsActions from './commons';
import DriversActions from './drivers';

class MapsActions {
    
    /**
     * Geocode search by address
     * 
     * @param {String} address The address to lookup
     */
    fetchAddress(address) {
        return (dispatch) => {
            dispatch();
            NProgress.start();
            Api.get(`?address=${encodeURIComponent(address)}&key=${Maps.key}`, Maps.endpoints.geocode)
            .then((data) => {
                NProgress.done();
                if (data.status && data.results.length) {
                    this.setAddress(data.results[0]);
                } else {
                    if (!data.status) CommonsActions.showSnack(data.message);
                    this.setAddress(false);
                }
            })
            .catch((err) => {
                NProgress.done();
                console.log(err);
                CommonsActions.showSnack(err.message);
            });
        }
    }

    clearAddress() {
        return (dispatch) => {
            dispatch();
            DriversActions.fetchDrivers();
        }
    }

    setAddress(results) {
        return results;
    }

}

export default Alt.createActions(MapsActions);
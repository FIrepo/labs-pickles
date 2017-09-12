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
                if (data.results.length) {
                    NProgress.done();
                    this.setAddress(data.results[0]);
                } else {
                    this.setAddress(false);
                }
            })
            .catch((err) => {
                console.log(err);
                CommonsActions.openDialog({ title: err.message, content: "There was an error loading your board. Please contact the administrator" });
            });
        }
    }

    setAddress(results) {
        return results;
    }

}

export default Alt.createActions(MapsActions);
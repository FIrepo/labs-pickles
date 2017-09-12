// @flow

import Alt from '../vendors/alt';
import MapsActions from '../actions/maps';

class MapsStore {

    constructor() {

        this.address = false;
        this.from_coordinates = false;

        this.bindListeners({
            handleFetchAddress: MapsActions.FETCH_ADDRESS,
            handleSetAddress: MapsActions.SET_ADDRESS,
            handleClearAddress: MapsActions.CLEAR_ADDRESS,
        });

    }

    handleFetchAddress() {
        this.address = false;
    }

    handleClearAddress() {
        this.address = false;
        this.from_coordinates = false;
    }
    
    handleSetAddress(address) {
        this.address = address;
    }


}

export default Alt.createStore(MapsStore, 'MapsStore');
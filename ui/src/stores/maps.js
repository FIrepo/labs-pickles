import Alt from '../vendors/alt';

import MapsActions from '../actions/maps';

class MapsStore {

    constructor() {

        this.address = false;

        this.bindListeners({
            handleFetchAddress: MapsActions.FETCH_ADDRESS,
            handleSetAddress: MapsActions.SET_ADDRESS
        });

    }

    handleFetchAddress() {
        this.address = false;
    }

    handleSetAddress(address) {
        this.address = address;
    }


}

export default Alt.createStore(MapsStore, 'MapsStore');
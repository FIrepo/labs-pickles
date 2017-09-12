import Alt from '../vendors/alt';

import NProgress from 'nprogress/nprogress';


import CommonsActions from '../actions/commons';

class CommonsStore {

    constructor() {
        this.dialog = false;
        this.snack = false;
        this.bindListeners({
            openDialog: CommonsActions.OPEN_DIALOG,
            dismissDialog: CommonsActions.DISMISS_DIALOG,
            showSnack: CommonsActions.SHOW_SNACK,
            dismissSnack: CommonsActions.DISMISS_SNACK
        });
    }

    openDialog(options) {
        NProgress.done();
        this.dialog = {...{open: true}, ...options};
        
    }

    showSnack(options) {
        NProgress.done();
        this.snack = {...{open: true}, ...options};
    }

    dismissSnack(options) {
        NProgress.done();
        if(options.r === 'clickaway') return;
        this.snack.open = false;
    }
        
    dismissDialog() {
        NProgress.done();
        this.dialog.open = false;
    }

}

export default Alt.createStore(CommonsStore, 'CommonsStore');
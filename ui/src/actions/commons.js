import Alt from '../vendors/alt';

class CommonsActions {
    
    openDialog(options) {
        return options;
    }

    showSnack(message) {
        return message;
    }

    dismissSnack(event, reason) {
        return (dispatch) => {
            dispatch({e: event, r: reason});
        }
    }

    dismissDialog() {
        return (dispatch) => {
            dispatch();
        }
    }

}

export default Alt.createActions(CommonsActions);
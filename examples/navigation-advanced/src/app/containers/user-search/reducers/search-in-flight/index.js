import * as ActionTypes from '../../../../action-types';

export const searchInFlight = (state = false, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.SEARCHED_USERS:
            return true;
        case ActionTypes.RECEIVED_USERS:
        case ActionTypes.CLEARED_SEARCH_RESULTS:
            return false;
        default:
            return state;
    }
    /* eslint-enable indent */
};

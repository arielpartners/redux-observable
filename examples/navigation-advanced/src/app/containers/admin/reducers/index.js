import * as ActionTypes from '../../../action-types';

const DENIED = 'DENIED';

export const adminAccess = (state = null, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.ACCESS_DENIED:
            return DENIED;
        default:
            return state;
    }
    /* eslint-enable indent */
};

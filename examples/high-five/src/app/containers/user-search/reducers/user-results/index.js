import * as ActionTypes from '../../../../action-types';

const initialState = [];
export const userResults = (state = initialState, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.RECEIVED_USERS:
            return action.payload.users;
        case ActionTypes.CLEARED_SEARCH_RESULTS:
            return initialState;
        default:
            return state;
    }
    /* eslint-enable indent */
};

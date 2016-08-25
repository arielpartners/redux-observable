import * as ActionTypes from '../../../action-types';

export const reposByUser = (state = {}, action) => {
    /* eslint-disable indent */
    switch (action.type) {
        case ActionTypes.REQUESTED_USER_REPOS:
            return {
                ...state,
                [action.payload.user]: undefined
            };
        case ActionTypes.RECEIVED_USER_REPOS:
            return {
                ...state,
                [action.payload.user]: action.payload.repos
            };
        default:
            return state;
    }
    /* eslint-enable indent */
};

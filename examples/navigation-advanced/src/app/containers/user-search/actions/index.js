import * as ActionTypes from '../../../action-types';

export const clearSearchResults = () => {
    return {
        type: ActionTypes.CLEARED_SEARCH_RESULTS
    };
};

export const receiveUsers = users => {
    return {
        type: ActionTypes.RECEIVED_USERS,
        payload: {
            users
        }
    };
};

export const searchUsers = (query) => {
    return {
        type: ActionTypes.SEARCHED_USERS,
        payload: {
            query
        }
    };
};

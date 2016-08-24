import * as ActionTypes from '../action-types';

export const receiveUserRepos = (user, repos) => {
    return {
        type: ActionTypes.RECEIVED_USER_REPOS,
        payload: {
            user,
            repos
        }
    };
};

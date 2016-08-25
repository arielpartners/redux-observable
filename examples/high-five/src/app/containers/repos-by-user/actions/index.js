import * as ActionTypes from '../../../action-types';

export const receiveUserRepos = (user, repos) => {
    return {
        type: ActionTypes.RECEIVED_USER_REPOS,
        payload: {
            user,
            repos
        }
    };
};

export const requestReposByUser = (user) => {
    return {
        type: ActionTypes.REQUESTED_USER_REPOS,
        payload: {
            user
        }
    };
};

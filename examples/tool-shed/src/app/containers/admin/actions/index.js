import * as ActionTypes from '../../../action-types';

export const accessDenied = () => {
    return {
        type: ActionTypes.ACCESS_DENIED
    };
};

export const checkAdminAccess = () => {
    return {
        type: ActionTypes.CHECKED_ADMIN_ACCESS
    };
};

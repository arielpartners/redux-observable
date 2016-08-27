import {ajax} from 'rxjs/observable/dom/ajax';
import * as ActionTypes from '../../../action-types';
import {receiveUserRepos} from '../actions';

export default action$ => {
    return action$.ofType(ActionTypes.REQUESTED_USER_REPOS)
        .map(action => action.payload.user)
        .switchMap(user =>
            ajax.getJSON(`https://api.github.com/users/${user}/repos`)
                .map(receiveUserRepos.bind(null, user))
        );
};

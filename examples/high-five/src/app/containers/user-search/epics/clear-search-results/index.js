import * as ActionTypes from '../../../../action-types';
import {clearSearchResults} from '../../actions';

export default action$ =>
    action$.ofType(ActionTypes.SEARCHED_USERS)
        .filter(action => !action.payload.query)
        .map(clearSearchResults);

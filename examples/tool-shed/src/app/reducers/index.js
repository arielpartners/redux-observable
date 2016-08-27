import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import * as adminReducers from '../containers/admin/reducers';
import * as reposByUserReducers from '../containers/repos-by-user/reducers';
import * as userSearchReducers from '../containers/user-search/reducers';
import * as loginReducers from '../containers/login/reducers';

export default combineReducers(
    {
        ...adminReducers,
        ...userSearchReducers,
        ...reposByUserReducers,
        ...loginReducers,
        routing: routerReducer
    }
);

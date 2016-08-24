import {combineEpics} from 'redux-observable';

import AdminEpics from '../containers/admin/epics';
import ReposByUserEpics from '../containers/repos-by-user/epics';
import UserSearchEpics from '../containers/user-search/epics';

export default combineEpics(
    AdminEpics,
    ReposByUserEpics,
    UserSearchEpics
);

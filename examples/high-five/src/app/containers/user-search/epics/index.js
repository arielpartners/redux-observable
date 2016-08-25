import {combineEpics} from 'redux-observable';

import {searchUsers} from './search-users';
import clearSearchResults from './clear-search-results';

export default combineEpics(
    searchUsers,
    clearSearchResults
);

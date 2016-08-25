/*
 redux-observable does not automatically add every RxJS operator to
 the Observable prototype. Because there are many ways to add them,
 our examples will not include any imports. If you want to add every
 operator, put import 'rxjs'; in your entry index.js.

 More info: https://github.com/ReactiveX/rxjs#installation-and-usage
 */
import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createHistory, useBasename} from 'history';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {persistStore} from 'redux-persist';
import configureStore from './store';

// Containers
import UserSearch from './containers/user-search';
import ReposByUser from './containers/repos-by-user';
import Admin from './containers/admin';

const store = configureStore();
persistStore(store, {blacklist: ['error', 'routing']});

const browserHistory = useRouterHistory(useBasename(createHistory))({
    basename: ''
});

const history = syncHistoryWithStore(
    browserHistory,
    store
);

const App = ({children}) =>
    <div>
        {children}
    </div>;

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route path='/' component={App}>
                <IndexRoute component={UserSearch}/>
                <Route path='repos/:user' component={ReposByUser}/>
                <Route path='admin' component={Admin}/>
            </Route>
        </Router>
    </Provider>,
    document.querySelector('.app')
);

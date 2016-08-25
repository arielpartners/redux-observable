import React from 'react';
import {connect} from 'react-redux';
import {Repos} from './components/repos';
import {requestReposByUser} from './actions';

class ReposByUser extends React.Component {
    componentDidMount() {
        this.props.requestReposByUser(this.props.params.user);
    }

    componentWillReceiveProps(nextProps) {
        const {user} = this.props.params;
        if (user !== nextProps.params.user) {
            this.props.requestReposByUser(user);
        }
    }

    render() {
        const {
            reposByUser,
            user
        } = this.props;
        if (!reposByUser[user]) {
            return (
                <p>Loading</p>
            );
        }
        return (
            <Repos
                repos={reposByUser[user]}
                user={user}
            />
        );
    }
}

export default connect(
    // Map State to Props (Reducers/ownProps)
    ({reposByUser}, ownProps) =>  ({ // from reducers/ownprops
        reposByUser,
        user: ownProps.params.user
    }),
    // Map DispatchToProps (Actions)
    {requestReposByUser}
)(ReposByUser);


// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import StatusBar from 'components/StatusBar';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import Login from 'components/Login';
import { Provider } from 'components/HOC/withProfile';

//Instruments
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Инна',
    currentUserLastName:  'Бодак',
};
@hot(module)
export default class App extends Component {
    state = {
        avatar:               '',
        currentUserFirstName: '',
        currentUserLastName:  '',
        loggedIn:             false,
    };

    componentDidMount() {
        this._authentify();
    }

    _authentify = () => {
        let user = JSON.parse(localStorage.getItem('user')) || null;
        if (user) {
            this.setState({
                ...user,
            });
        } else {
            return null;
        }
    };

    _handleLogIn = (options) => {
        const status = this.state.loggedIn;

        const user = {
            ...options,
            loggedIn: !status,
        };
        this.setState({
            ...user,
        });
        localStorage.setItem('user', JSON.stringify(user));
    };

    _handleLogOut = () => {
        const user = {
            avatar:               '',
            currentUserFirstName: '',
            currentUserLastName:  '',
            loggedIn:             false,
        };

        this.setState({
            ...user,
        });
        localStorage.removeItem('user');
    };

    render() {
        const { loggedIn, ...user } = this.state;

        return (
            <Catcher>
                <Provider value = { user }>
                    {loggedIn ? (
                        <>
                            <StatusBar _handleLogOut = { this._handleLogOut } />
                            <Switch>
                                <Route
                                    component = { Feed }
                                    path = '/feed'
                                />
                                <Route
                                    component = { Profile }
                                    path = '/profile'
                                />
                                <Redirect to = '/feed' />
                            </Switch>
                        </>
                    ) : (
                        <Switch>
                            <Route
                                path = '/login'
                                render = { () => (
                                    <Login
                                        _handleLogIn = { this._handleLogIn }
                                        { ...options }
                                    />
                                ) }
                            />
                            <Redirect to = '/login' />
                        </Switch>
                    )}
                </Provider>
            </Catcher>
        );
    }
}

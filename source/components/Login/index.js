//Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

//Instruments
import Styles from './styles.m.css';
import { withProfile } from '../../components/HOC/withProfile';

@withProfile
export default class Login extends Component {
    static propTypes = {
        _handleLogIn: func.isRequired,
    };

    _animateLoginEnter = (login) => {
        fromTo(login, 1, { opacity: 0 }, { opacity: 1 });
    };

    _handleLogIn = () => {
        const { _handleLogIn, ...user } = this.props;
        _handleLogIn(user);
    };

    render() {
        return (
            <Transition
                appear
                in
                timeout = { 400 }
                onEnter = { this._animateLoginEnter }>
                <section className = { Styles.login }>
                    <a onClick = { this._handleLogIn }>Log in</a>
                </section>
            </Transition>
        );
    }
}

//Core
import React, { Component } from 'react';
import { func } from 'prop-types';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import cx from 'classnames';

//Components
// import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
import avatar from 'theme/assets/lisa';
// @withProfile
export default class Login extends Component {
    static propTypes = {
        _handleLogIn: func.isRequired,
    };

    state = {
        currentUserFirstName: '',
        currentUserLastName:  '',
        avatar:               avatar,
    };

    _animateLoginEnter = (login) => {
        fromTo(login, 1, { opacity: 0 }, { opacity: 1 });
    };

    _handleCurrentUserFirstName = (event) => {
        this.setState({
            currentUserFirstName: event.target.value,
        });
    };

    _handleCurrentUserLastName = (event) => {
        this.setState({
            currentUserLastName: event.target.value,
        });
    };

    _handleBlur = (event) => {
        event.target.className = '';
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        const { currentUserFirstName, currentUserLastName } = this.state;
        const [ ...inpArr ] = event.target.querySelectorAll('input');
        inpArr.forEach((elem) => {
            this._inputValidation(elem);
        });
        if (currentUserFirstName && currentUserLastName) {
            this._handleLogIn();
        } else {
            return null;
        }
    };

    _handleLogIn = () => {
        const { _handleLogIn } = this.props;
        const user = this.state;
        _handleLogIn(user);
    };

    _inputValidation = (elem) => {
        const regExp = /^[A-Za-zА-я]{2,}$/;
        const checkName = regExp.test(elem.value);
        console.log(checkName);
        const style = cx('', {
            [ Styles.invalid ]: !checkName,
            [ Styles.valid ]:   checkName,
        });
        elem.className = style;
    };

    render() {
        const { currentUserFirstName, currentUserLastName } = this.state;

        return (
            <Transition
                appear
                in
                timeout = { 400 }
                onEnter = { this._animateLoginEnter }>
                <section className = { Styles.login }>
                    <form onSubmit = { this._handleFormSubmit }>
                        <input
                            autoComplete = 'off'
                            id = 'currentUserFirstName'
                            placeholder = 'First Name'
                            type = 'text'
                            value = { currentUserFirstName }
                            onBlur = { this._handleBlur }
                            onChange = { this._handleCurrentUserFirstName }
                        />
                        <input
                            autoComplete = 'off'
                            id = 'currentUserLastName'
                            placeholder = 'Last Name'
                            type = 'text'
                            value = { currentUserLastName }
                            onBlur = { this._handleBlur }
                            onChange = { this._handleCurrentUserLastName }
                        />
                        <button type = 'submit'>Log in</button>
                    </form>
                </section>
            </Transition>
        );
    }
}

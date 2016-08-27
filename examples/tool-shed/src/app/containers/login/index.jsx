import React from 'react';
import {connect} from 'react-redux';

import * as LoginActions from './actions';

/*global componentHandler*/
/* istanbul ignore next  */
if (__WEBPACK__) {
    require('./style.scss');
}

const LOGIN = "Login";
const CHANGE_PASSWORD = "Change Password";
const CHANGE_EMAIL = "Change Email";

export const getFormData = (inputs, toOmit=[]) => {
    var cb = (data, input) => {
        const name = input.id;
        const value = input.value;
        if (toOmit.indexOf(name) === -1) {
            data[name] = value === '' ? undefined : value;
        }
        return data;
    };
    return inputs.reduce(cb, {});
};

/* eslint-disable no-shadow, max-len*/
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { submitButtonLabel: LOGIN };
    }

    componentDidMount(){
        this.props.loggingIn();
        componentHandler.upgradeDom();
        let email = document.querySelector("#email");
        if (email) {
            email.focus();
        }
    }
    componentDidUpdate(){
        componentHandler.upgradeDom();
    }

    isChangePassword() {
        return this.state.submitButtonLabel === CHANGE_PASSWORD;
    }
    isChangeEmail() {
        return this.state.submitButtonLabel === CHANGE_EMAIL;
    }
    setFormState(newLabel) {
        this.setState({submitButtonLabel:newLabel});
    }

    isValid(form) {
        return form.querySelectorAll('*:invalid').length === 0;
    }

    onSubmit(form, inputs) {
        form.classList.remove('invalid');
        if (!this.isValid(form)) {
            form.classList.add('invalid');
        } else {
            if (this.isChangeEmail()) {
                if (inputs[2].value !== inputs[3].value) {
                    // emails must match
                    inputs[2].parentNode.classList.add('is-invalid');
                    inputs[3].parentNode.classList.add('is-invalid');
                    form.classList.add('invalid');
                } else {
                    const toOmit = ['updatedPassword', 'confirmedPassword', 'confirmedEmail'];
                    this.props.changeEmail(getFormData(inputs, toOmit));
                }
            } else if (this.isChangePassword()) {
                if (inputs[4].value !== inputs[5].value) {
                    // passwords must match
                    inputs[4].parentNode.classList.add('is-invalid');
                    inputs[5].parentNode.classList.add('is-invalid');
                    form.classList.add('invalid');
                } else {
                    const toOmit = ['updatedEmail', 'confirmedEmail','confirmedPassword'];
                    this.props.changePassword(getFormData(inputs, toOmit));
                }
            }
            else {
                this.props.login(getFormData(inputs));
            }
        }
    }

    render() {
        const {error} = this.props,
            inputs = [],
            addInput = (input) => {
                inputs.push(input);
            },
            labelClass = 'mdl-textfield__label',
            inputClass = 'mdl-textfield__input',
            errorClass = 'mdl-textfield__error',
            fieldSetClass = 'mdl-textfield mdl-js-textfield mdl-textfield--floating-label extrawide';

        let form;

        return (
            <div className="login-container">
                <a className="hiddenanchor" id="tochange-email">invisible</a>
                <a className="hiddenanchor" id="tochange-password">invisible</a>
                <div className="login-component mdl-card mdl-shadow--6dp">
                    <div className="mdl-card__title mdl-color--black mdl-color-text--white">
                        <h2 className="mdl-card__title-text">Login</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        <form ref={(ref)=> {form = ref}}
                              className="mdl-card__supporting-text"
                              noValidate>
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       required={true}
                                       type="email"
                                       tabIndex={1}
                                       id="email"/>
                                <label className={labelClass} htmlFor="email">Email</label>
                                <span className={errorClass}>Valid email address is required</span>
                            </div>
                            <div className={fieldSetClass}>
                                <input ref={addInput}
                                       className={inputClass}
                                       type="password"
                                       tabIndex={2}
                                       required={true}
                                       id="password"/>
                                <label className={labelClass} htmlFor="password">Password</label>
                                <span className={errorClass}>Password is required</span>
                            </div>
                            <div className="change-email">
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="email"
                                           required={this.isChangeEmail()}
                                           id="updatedEmail"/>
                                    <label className={labelClass} htmlFor="updatedEmail">New Email</label>
                                    <span className={errorClass}>Email address must be valid and match confirmation</span>
                                </div>
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="email"
                                           required={this.isChangeEmail()}
                                           id="confirmedEmail"/>
                                    <label className={labelClass} htmlFor="confirmedEmail">Confirm New
                                        Email</label>
                                    <span className={errorClass}>Email address must be valid and match above</span>
                                </div>
                            </div>
                            <div className="change-password">
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="password"
                                           required={this.isChangePassword()}
                                           id="updatedPassword"/>
                                    <label className={labelClass} htmlFor="updatedPassword">New Password</label>
                                    <span className={errorClass}>Password required, must match confirmation</span>
                                </div>
                                <div className={fieldSetClass}>
                                    <input ref={addInput}
                                           className={inputClass}
                                           type="password"
                                           required={this.isChangePassword()}
                                           id="confirmedPassword"/>
                                    <label className={labelClass} htmlFor="confirmedPassword">Confirm New
                                        Password</label>
                                    <span className={errorClass}>Password required, must match above</span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="change-links">
                        <div className="tologin">
                            <p className="change-link">
                                Changed your mind?
                                <a onClick={()=>this.setFormState(LOGIN)} href="#tologin">Log in</a>
                            </p>
                        </div>
                        <div className="tochange-email">
                            <p className="change-link">
                                Want to change your email?
                                <a onClick={()=>this.setFormState(CHANGE_EMAIL)} href="#tochange-email">Change it</a>
                            </p>
                        </div>
                        <div className="tochange-password">
                            <p className="change-link">
                                Want to change your password?
                                <a onClick={()=>this.setFormState(CHANGE_PASSWORD)} href="#tochange-password">Change it</a>
                            </p>
                        </div>
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <button onClick={()=>this.onSubmit(form, inputs)}
                                className="mdl-button
                                           mdl-button--colored
                                           mdl-js-button
                                           mdl-js-ripple-effect"
                                tabIndex={3}
                                type="submit">{this.state.submitButtonLabel}</button>
                        {
                            (error) ?
                                <p className="mdl-color-text--red">{error.message}</p> : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    login: React.PropTypes.func,
    changeEmail: React.PropTypes.func,
    changePassword: React.PropTypes.func,
    error: React.PropTypes.object
};

export default connect(
    // Map State to Props (Reducers)
    (state) => state,
    //Map DispatchToProps (Actions)
    {...LoginActions}
)(Login);

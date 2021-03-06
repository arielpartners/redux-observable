/*
 Copyright (c) 2015 Home Box Office, Inc. as an unpublished
 work. Neither this material nor any portion hereof may be copied
 or distributed without the express written consent of Home Box Office, Inc. *
 This material also contains proprietary and confidential information
 of Home Box Office, Inc. and its suppliers, and may not be used by or
 disclosed to any person, in whole or in part, without the prior written
 consent of Home Box Office, Inc.
 */

/* global describe, it, beforeEach, afterEach, componentHandler */
import React from 'react';
import {Login} from './';
import sinon from 'sinon';
import {shallow, mount} from 'enzyme';
import {expect} from 'chai';

/* eslint-disable no-unused-expressions, max-statements, no-console, camelcase, max-nested-callbacks */
describe('Login component', () => {
    let wrapper,
        props = {};
    beforeEach(()=> {
        props = {
            login: sinon.spy(),
            changeEmail: sinon.spy(),
            changePassword: sinon.spy(),
        };
    });
    afterEach(()=> {
        props.login.reset();
        props.changeEmail.reset();
        props.changePassword.reset();
    });
    describe('Component Lifecycle methods', ()=> {
        describe('componentWillMount', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                componentHandler.upgradeDom = sinon.spy();
                wrapper = mount(<Login {...props} />);
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });

        describe('componentDidUpdate', ()=> {
            it('should call componentHandler.upgradeDom', ()=> {
                wrapper = mount(<Login {...props} />);
                componentHandler.upgradeDom = sinon.spy();
                wrapper.update();
                componentHandler.upgradeDom.called.should.be.ok;
            });
        });
    });
    describe('render form', ()=> {
        beforeEach(()=> {
            wrapper = shallow(<Login {...props} />);
        });
        it('should render three email fields', () => {
            const input = wrapper.find('input[type="email"]');
            expect(input).to.have.length(3);
        });
        it('should render three password fields', () => {
            const input = wrapper.find('input[type="password"]');
            expect(input).to.have.length(3);
        });
        it('should render a submit button', () => {
            const button = wrapper.find('button[type="submit"]');
            expect(button).to.have.length(1);
        });
    });
    describe('buttons', ()=> {
        let button;
        it('should call props.login when submit is clicked in the normal case', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.login.called).to.equal(true);
        });
        it('should not call props.login when submit is clicked if the form is invalid', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(false);
            button.simulate('click');
            expect(props.login.called).to.equal(false);
        });
        it('should call props.changeEmail when submit is clicked when changing email', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangeEmail = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.changeEmail.called).to.equal(true);
        });
        it('should not call props.changeEmail when submit is clicked when changing email if emails dont match', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangeEmail = sinon.stub().returns(true);
            const newEmailInput = wrapper.find('input[id="updatedEmail"]').get(0);
            const newEmailConfirmInput = wrapper.find('input[id="confirmedEmail"]').get(0);
            newEmailInput.value = 'a@b.com';
            newEmailConfirmInput.value = 'UhOh@idontmatch.com';
            button.simulate('click');
            expect(props.changeEmail.called).to.equal(false);
        });
        it('should call props.changeEmail when submit is clicked when changing email if emails match', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangeEmail = sinon.stub().returns(true);
            const newEmailInput = wrapper.find('input[id="updatedEmail"]').get(0);
            const newEmailConfirmInput = wrapper.find('input[id="confirmedEmail"]').get(0);
            newEmailInput.value = 'my.new@email.com';
            newEmailConfirmInput.value = 'my.new@email.com';
            button.simulate('click');
            expect(props.changeEmail.called).to.equal(true);
        });
        it('should call props.changePassword when submit is clicked after clicking change password', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangePassword = sinon.stub().returns(true);
            button.simulate('click');
            expect(props.changePassword.called).to.equal(true);
        });
        it('should not call props.changePassword when submit is clicked when changing pwd if pwds dont match', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangePassword = sinon.stub().returns(true);
            const newPasswordInput = wrapper.find('input[id="updatedPassword"]').get(0);
            const newPasswordConfirmInput = wrapper.find('input[id="confirmedPassword"]').get(0);
            newPasswordInput.value = 'newPassword';
            newPasswordConfirmInput.value = 'doesntmatch';
            button.simulate('click');
            expect(props.changePassword.called).to.equal(false);
        });
        it('should call props.changePassword when submit is clicked when changing passwd if passwords match', () => {
            wrapper = mount(<Login {...props} />);
            button = wrapper.find('button[type="submit"]');
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangePassword = sinon.stub().returns(true);
            const newPasswordInput = wrapper.find('input[id="updatedPassword"]').get(0);
            const newPasswordConfirmInput = wrapper.find('input[id="confirmedPassword"]').get(0);
            newPasswordInput.value = 'iMatchPerfectly';
            newPasswordConfirmInput.value = 'iMatchPerfectly';
            button.simulate('click');
            expect(props.changePassword.called).to.equal(true);
        });
        it('should display an error message if an error is defined', ()=> {
            props.error = {message: 'oops something broke'};
            wrapper = mount(<Login {...props} />);
            wrapper.find('button[type="submit"]');
            expect(wrapper.text()).to.contain(props.error.message);
        });
    });
    describe('isValid', ()=> {
        it('should return true if result of querySelectorAll has no items', ()=> {
            const el = {
                querySelectorAll: ()=>[]
            };
            wrapper = mount(<Login {...props} />);

            wrapper.node.isValid(el).should.equal(true);
        });

        it('should return false if result of querySelectorAll has items', ()=> {
            const el = {
                querySelectorAll: ()=>[1, 2]
            };
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid(el).should.equal(false);
        });

        it('should query for invalid element with element.querySelectorAll', ()=> {
            const el = {
                querySelectorAll: sinon.stub().returns([])
            };
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid(el);
            el.querySelectorAll.args[0][0].should.equal('*:invalid');
        });
    });
    describe('onSubmit', ()=> {
        let form;
        beforeEach(()=> {
            form = {
                classList: {
                    add: sinon.spy(),
                    remove: sinon.spy()
                }
            };
        });
        it('should call login function with correct form field input values if isValid returns true', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(true);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(false);
            expect(props.login.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                password: 'password'
            });
        });
        it('should not call login function if isValid returns false', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.onSubmit(form, inputs);
            expect(props.login.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(true);
        });
        it('should call changeEmail function with correct form field input values if isValid returns true', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                },
                {
                    id: 'updatedEmail',
                    getAttribute: ()=>'text',
                    value: 'c@d.com'
                },
                {
                    id: 'confirmedEmail',
                    getAttribute: ()=>'text',
                    value: 'c@d.com'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangeEmail = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.changeEmail.called).to.equal(true);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(false);
            expect(props.changeEmail.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                password: 'password',
                updatedEmail: 'c@d.com'
            });
        });
        it('should not call changeEmail function if isValid returns false', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                },
                {
                    id: 'updatedEmail',
                    getAttribute: ()=>'text',
                    value: 'c@d.com'
                },
                {
                    id: 'confirmedEmail',
                    getAttribute: ()=>'text',
                    value: 'c@d.com'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.isChangeEmail = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.changeEmail.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(true);
        });
        it('should call changeEmail function with correct form field input values if isValid returns true', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }, {id: 'updatedEmail'}, {id: 'confirmedEmail'},
                {
                    id: 'updatedPassword',
                    getAttribute: ()=>'password',
                    value: 'MyNewPassword'
                },
                {
                    id: 'confirmedPassword',
                    getAttribute: ()=>'password',
                    value: 'MyNewPassword'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(true);
            wrapper.node.isChangePassword = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.changePassword.called).to.equal(true);
            expect(form.classList.remove.called).to.equal(true);
            expect(props.changePassword.args[0][0]).to.deep.equal({
                email: 'a@b.com',
                password: 'password',
                updatedPassword: 'MyNewPassword'
            });
        });
        it('should not call changeEmail function if isValid returns false', ()=> {
            const inputs = [
                {
                    id: 'email',
                    getAttribute: ()=>'text',
                    value: 'a@b.com'
                },
                {
                    id: 'password',
                    getAttribute: ()=>'password',
                    value: 'password'
                }, {id: 'updatedEmail'}, {id: 'confirmedEmail'},
                {
                    id: 'updatedPassword',
                    getAttribute: ()=>'password',
                    value: 'MyNewPassword'
                },
                {
                    id: 'confirmedPassword',
                    getAttribute: ()=>'password',
                    value: 'MyNewPassword'
                }
            ];
            wrapper = mount(<Login {...props} />);
            wrapper.node.isValid = sinon.stub().returns(false);
            wrapper.node.isChangePassword = sinon.stub().returns(true);
            wrapper.node.onSubmit(form, inputs);
            expect(props.changePassword.called).to.equal(false);
            expect(form.classList.remove.called).to.equal(true);
            expect(form.classList.add.called).to.equal(true);
        });
    });
});

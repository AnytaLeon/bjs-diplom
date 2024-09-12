'use strict';

const userForm = new UserForm();

function logInAction(data) {
    ApiConnector.login(data, response => {
        if (response.success) {
            document.location.reload();
        } else {
            UserForm.setLoginErrorMessage(response.error);
        }
})
};

userForm.loginFormCallback = logInAction;

function registerAction(data) {
    ApiConnector.register(data, response => {
        if (response.success) {
            document.location.reload();
        } else {
            UserForm.setRegisterErrorMessage(response.error);
        }
    })
};

userForm.registerFormCallback = registerAction;
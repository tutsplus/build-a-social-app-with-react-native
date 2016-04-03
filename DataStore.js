'use strict';
import Reflux from 'reflux';

import AccessToken from 'Social/AccessToken';
import Actions from 'Social/Actions';
import ApiRequest from 'Social/ApiRequest';

let currentUser = null;

export default Reflux.createStore({
  listenables: Actions,
  init: function () {},

  getCurrentUser() {
    return currentUser;
  },
  setCurrentUser(uid, user) {
    currentUser = Object.assign({ uid: uid }, user);
  },

  onLogin: function (data) {
    ApiRequest.login(data)
      .then((authData) => {
        AccessToken.set(authData.token)
          .then(() => Actions.login.completed(authData))
      })
      .catch((err) => Actions.login.failed(err))
  },
  onLoginCompleted: function (data) {
    Actions.loadUser(data.uid);
  },
  onLoginFailed: function (error) {
    console.log("Login failed with error: ", error.message);
  },

  onSignup: function (data) {
    ApiRequest.signup(data)
      .then((userData) => Actions.signup.completed(data, userData))
      .catch((err) => Actions.signup.failed(err));
  },
  onSignupCompleted: function (data, user) {
    Actions.login(data);
  },
  onSignupFailed: function (error) {
    console.error("Signup failed with error", error.message);
  },

  onLoadUser: function (userId) {
    ApiRequest.loadUser(userId)
      .then((user) => Actions.loadUser.completed(userId, user))
      .catch((err) => Actions.loadUser.failed(err));
  },
  onLoadUserCompleted: function (uid, user) {
    this.setCurrentUser(uid, user);
  },
  onLoadUserFailed: function (error) {
    console.error("Loading user failed with error: ", error.message);
  },

  onLogout: function () {
    ApiRequest.logout();
    AccessToken.clear();
  }
});

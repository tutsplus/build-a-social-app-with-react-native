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
  },

  onOnboard: function (payload) {
    let currentUser = this.getCurrentUser();
    ApiRequest.updateUser(currentUser.uid, payload)
      .then((user) => Actions.onboard.completed(user))
      .catch((err) => Actions.onboard.failed(err))
  },

  onUploadPost: function (image, position) {
    ApiRequest.uploadPost({
      userId: this.getCurrentUser().uid,
      user: this.getCurrentUser().name,
      picture: image,
      createdAt: new Date().toString(),
      position: JSON.stringify(position)
    })
      .then((data) => Actions.uploadPost.completed(data))
      .catch((err) => Actions.uploadPost.failed(err));
  },

  onUploadPostCompleted: function (newPost) {
    if (this.posts) {
      this.posts.push(newPost);
      this.trigger(this.getTransformedData());
    } else {
      this._updateList({ new: newPost });
    }
  },

  onLoadPosts: function () {
    ApiRequest.loadPosts()
      .then((data) => Actions.loadPosts.completed(data))
      .catch((err) => Actions.loadPosts.failed(err));
  },

  onLoadPostsCompleted: function (items) {
    this._updateList(items);
  },

  _updateList: function (items) {
    if (!items) { return; }
    this.posts = Object.values(items);
    this.trigger(this.getTransformedData());
  },

  getTransformedData: function () {
    let transformedData = this.posts;
    return transformedData.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }
});

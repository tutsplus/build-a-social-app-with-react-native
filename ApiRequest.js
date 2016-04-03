'use strict';
import Firebase from 'firebase';

const FirebaseURL = 'https://tutsplus-social.firebaseio.com/';

class ApiRequest {
  constructor() {
    this.firebase = new Firebase(FirebaseURL);
  }

  signup(data) {
    return new Promise((next, error) => {
      this.firebase.createUser(data)
        .then((authData) => {
          let userRef = this.firebase.child('profiles').child(authData.uid);
          userRef.set({ email: data.email })
            .then(() => next(data))
            .catch((err) => error(err));
        })
        .catch((err) => error(err));
    });
  }

  login(data) {
    return new Promise((next, error) => {
      let callback = function (err, authData) {
        if (err) {
          error(err);
        } else {
          next(authData);
        }
      };

      if (data && data.email && data.password) {
        this.firebase.authWithPassword(data, callback);
      } else {
        this.firebase.authWithCustomToken(data, callback);
      }
    });
  }

  logout() {
    this.firebase.unauth();
  }

  loadUser(uid) {
    return new Promise((next, error) => {
      this.firebase.child('profiles').child(uid).once('value')
        .then((snapshot) => next(snapshot.val()))
        .catch((err) => error(err));
    });
  }

  updateUser(uid, payload) {
    return new Promise((next, error) => {
      let userRef = this.firebase.child('profiles').child(uid);
      userRef.update(payload)
        .then(() => next(payload))
        .catch((err) => error(err))
    });
  }

  uploadPost(payload) {
    return new Promise((next, error) => {
      let postRef = this.firebase.child('posts');
      postRef.push(payload)
        .then(() => next(payload))
        .catch((err) => error(err));
    });
  }

  loadPosts() {
    return new Promise((next, error) => {
      this.firebase.child('posts').once('value')
        .then((snapshot) => next(snapshot.val()))
        .catch((err) => error(err));
    });
  }
}

export default new ApiRequest();

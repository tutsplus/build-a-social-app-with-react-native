'use strict';
import React, {
  AsyncStorage
} from 'react-native';

class AccessToken {
  get() {
    return new Promise((next, error) => {
      if (this._accessToken) return next(this._accessToken);

      AsyncStorage.getItem("ACCESS_TOKEN")
        .then((token) => {
          if (token) {
            next(token);
          } else {
            error();
          }
        })
        .catch((err) => error(err));
    });
  }

  set(token) {
    this._accessToken = token;
    return AsyncStorage.setItem("ACCESS_TOKEN", token);
  }

  clear() {
    this._accessToken = null;
    return AsyncStorage.removeItem("ACCESS_TOKEN");
  }
}

export default new AccessToken()

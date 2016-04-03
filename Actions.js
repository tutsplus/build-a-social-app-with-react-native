import Reflux from 'reflux';

import AccessToken from 'Social/AccessToken';

let actions = Reflux.createActions([
  "auth",
  "unauth",
  { login: { asyncResult: true } },
  "logout",
  { signup: { asyncResult: true } },
  { loadUser: { asyncResult: true } }
]);

actions.auth.listen(function () {
  AccessToken.get()
    .then((token) => actions.login(token))
    .catch((err) => actions.logout());
});

actions.unauth.listen(function () {
  AccessToken.clear();
});

export default actions;

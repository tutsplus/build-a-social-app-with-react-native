'use strict';
import Home from 'Social/Screens/Home';
import Login from 'Social/Screens/Login';
import LogoutButton from 'Social/Views/LogoutButton';
import PostButton from 'Social/Views/PostButton';

class Routes {
  get(route, args) {
    if ("undefined" == typeof this[route]) {
      console.warn("No route found with name: " + route);
      return false;
    } else {
      return this[route].call(this, args);
    }
  }

  home() {
    return {
      name: "home",
      title: "Tuts+ Social",
      component: Home,
      leftButton: LogoutButton,
      rightButton: PostButton,
      hideNavigationBar: false,
      statusBarStyle: "light-content"
    }
  }

  login() {
    return {
      name: "login",
      title: "Login",
      component: Login,
      hideNavigationBar: true,
      statusBarStyle: "light-content"
    }
  }
}

export default new Routes()

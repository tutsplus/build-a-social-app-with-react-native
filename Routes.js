'use strict';
import Home from 'Social/Screens/Home';
import Login from 'Social/Screens/Login';
import Onboarding from 'Social/Screens/Onboarding';
import Contacts from 'Social/Screens/Contacts';
import LogoutButton from 'Social/Views/LogoutButton';
import ContactsButton from 'Social/Views/ContactsButton';
import OnboardingButton from 'Social/Views/OnboardingButton';
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

  onboarding(user) {
    return {
      name: "onboarding",
      title: "Welcome",
      component: Onboarding,
      leftButton: LogoutButton,
      rightButton: OnboardingButton,
      passProps: { user: user },
      hideNavigationBar: false,
      statusBarStyle: "light-content"
    }
  }

  contacts(user) {
    return {
      name: "contacts",
      title: "Add Contacts",
      component: Contacts,
      leftButton: LogoutButton,
      rightButton: ContactsButton,
      passProps: { user: user },
      hideNavigationBar: false,
      statusBarStyle: "light-content"
    }
  }
}

export default new Routes()

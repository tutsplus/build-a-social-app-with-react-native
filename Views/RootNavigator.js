'use strict';
import React, {
  Navigator,
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Routes from 'Social/Routes';
import StyleVars from 'Social/StyleVars';
import SharedStyles from 'Social/SharedStyles';

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    paddingTop: Navigator.NavigationBar.Styles.General.TotalNavHeight
  },
  navBar: {
    backgroundColor: StyleVars.Colors.navBarBackground,
    borderBottomColor: "rgba(255,255,255,0.5)",
    borderBottomWidth: 1
  },
  buttonStyle: { marginTop: 13 },
  titleStyle: { marginTop: 10 }
});

const NavigationBarRouteMapper = {
  LeftButton: function (route, navigator, index, navState) {
    return route.leftButton ? (
      <route.leftButton
        style={styles.buttonStyle}
        navigator={navigator}
        route={route}
      />
    ) : null;
  },
  Title: function (route, navigator, index, navState) {
    return route.title ? (
      <Text
        style={[styles.titleStyle, SharedStyles.navBarTitleText]}
        numberOfLines={1}
      >{route.title}</Text>
    ) : null;
  },
  RightButton: function (route, navigator, index, navState) {
    return route.rightButton ? (
      <route.rightButton
        style={styles.buttonStyle}
        navigator={navigator}
        route={route}
      />
    ) : null;
  }
};

export default class RootNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hideNavigationBar: false };
  }

  componentDidMount() {
    this._setupRoute(this._getInitialRoute());
  }

  componentWillUnmount() {
    if (this._listeners)
      this._listeners.forEach((listener) => listener.remove());
  }

  onNavWillFocus(route) {
    this._setupRoute(route.currentTarget.currentRoute);
  }

  render() {
    let navigationBar = (
      <Navigator.NavigationBar
        routeMapper={NavigationBarRouteMapper}
        style={styles.navBar}
      />
    )

    return (
      <Navigator
        ref={(navigator) => this._setNavigatorRef(navigator)}
        initialRoute={this._getInitialRoute()}
        renderScene={(route, navigator) => this.renderScene(route, navigator)}
        navigationBar={this.state.hideNavigationBar ? null : navigationBar}
      />
    );
  }

  renderScene(route, navigator) {
    let style = route.hideNavigationBar ? { paddingTop: 0 } : {};
    return (
      <View style={[styles.sceneContainer, style]}>
        <route.component
          {...route.passProps}
          navigator={navigator}
          back={() => this.back()}
          backToHome={() => this.backToHome()}
          toRoute={(route, args) => this.toRoute(route, args)}
          replaceRoute={(route, args) => this.replaceRoute(route, args)}
        />
      </View>
    )
  }

  back() {
    this.navigator.pop();
  }

  backToHome() {
    this.navigator.popToTop();
  }

  toRoute(route, args) {
    if ("string" != typeof route || (route = Routes.get(route, args))) {
      this.navigator.push(route);
    }
  }

  replaceRoute(route, args) {
    if ("string" != typeof route || (route = Routes.get(route, args))) {
      this.navigator.replace(route);
    }
  }

  _getInitialRoute() {
    return Routes.home();
  }

  _setNavigatorRef(navigator) {
    if (navigator !== this.navigator) {
      this.navigator = navigator;

      if (navigator) {
        this._listeners = [
          navigator.navigationContext.addListener("willfocus", this.onNavWillFocus.bind(this))
        ];
      } else {
        if (this._listeners)
          this._listeners.forEach((listener) => listener.remove());
      }
    }
  }

  _setupRoute(route) {
    if (route) {
      let state = {};

      if (route.hideNavigationBar !== undefined && this.state.hideNavigationBar !== route.hideNavigationBar)
        state.hideNavigationBar = route.hideNavigationBar;

      if (route.statusBarStyle && this.state.statusBarStyle !== route.statusBarStyle) {
        state.statusBarStyle = route.statusBarStyle;
        StatusBar.setBarStyle(route.statusBarStyle, true);
        StatusBar.setHidden(false, "slide");
      }

      this.setState(state);
    }
  }
}

'use strict';
import React, {
  StyleSheet,
  PropTypes,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import StyleVars from 'Social/StyleVars';

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 15,
    overflow: "hidden",
    backgroundColor: StyleVars.Colors.primary
  },
  buttonText: {
    color: "white",
    fontFamily: StyleVars.Fonts.general,
    fontSize: 14,
    fontWeight: "400"
  }
});

class Button extends React.Component {
  render() {
    let textStyle = [styles.buttonText, this.props.textStyle];

    return (
      <TouchableOpacity
        activeOpacity={this.props.activeOpacity}
        onPress={() => this.onPress()}
        style={[styles.button, this.props.style]}
      >
        <Text style={textStyle}>{this.props.children}</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    if (this.props.enabled) {
      this.props.onPress();
    }
  }
}

Button.propTypes = {
  onPress: PropTypes.func,
  style: View.propTypes.style,
  textStyle: Text.propTypes.style,
  activeOpacity: PropTypes.number,
  enabled: PropTypes.bool,
  children: PropTypes.string
};

Button.defaultProps = {
  onPress: () => {},
  style: {},
  textStyle: {},
  activeOpacity: 0.8,
  enabled: true
};

export default Button;

'use strict';
import React, {
  Text,
  TouchableOpacity
} from 'react-native';

import Actions from 'Social/Actions';

export default class OnboardingButton extends React.Component {
  render() {
    let style = { marginRight: 10, color: "white" };

    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
        onPress={() => this.onPress()}
      >
        <Text style={style}>Continue</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    Actions.onboard.started();
  }
}

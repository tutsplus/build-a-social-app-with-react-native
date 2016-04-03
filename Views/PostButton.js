'use strict';
import React, {
  NativeModules,
  Text,
  TouchableOpacity
} from 'react-native';

import Actions from 'Social/Actions';

export default class LogoutButton extends React.Component {
  render() {
    let style = { marginRight: 10, color: "white" };

    return (
      <TouchableOpacity
        style={this.props.style}
        activeOpacity={0.5}
        onPress={() => this.onPress()}
      >
        <Text style={style}>Post</Text>
      </TouchableOpacity>
    );
  }

  onPress() {
    NativeModules.ImagePickerManager.showImagePicker({
      title: "Post Picture"
    }, (picture) => {
      if (picture.data) {
        navigator.geolocation.getCurrentPosition((position) => {
          Actions.uploadPost('data:image/jpeg;base64,' + picture.data, position);
        }, (error) => {
          Actions.uploadPost('data:image/jpeg;base64,' + picture.data, null);
        });
      }
    });
  }
}

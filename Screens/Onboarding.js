'use strict';
import React, {
  Dimensions,
  Image,
  NativeModules,
  PropTypes,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import Actions from 'Social/Actions';
import Routes from 'Social/Routes';
import StyleVars from 'Social/StyleVars';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  inputContainer: {
    width: Dimensions.get("window").width - 5,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "white",
    color: StyleVars.Colors.primary,
    fontFamily: StyleVars.Fonts.general,
    fontSize: 16,
    padding: 5
  },
  profilePictureContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: StyleVars.Colors.mediumBackground
  }
});

class Onboarding extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      profilePicture: this.props.user.profilePicture
    }
  }

  componentWillMount() {
    Actions.onboard.started.listen(this.onOnboardStarted.bind(this));
    Actions.onboard.completed.listen(this.onOnboardCompleted.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          keyboardShouldPersistTaps={false}
          automaticallyAdjustContentInsets={false}
        >
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.profilePictureContainer}
              onPress={() => this.onPressProfilePicture()}
            >
              <Image
                source={this.state.profilePicture}
                style={styles.profilePicture}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={this.state.name}
              placeholder="Full Name"
              autoFocus={true}
              onChangeText={(name) => this.setState({ name: name })}
              autoCapitalize="words"
              returnKeyType="done"
            />
          </View>
        </ScrollView>
      </View>
    );
  }

  onPressProfilePicture() {
    NativeModules.ImagePickerManager.showImagePicker({
      title: "Set Profile Picture"
    }, (picture) => {
      if (picture.data) {
        this.setState({
          profilePicture: {
            uri: 'data:image/jpeg;base64,' + picture.data, isStatic: true
          }
        });
      }
    });
  }

  onOnboardStarted() {
    Actions.onboard({
      onboarded: true,
      name: this.state.name,
      profilePicture: this.state.profilePicture
    });
  }

  onOnboardCompleted() {
    this.props.replaceRoute(Routes.contacts(this.props.user));
  }
}

export default Onboarding;

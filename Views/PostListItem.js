import React, {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import RNGeocoder from 'react-native-geocoder';

import StyleVars from 'Social/StyleVars';

let imageWidth = Dimensions.get('window').width - 20;

const styles = StyleSheet.create({
  postContainer: {
    paddingVertical: 10,
    backgroundColor: StyleVars.Colors.lightBackground,
    borderBottomColor: StyleVars.Colors.darkBackground,
    borderBottomWidth: 1
  },

  postPicture: {
    flex: 1,
    width: imageWidth,
    height: imageWidth * 2/3,
    borderRadius: 10,
    marginHorizontal: 10
  },

  userName: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: StyleVars.Fonts.general,
    color: StyleVars.Colors.primary,
    marginHorizontal: 10,
    marginBottom: 5
  }
});

export default class PostListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { geolocation: null };
  }

  componentDidMount() {
    if (this.props.post.position) {
      let position = JSON.parse(this.props.post.position);
      RNGeocoder.reverseGeocodeLocation(position.coords, (err, data) => {
        if (err) { return; }
        this.setState({ geolocation: data[0] });
      });
    }
  }

  render() {
    let geolocation = this.state.geolocation ? <Text>{this.state.geolocation.locality}, {this.state.geolocation.country}</Text> : null;

    return (
      <View style={styles.postContainer}>
        <Text style={styles.userName}>{this.props.post.user}</Text>
        <Image
          source={{uri: this.props.post.picture, isStatic: true}}
          style={styles.postPicture}
          resizeMode="cover"
        />
        {geolocation}
      </View>
    );
  }
}

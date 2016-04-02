import { StyleSheet } from 'react-native';
import StyleVars from 'Social/StyleVars';

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: StyleVars.Colors.mediumBackground
  },
  headingText: {
    color: StyleVars.Colors.primaryText,
    fontFamily: StyleVars.Fonts.heading,
    fontSize: 16,
    fontWeight: "600"
  },
  text: {
    color: StyleVars.Colors.primaryText,
    fontFamily: StyleVars.Fonts.general,
    fontSize: 12,
    fontWeight: "400"
  },
  navBarTitleText: {
    color: StyleVars.Colors.navBarTitle,
    fontFamily: StyleVars.Fonts.heading,
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 22
  }
});

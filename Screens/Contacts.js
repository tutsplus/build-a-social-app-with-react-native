'use strict';
import React, {
  Dimensions,
  ListView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import AddressBook from 'react-native-addressbook';

import Actions from 'Social/Actions';
import Routes from 'Social/Routes';
import StyleVars from 'Social/StyleVars';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  contactRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: Dimensions.get("window").width,
    padding: 5
  },
  selectedRowIndicatorContainer: {
    marginRight: 10,
  },
  indicator: {
    backgroundColor: StyleVars.Colors.secondary,
    width: 12,
    height: 12,
    borderRadius: 6
  },
  separator: {
    height: 1,
    width: Dimensions.get("window").width,
    backgroundColor: StyleVars.Colors.mediumBackground
  },
  contactName: {
    fontWeight: "600",
    fontSize: 16,
    color: StyleVars.Colors.primary
  },
  contactEmail: {
    color: StyleVars.Colors.darkBackground
  }
});

export default class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noPermission: false,
      selectedRows: {},
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    }
  }

  componentWillMount() {
    Actions.addContacts.started.listen(this.onAddContactsStarted.bind(this));
  }

  componentDidMount() {
    let permissionCallback = (err, permission) => {
      if (permission === AddressBook.PERMISSION_DENIED) {
        this.setState({ noPermission: true });
      } else {
        AddressBook.getContacts((err, contacts) => {
          let filtered = contacts.filter((c) => c.emailAddresses.length > 0);
          this.setState({
            dataSource: this.state.dataSource.cloneWithRows(filtered)
          });
        });
      }
    }

    AddressBook.checkPermission((err, permission) => {
      if (permission === AddressBook.PERMISSION_UNDEFINED) {
        AddressBook.requestPermission(permissionCallback);
      } else {
        permissionCallback(err, permission);
      }
    });
  }

  render() {
    if (this.state.noPermission) {
      return (
        <View style={styles.container}>
          <Text> You didn't give permission to access the contacts.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            renderSeparator={() => <View style={styles.separator} />}
            renderRow={(row, _, rowId) => this.renderRow(row, rowId)}
          />
        </View>
      );
    }
  }

  renderRow(row, rowId) {
    return (
      <TouchableOpacity
        style={styles.contactRow}
        onPress={() => {
          let rows = this.state.selectedRows;
          rows[rowId] = !rows[rowId];
          this.setState({ selectedRows: rows });
        }}
      >
        <View>
          <Text style={styles.contactName}>
            {row.firstName} {row.lastName}
          </Text>
          <Text style={styles.contactEmail}>
            {row.emailAddresses[0].email}
          </Text>
        </View>
        <View style={styles.selectedRowIndicatorContainer}>
          {this.state.selectedRows[rowId] ? <View style={styles.indicator} /> : null}
        </View>
      </TouchableOpacity>
    );
  }

  onAddContactsStarted() {
    this.props.replaceRoute(Routes.home());
  }
}

import React, {
  ListView,
  RefreshControl
} from 'react-native';

import Actions from 'Social/Actions';
import DataStore from 'Social/DataStore';
import PostListItem from 'Social/Views/PostListItem';
import StyleVars from 'Social/StyleVars';

export default class PostListView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      refreshing: false
    };
  }

  componentDidMount() {
    this.stopPostListener = DataStore.listen(this.onListChange.bind(this));
    Actions.loadPosts();
  }

  componentWillUnmount() {
    this.stopPostListener();
  }

  onListChange(items) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(items),
      refreshing: false,
    });
  }

  render() {
    return (
      <ListView
        style={{ backgroundColor: StyleVars.Colors.lightBackground }}
        dataSource={this.state.dataSource}
        renderRow={(row) => <PostListItem post={row} />}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
            tintColor={StyleVars.Colors.darkBackground}
            colors={StyleVars.Colors.darkBackground}
          />
        }
      />
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    Actions.loadPosts();
  }
}

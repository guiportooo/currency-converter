import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, StatusBar } from 'react-native';
import { ListItem, Separator } from '../components/Lists';
import currencies from '../data/currencies';

const TEMP_CURRENT_CURRENCY = 'CAD';

class CurrencyList extends Component {
    handlePress = () => {
      this.props.navigation.goBack(null);
    };

    render() {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="default" translucent={false} />
          <FlatList
            data={currencies}
            renderItem={({ item }) =>
            (<ListItem
              text={item}
              selected={item === TEMP_CURRENT_CURRENCY}
              onPress={this.handlePress}
            />)}
            keyExtractor={(item, index) => `${index}`}
            ItemSeparatorComponent={Separator}
          />
        </View>
      );
    }
}

CurrencyList.propTypes = {
  navigation: PropTypes.object,
};

export default CurrencyList;

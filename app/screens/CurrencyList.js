import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FlatList, View, StatusBar } from 'react-native';
import { ListItem, Separator } from '../components/Lists';
import currencies from '../data/currencies';
import { changeBaseCurrency, changeQuoteCurrency } from '../actions/currencies';

class CurrencyList extends Component {
    handlePress = (currency) => {
      const { type } = this.props.navigation.state.params;

      if (type === 'base') {
        this.props.dispatch(changeBaseCurrency(currency));
      } else if (type === 'quote') {
        this.props.dispatch(changeQuoteCurrency(currency));
      }
      this.props.navigation.goBack(null);
    };

    render() {
      const comparisonCurrency = this.props.navigation.state.params.type === 'base'
        ? this.props.baseCurrency
        : this.props.quoteCurrency;

      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="default" translucent={false} />
          <FlatList
            data={currencies}
            renderItem={({ item }) =>
            (<ListItem
              text={item}
              selected={item === comparisonCurrency}
              onPress={() => this.handlePress(item)}
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
  dispatch: PropTypes.func,
  baseCurrency: PropTypes.string,
  quoteCurrency: PropTypes.string,
};

const mapStateToProps = (state) => {
  const { baseCurrency, quoteCurrency } = state.currencies;

  return {
    baseCurrency,
    quoteCurrency,
  };
};

export default connect(mapStateToProps)(CurrencyList);

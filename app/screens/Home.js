import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import { Container } from '../components/Container';
import { Logo } from '../components/Logo';
import { InputWithButton } from '../components/TextInputs';
import { ClearButton } from '../components/Buttons';
import { LastConverted } from '../components/Texts';
import { Header } from '../components/Header';
import { swapCurrency, changeCurrencyAmount } from '../actions/currencies';

class Home extends Component {
  handlePressBaseCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Base Currency', type: 'base' });
  }

  handlePressQuoteCurrency = () => {
    this.props.navigation.navigate('CurrencyList', { title: 'Quote Currency', type: 'quote' });
  }

  handleTextChange = (amount) => {
    this.props.dispatch(changeCurrencyAmount(amount));
  }

  handleSwapCurrencies = () => {
    this.props.dispatch(swapCurrency());
  }

  handleOptionsPress = () => {
    this.props.navigation.navigate('Options');
  }

  render() {
    const quotePrice = this.props.isFetching
      ? '...'
      : (this.props.amount * this.props.conversionRate).toFixed(2);

    return (
      <Container backgroundColor={this.props.primaryColor}>
        <StatusBar translucent={false} barStyle="light-content" />
        <Header onPress={this.handleOptionsPress} />
        <KeyboardAvoidingView behavior="padding">
          <Logo tintColor={this.props.primaryColor} />
          <InputWithButton
            buttonText={this.props.baseCurrency}
            onPress={this.handlePressBaseCurrency}
            defaultValue={this.props.amount.toString()}
            keyboardType="numeric"
            onChangeText={this.handleTextChange}
            textColor={this.props.primaryColor}
          />
          <InputWithButton
            buttonText={this.props.quoteCurrency}
            onPress={this.handlePressQuoteCurrency}
            editable={false}
            defaultValue={quotePrice}
            textColor={this.props.primaryColor}
          />
          <LastConverted
            base={this.props.baseCurrency}
            quote={this.props.quoteCurrency}
            rate={this.props.conversionRate}
            date={this.props.lastConvertedDate}
          />
          <ClearButton text="Reverse currencies" onPress={this.handleSwapCurrencies} />
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
  baseCurrency: PropTypes.string,
  quoteCurrency: PropTypes.string,
  amount: PropTypes.number,
  conversionRate: PropTypes.number,
  isFetching: PropTypes.bool,
  lastConvertedDate: PropTypes.object,
  primaryColor: PropTypes.string,
};

const mapStateToProps = (state) => {
  const {
    currencies: { baseCurrency, quoteCurrency, amount },
    themes: { primaryColor },
  } = state;

  const conversionSelector = state.currencies.conversions[baseCurrency] || {};

  const { rates, isFetching } = conversionSelector || {};

  const conversionRate = rates
    ? (rates[quoteCurrency] || 0)
    : 0;

  const lastConvertedDate = conversionSelector.date
    ? moment(conversionSelector.date)
    : moment();

  return {
    baseCurrency,
    quoteCurrency,
    amount,
    conversionRate,
    isFetching,
    lastConvertedDate,
    primaryColor,
  };
};

export default connect(mapStateToProps)(Home);

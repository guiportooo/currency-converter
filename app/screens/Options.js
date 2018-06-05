import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, Separator } from '../components/Lists';

const ICON_PREFIX = Platform.OS === 'ios' ? 'ios' : 'md';
const ICON_COLOR = '#868686';
const ICON_SIZE = 23;

class Options extends Component {
    handleThemesPress = () => {
      this.props.navigation.navigate('Themes');
    }

    handleFixerPress = () => {
      console.log('press fixer');
    }

    render() {
      return (
        <ScrollView>
          <StatusBar translucent={false} barStyle="default" />
          <ListItem
            text="Themes"
            onPress={this.handleThemesPress}
            customIcon={<Ionicons name={`${ICON_PREFIX}-arrow-forward`} color={ICON_COLOR} size={ICON_SIZE} />}
          />
          <Separator />
          <ListItem
            text="Fixer.io"
            onPress={this.handleFixerPress}
            customIcon={<Ionicons name={`${ICON_PREFIX}-link`} color={ICON_COLOR} size={ICON_SIZE} />}
          />
          <Separator />
        </ScrollView>
      );
    }
}

Options.propTypes = {
  navigation: PropTypes.object,
};

export default Options;

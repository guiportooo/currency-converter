import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import moment from 'moment';
import styles from './styles';

const LastConverted = ({
  date,
  base,
  quote,
  rate,
}) => (
  <Text style={styles.smallText}>
        1 {base} = {rate} {quote} as of {moment(date).format('MMMM D, YYYY')}
  </Text>
);

LastConverted.propTypes = {
  base: PropTypes.string,
  quote: PropTypes.string,
  rate: PropTypes.number,
  date: PropTypes.object,
};

export default LastConverted;


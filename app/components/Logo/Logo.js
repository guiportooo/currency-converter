import React, { Component } from 'react';
import { View, ImageBackground, Text, Keyboard, Animated, Platform } from 'react-native';
import styles from './styles';

const ANIMATION_DURATION = 250;

class Logo extends Component {
  constructor(props) {
    super(props);

    this.containerImageSize = new Animated.Value(styles.$largeContainerImageSize);
    this.logoSize = new Animated.Value(styles.$largeLogoSize);
  }

  componentDidMount() {
    const eventName = Platform.OS === 'ios' ? 'Will' : 'Did';
    const keyboardShowListener = `keyboard${eventName}Show`;
    const keyboardHideListener = `keyboard${eventName}Hide`;

    this.keyboardShowListener = Keyboard.addListener(keyboardShowListener, this.keyboardShow);
    this.keyboardHideListener = Keyboard.addListener(keyboardHideListener, this.keyboardHide);
  }

  componentWillUnmount() {
    this.keyboardShowListener.remove();
    this.keyboardHideListener.remove();
  }

  keyboardShow = () => {
    this.startAnimations([
      this.createAnimation(this.containerImageSize, styles.$smallContainerImageSize),
      this.createAnimation(this.logoSize, styles.$smallLogoSize),
    ]);
  };

  keyboardHide = () => {
    this.startAnimations([
      this.createAnimation(this.containerImageSize, styles.$largeContainerImageSize),
      this.createAnimation(this.logoSize, styles.$largeLogoSize),
    ]);
  };

  createAnimation = (forValue, toValue) => Animated.timing(forValue, {
    toValue,
    duration: ANIMATION_DURATION,
  })

  startAnimations = animations => Animated.parallel(animations).start();

  render() {
    const containerBackgroundStyle = [
      styles.containerBackground,
      { width: this.containerImageSize, height: this.containerImageSize },
    ];

    const imageStyle = [
      styles.image,
      { width: this.logoSize },
    ];

    return (
      <View style={styles.container}>
        <Animated.View
          style={containerBackgroundStyle}
        >
          <ImageBackground
            style={styles.backgroundImage}
            imageStyle={styles.containerImage}
            source={require('./images/background.png')}
          >
            <Animated.Image style={imageStyle} source={require('./images/logo.png')} />
          </ImageBackground>
        </Animated.View>
        <Text style={styles.text}>Currency Converter</Text>
      </View>
    );
  }
}

export default Logo;


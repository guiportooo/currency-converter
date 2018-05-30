import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width / 2;

export default EStyleSheet.create({
  $largeContainerImageSize: imageWidth,
  $largeLogoSize: imageWidth / 2,
  $smallContainerImageSize: imageWidth / 2,
  $smallLogoSize: imageWidth / 4,
  container: {
    alignItems: 'center',
  },
  containerBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '$largeContainerImageSize',
    height: '$largeContainerImageSize',
  },
  backgroundImage: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  containerImage: {
    resizeMode: 'contain',
  },
  image: {
    width: '$largeLogoSize',
    resizeMode: 'contain',
  },
  text: {
    fontWeight: '600',
    fontSize: 28,
    letterSpacing: -0.5,
    marginTop: 15,
    color: '$white',
  },
});

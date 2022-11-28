import {StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    flex: 0.1,
    left: 0,
    right: 0,
    bottom: 40,
    justifyContent: 'center',
    height: hp(10),
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    opacity: 0.95,
    width: '80%',
    backgroundColor: 'white',
    height: hp(8),
    borderRadius: 30,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

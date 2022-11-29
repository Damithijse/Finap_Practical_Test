import {StyleSheet, StatusBar} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

module.exports = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#fff',
    flex: 1,
    width: wp('100'),
    height: hp('100'),
    paddingTop: hp('6'),
  },

});

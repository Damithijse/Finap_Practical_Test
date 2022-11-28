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
  headContainer: {
    flex: 1,
    alignItems: 'center',
  },
  Container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginView: {
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('10'),
  },
  inputIcon: {
    width: 35,
    height: 35,
  },
  loginTxt: {
    paddingBottom: 10,
    fontSize: 25,
    color: '#002b77',
    fontWeight: 'bold',
  },
  signUpTxt: {
    color: '#FF3A44',
    fontWeight: 'bold',
  },
  inputIconView: {
    backgroundColor: 'white',
    height: '100%',
    borderRadius: 8,
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  showIcon: {
    width: 30,
    height: 30,
  },
  buttonTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  logo: {
    width: 250,
    height: 250,
  },
  newsImg: {
    width: wp(100),
    height: hp(50),
  },
  profilePic: {
    width: 150,
    height: 150,
  },
  logoSmall: {
    width: wp(50),
    height: wp(50),
  },
  signLogoSmall: {
    width: wp(30),
    height: wp(30),
  },
  TextViewInput: {
    flexDirection: 'row',
    width: '100%',
    height: hp(7.5),
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 10,
    backgroundColor: '#FF3A44',
    marginTop: 20,
  },
  textInputSecond2: {
    width: '85%',
    // marginLeft: '3%',
    color: 'black',
    height: 55,
  },
  textInputSecond: {
    width: '70%',
    // marginLeft: '3%',
    color: 'black',
    height: 55,
  },
  backGroundImg: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('55'),
    backgroundColor: 'white',
  },
  titleTxt: {
    marginLeft: '5%',
    marginTop: '5%',
  },
  mainView: {
    position: 'absolute',
    marginTop: hp(30),
    width: '85%',
    borderRadius: 40,
    opacity: 0.99,
    height: hp('20'),
    backgroundColor: '#DDDCDF',
  },
  dateTxt: {
    marginLeft: '5%',
    marginTop: '5%',
    color: 'black',
    fontSize: hp(1.5),
  },
  desTxt: {
    marginLeft: '5%',
    fontSize: hp(2),
    fontWeight: 'bold',
    marginTop: '5%',
    color: 'black',
  },
});

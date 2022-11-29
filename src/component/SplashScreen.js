import React, {useEffect} from 'react';
import {View, Image, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getTopHedlines} from '../actions/HomePageActions';
import Style from '../styles/LoginScreenStyle';
import logo from '../assets/logo.png';
let value;
const LoadingScreen = props => {
  const navigation = useNavigation();
  useEffect(() => {
    props.getTopHedlines(1);
    navigate();
  });
  const navigate = async () => {
    try {
      value = await AsyncStorage.getItem('response');
    } catch (e) {
      //console.log('Something went wrong', e);
    }
    setTimeout(() => {
      if (value === 'LOG') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Login');
      }
    }, 2000);
  };
  return (
    <View style={Style.mainContainer}>
      <View style={Style.Container}>
        <Image source={logo} style={Style.logo} />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loadingIndicate: state.loading.loadingIndicate,
  };
};

export default connect(mapStateToProps, {
  getTopHedlines,
})(LoadingScreen);

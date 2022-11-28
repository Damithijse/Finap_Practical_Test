import React, {useEffect} from 'react';
import {View, Image, AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getTopHedlines} from '../actions/HomePageActions';
import Style from '../styles/LoginScreenStyle';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfilePage';
import FooterCom from './common/Footer';
import logo from '../assets/logo.png';
let value;
const MainScreen = props => {
  const navigation = useNavigation();
  useEffect(() => {});

  return (
    <View style={{flex: 1}}>
      {props.currentScreen === 'HOME' ? <HomeScreen /> : <ProfileScreen />}
      <FooterCom />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loadingIndicate: state.loading.loadingIndicate,
    currentScreen: state.loading.currentScreen,
  };
};

export default connect(mapStateToProps, {
  getTopHedlines,
})(MainScreen);

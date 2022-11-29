import React, {useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {getTopHedlines} from '../actions/HomePageActions';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfilePage';
import FooterCom from './common/Footer';
const MainScreen = props => {
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

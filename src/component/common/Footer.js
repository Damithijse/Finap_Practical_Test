import React, {useEffect} from 'react';
import {AsyncStorage, Image, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {changeComponent} from '../../actions/HomePageActions';
import {useNavigation} from '@react-navigation/native';
import logo from '../../assets/logo.png';
import Styles from '../../styles/FooterStyles';

const home = require('../../assets/home.png');
const profile = require('../../assets/profile.png');
const home_selected = require('../../assets/home_selected.png');
const profile_selected = require('../../assets/profile_selected.png');

const FooterScreen = props => {
  const navigation = useNavigation();
  useEffect(() => {});

  return (
    <View style={Styles.mainContainer}>
      <View style={Styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.changeComponent('HOME');
          }}
          style={Styles.button}>
          <Image
            source={props.currentScreen === 'HOME' ? home_selected : home}
            style={Styles.icon}
          />
        </TouchableOpacity>
        <View style={Styles.button}>
          <Image source={logo} style={Styles.logo} />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.changeComponent('PROFILE');
          }}
          style={Styles.button}>
          <Image
            source={
              props.currentScreen === 'PROFILE' ? profile_selected : profile
            }
            style={Styles.icon}
          />
        </TouchableOpacity>
      </View>
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
  changeComponent,
})(FooterScreen);

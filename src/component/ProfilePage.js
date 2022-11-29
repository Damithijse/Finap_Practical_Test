import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  AsyncStorage,
  Text,
  TextInput,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {updateAnNewAccount, updateUser} from '../actions/LoginScreenAction';
import {changeComponent} from '../actions/HomePageActions';
import Style from '../styles/LoginScreenStyle';
import pro from '../assets/profile_selected.png';
import userImg from '../assets/icons8-male-user-52.png';

import emailImg from '../assets/icons8-circled-envelope-100.png';
import {showMessage} from 'react-native-flash-message';
let value;
let user;
let loginData;

const ProfileScreen = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  useEffect(() => {
    getDetails();
  });
  const getDetails = async () => {
    value = await AsyncStorage.getItem('response');
    user = await AsyncStorage.getItem('loginData');
    loginData = JSON.parse(user);
    setEmail(loginData.email);
    setName(loginData.firstName);
  };
  const logOut = async () => {
    try {
      await AsyncStorage.setItem('response', 'LOGOUT');
      navigation.navigate('Login');
      props.changeComponent('HOME');
    } catch (e) {
      showMessage({
        message: 'Something went wrong!',
        type: 'danger',
      });
    }
  };
  // ------------------ BackHandler-------------------------------------
  useEffect(() => {
    const backAction = () => {
      props.changeComponent('HOME');
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={Style.mainContainer}>
      <View
        style={{
          width: '100%',
          height: '40%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={pro} style={Style.profilePic} />
        <Text style={{color: 'black', fontSize: 22, fontWeight: 'bold'}}>
          Profile
        </Text>
      </View>

      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={{width: '80%'}}>
          {/*-------------------------- Name input -------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={userImg} style={Style.inputIcon} />
            </View>
            <TextInput
              value={name}
              placeholderTextColor="#002b77"
              fontSize={13}
              style={Style.textInputSecond2}
              allowFontScaling={false}
              onChangeText={text => {}}
            />
          </View>
          {/*-------------------------- Email input -------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={emailImg} style={Style.inputIcon} />
            </View>
            <TextInput
              value={email}
              placeholderTextColor="#002b77"
              fontSize={13}
              editable={false}
              style={Style.textInputSecond2}
              allowFontScaling={false}
              onChangeText={text => {}}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              logOut();
            }}
            style={[Style.button, {backgroundColor: 'gray'}]}>
            <Text style={Style.buttonTxt}>Log Out</Text>
          </TouchableOpacity>
        </View>
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
  updateAnNewAccount,
  updateUser,
  changeComponent,
})(ProfileScreen);

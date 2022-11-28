import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Style from '../styles/LoginScreenStyle';
import logo from '../assets/logo.png';
import email from '../assets/icons8-circled-envelope-100.png';
import password from '../assets/icons8-secure-100.png';
import show from '../assets/icons8-eye-96.png';
import close from '../assets/icons8-closed-eyes-96.png';
import {showMessage} from 'react-native-flash-message';
let value;
let user;
let loginData;
const LoginScreen = props => {
  const navigation = useNavigation();
  useEffect(() => {
    getDetails();
  });
  const [inputEmail, setEmail] = useState('');
  const [inputPassword, setPassword] = useState('');
  const [passwordShow, setPasswordShow] = useState(true);
  // -------------------------- get user details----------------------------------
  const getDetails = async () => {
    value = await AsyncStorage.getItem('response');
    user = await AsyncStorage.getItem('loginData');
    loginData = JSON.parse(user);
    console.log(value, user, 'aa');
  };
  // -------------------------- setup Login Process ----------------------------------
  const setupLogin = async () => {
    console.log('working');
    if (user !== null) {
      if (inputEmail !== '') {
        if (inputPassword !== '') {
          if (
            inputEmail.toString().toLowerCase() ===
              loginData.email.toString().toLowerCase() &&
            inputPassword === loginData.password
          ) {
            try {
              await AsyncStorage.setItem('response', 'LOG');
              navigation.navigate('Home');
            } catch (e) {
              showMessage({
                message: 'Something Went wrong!',
                type: 'danger',
              });
            }
          } else {
            showMessage({
              message: 'Invalid Login Credentials.',
              type: 'danger',
            });
          }
        } else {
          showMessage({
            message: 'Invalid Password',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Invalid Email',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Invalid Login Credentials.',
        type: 'danger',
      });
    }
  };
  return (
    <View style={Style.mainContainer}>
      <View style={Style.headContainer}>
        <Image source={logo} style={Style.logoSmall} />
        <View style={Style.loginView}>
          <Text style={Style.loginTxt}>Login</Text>
          <Text>Please Login or Sign up to continue</Text>
        </View>
        <View style={{width: '80%'}}>
          {/*---------------------------------- Email input ------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={email} style={Style.inputIcon} />
            </View>
            <TextInput
              placeholder={'Enter your Email'}
              placeholderTextColor="#002b77"
              fontSize={13}
              keyboardType={'email-address'}
              style={Style.textInputSecond2}
              allowFontScaling={false}
              onChangeText={text => {
                setEmail(text);
              }}
            />
          </View>
          {/*---------------------------------- password input ------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={password} style={Style.inputIcon} />
            </View>
            <TextInput
              placeholder={'Enter your Password'}
              placeholderTextColor="#002b77"
              fontSize={13}
              secureTextEntry={passwordShow}
              style={Style.textInputSecond}
              allowFontScaling={false}
              onChangeText={text => {
                setPassword(text);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setPasswordShow(!passwordShow);
              }}
              style={Style.inputIconView}>
              {passwordShow === true ? (
                <Image source={show} style={Style.showIcon} />
              ) : (
                <Image source={close} style={Style.showIcon} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setupLogin();
            }}
            style={Style.button}>
            <Text style={Style.buttonTxt}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <Text>
            I'm a new User.{' '}
            <Text
              onPress={() => {
                navigation.navigate('SignUp');
              }}
              style={Style.signUpTxt}>
              Sign Up
            </Text>
          </Text>
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

export default connect(mapStateToProps, {})(LoginScreen);

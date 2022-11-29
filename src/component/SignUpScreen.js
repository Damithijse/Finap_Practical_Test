import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {createAnNewAccount} from '../actions/LoginScreenAction';
import Style from '../styles/LoginScreenStyle';

import logo from '../assets/logo.png';
import user from '../assets/icons8-male-user-52.png';
import emailImg from '../assets/icons8-circled-envelope-100.png';
import passwordImg from '../assets/icons8-secure-100.png';
import show from '../assets/icons8-eye-96.png';
import close from '../assets/icons8-closed-eyes-96.png';

const SignUpScreen = props => {
  const navigation = useNavigation();
  const [passwordShow, setPasswordShow] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [validEmial, setValidEmial] = useState(false);
  const [password, setPassword] = useState('');
  const [isMatchpassword, setIsMatchPassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('');
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(true);

  // ------------------------ password & confirm password check process ----------
  const checkPassword = () => {
    if (password !== '' && password === confirmpassword) {
      setIsMatchPassword(true);
      //console.log('Password Matching');
    } else {
      setIsMatchPassword(false);
      showMessage({
        message: 'Password do-not match. Please re-enter',
        type: 'danger',
      });
    }
  };
  // ------------------------------BackHandler-----------------------------
  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  // --------------------------------- email validation process---------------------
  const validate = text => {
    //console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(text) === false) {
      return false;
    } else {
      setValidEmial(true);
      setEmail(text);
    }
  };
  // --------------------------------- create an Account process ---------------------
  const createAnAccount = () => {
    if (firstName !== '') {
      if (email !== '') {
        if (validEmial === true) {
          if (password !== '') {
            if (isMatchpassword === true) {
              props.createAnNewAccount(firstName, email, password, navigation);
            } else {
              showMessage({
                message: 'Password do-not match. Please re-enter',
                type: 'danger',
              });
            }
          } else {
            showMessage({
              message: 'Please enter a Password',
              type: 'danger',
            });
          }
        } else {
          showMessage({
            message: 'Please enter a valid Email',
            type: 'danger',
          });
        }
      } else {
        showMessage({
          message: 'Please enter a valid Email',
          type: 'danger',
        });
      }
    } else {
      showMessage({
        message: 'Please enter your Name',
        type: 'danger',
      });
    }
  };

  return (
    <View style={Style.mainContainer}>
      <View style={Style.headContainer}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Image source={logo} style={Style.signLogoSmall} />
          <View style={Style.loginView}>
            <Text style={Style.loginTxt}>Sign up</Text>
            <Text>Please fill this form to create an account</Text>
          </View>
        </View>

        {/*---------------------------------- Name input ------------------------------------------*/}
        <View style={{width: '80%'}}>
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={user} style={Style.inputIcon} />
            </View>
            <TextInput
              placeholder={'Enter your Name'}
              placeholderTextColor="#002b77"
              fontSize={13}
              style={Style.textInputSecond2}
              allowFontScaling={false}
              onChangeText={text => {
                setFirstName(text);
              }}
            />
          </View>
          {/*---------------------------------- Email input ------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={emailImg} style={Style.inputIcon} />
            </View>
            <TextInput
              placeholder={'Enter your Email'}
              placeholderTextColor="#002b77"
              keyboardType={'email-address'}
              fontSize={13}
              style={Style.textInputSecond2}
              allowFontScaling={false}
              onChangeText={text => {
                validate(text);
              }}
            />
          </View>
          {/*---------------------------------- password input ------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={passwordImg} style={Style.inputIcon} />
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
          {/*---------------------------------- confirm password input ------------------------------------------*/}
          <View style={Style.TextViewInput}>
            <View style={Style.inputIconView}>
              <Image source={passwordImg} style={Style.inputIcon} />
            </View>
            <TextInput
              placeholder={'Confirm your Password'}
              placeholderTextColor="#002b77"
              fontSize={13}
              secureTextEntry={confirmPasswordShow}
              style={Style.textInputSecond}
              allowFontScaling={false}
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              onSubmitEditing={() => {
                checkPassword();
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setConfirmPasswordShow(!confirmPasswordShow);
              }}
              style={Style.inputIconView}>
              {confirmPasswordShow === true ? (
                <Image source={show} style={Style.showIcon} />
              ) : (
                <Image source={close} style={Style.showIcon} />
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              createAnAccount();
            }}
            style={Style.button}>
            <Text style={Style.buttonTxt}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <Text>
            Already have an account?.{' '}
            <Text
              onPress={() => {
                navigation.navigate('Login');
              }}
              style={Style.signUpTxt}>
              Login
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

export default connect(mapStateToProps, {
  createAnNewAccount,
})(SignUpScreen);

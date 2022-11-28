import React from 'react';
import {StatusBar} from 'react-native';
import {reducer} from './src/reducers/main/index';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {applyMiddleware, createStore} from 'redux';
import SplashScreen from './src/component/SplashScreen';
import LoginScreen from './src/component/LoginScreen';
import SearchScreen from './src/component/SearchScreen';
import SeeAllScreen from './src/component/SeeAllScreen';
import SignUpScreen from './src/component/SignUpScreen';
import HomeScreen from './src/component/MainScreen';
import NewsDetailsScreen from './src/component/NewsDetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FlashMessage from 'react-native-flash-message';

const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBackgroundColor('rgba(0,0,0,0)');
  StatusBar.setBarStyle('dark-content');
  StatusBar.setTranslucent(true);

  const store = createStore(reducer, {}, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Loading"
            component={SplashScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Details"
            component={NewsDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SeeAll"
            component={SeeAllScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <FlashMessage
        duration={3000}
        floating={true}
        position="top"
        icon="auto"
        style={{marginTop: '10%'}}
      />
    </Provider>
  );
};

export default App;

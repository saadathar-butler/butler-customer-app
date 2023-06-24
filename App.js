import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, Text, ActivityIndicator, ActionSheetIOS } from 'react-native';
import RootStack from './src/components/RootStack';
import MainTabs from './src/components/MainTabs';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from './src/components/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from './src/Pages/Splash';

function App() {
    //intal Login state
    const initialLoginState = {
      isLoading: true,
      userNumber: null,
      userToken: null
    }
  // ReducerHook foe Switch cases
    const loginReducer = (prevState , action) => {
  
      switch (action.type) {
        case "RETRIEVE_TOKEN":
          return {
            ...prevState,
            userToken:action.token,
            isLoading:false,
          };
        case "LOGIN":
          return {
            ...prevState,
            userToken:action.userToken,
            isLoading:false,
          };
        case "REGISTER":
          return {
            ...prevState,
            userToken:action.token,
            isLoading:false,
          };
        case "LOGOUT":
          return {
            ...prevState,
            userToken:null,
            isLoading:false,
          }
      }
    };
    const [loginState, dispatch] = useReducer(loginReducer , initialLoginState)

  const authContext = useMemo(() => ({
    signIn: async(user) => {
      let signInUser = JSON.stringify(user);
      if(signInUser != null)
      {
        try {
          await AsyncStorage.setItem('UserData', signInUser)
        } catch (e) {
          console.log(e);
        }
      } 
      dispatch({ type:"LOGIN", token:signInUser});
    },
    signUp: async(user) => {
      let signInUser = JSON.stringify(user);
      try {
        console.log("Inside try")
        await AsyncStorage.setItem('UserData', signInUser)
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token:signInUser}  );
    },
    signOut: async() => {
      try {
        console.log("Inside try")
        await AsyncStorage.removeItem('UserData')
      } catch (e) {
        console.log(e);
      }
      dispatch({ type:"LOGOUT", token: null});
    },
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      try {
        userToken = await AsyncStorage.getItem('UserData');
        console.log("User Token",userToken)
      } catch(e) {
        console.log(e);
      }
      dispatch({ type:"RETRIEVE_TOKEN", token:userToken});
    }, 3000);
  }, []);
  console.log(loginState);
  if (loginState.isLoading) {
    return (
     <SplashScreen/>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken !== null ? (
          <MainTabs />
        )
          :
          <RootStack />
        }

      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
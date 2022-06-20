import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native'
import { useIsConnected } from 'react-native-offline';
import SplashScreen from 'react-native-splash-screen'
import { ToastProvider } from 'react-native-toast-notifications'
import Colors from '../Utils/Assets/Colors';
import Offline from './Offline'
import Pages from './Pages'

const App = ()=>{
    const isConnected = useIsConnected();
    useEffect(()=>{  SplashScreen.hide(); },[])
  return(
    <>
    <StatusBar backgroundColor={Colors.primary} animated={true} />
      {isConnected ? (
         <ToastProvider>
           <Pages />
         </ToastProvider>
      ) : (
        <Offline />
      )}
    </>
  )
}
export default App;
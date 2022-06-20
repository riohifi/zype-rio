import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity , NativeModules} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import NavigationService from '../Utils/NavigationService';

const Offline =()=>{
    const [isLoad, setIsLoad]=useState(true)
    useEffect(() => {
        myFunction();
        return () => {
            setIsLoad(false); // This worked for me
        };
    }, []);
    
    const myFunction = () => {
        setTimeout(() => {
            setIsLoad(false)
        }, 10000);
    }
    
    return(
        <View>
            {isLoad ? 
            (<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height, backgroundColor: 'rgb(0,0,0)' }}>
                <ActivityIndicator size={50} color="#fff" />
            </View>): (
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: Dimensions.get('window').height,}}>
                  
                    <TouchableOpacity onPress={()=>{  NativeModules.DevSettings.reload(); }} style={{ width: widthPercentageToDP('70%'), padding: widthPercentageToDP('5%'), backgroundColor: '#11274a', borderRadius: 15, }}>
                        <Text style={{ color: '#fff', textAlign: 'center', fontWeight: '800' }}>Reload App</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    )
}

export default Offline
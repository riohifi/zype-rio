import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import Colors from '../../../Utils/Assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp} from 'react-native-responsive-screen';
const HomeScreen = ()=>{
    return(
        <SafeAreaView style={Styles.body}>
             <LinearGradient
          colors={[Colors.primary, Colors.black30]}
          style={{flex: 1, width: wp('100%'), alignItems: 'center'}}
        >
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                <View >
                    <Text style={{color: Colors.white}}>HomeScreen</Text>
                </View>
            </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    body: { flex: 1, justifyContent: 'center', alignItems: 'center'}
})

export default HomeScreen
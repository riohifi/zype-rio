import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import Colors from '../../../Utils/Assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MyZypeScreen = ()=>{
    return(
        <SafeAreaView style={Styles.body}>
              <LinearGradient
                colors={[Colors.primary, Colors.black30]}
                style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
            >
                <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View >
                    <Text style={{color: Colors.white}}>MyZypeScreen</Text>
                </View>
            </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    body: {backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center'}
})

export default MyZypeScreen
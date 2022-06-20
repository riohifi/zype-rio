import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import Colors from '../../../Utils/Assets/Colors';

const FeedScreen = ()=>{
    return(
        <SafeAreaView style={Styles.body}>
            <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
                <View >
                    <Text style={{color: Colors.white}}>FeedScreen</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    body: {backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center'}
})

export default FeedScreen
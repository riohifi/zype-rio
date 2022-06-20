import React from 'react';
import { StyleSheet, View, Text, Linking, ImageBackground, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import LinearGradient from 'react-native-linear-gradient';

const StoryItem = ({ item }) => {
    const onHandleGo = async(web_url)=>{
       await Linking.openURL(web_url)
    }
    return (
        <>
            <TouchableOpacity onPress={()=>onHandleGo(item.web_url)}  style={[Styles.row_3_col,]}>
            <ImageBackground source={{uri: item?.image}} style={{flex: 1,}} resizeMode='cover'>
            
                <LinearGradient 
                start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 1 }}
                locations={[0.0, 0.5, 1]}
                colors={item.color}
                style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: wp('5%')}}
                    >
                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_2}> {item.title} </Text>
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_3}>{item.by}</Text>
                </View>
                </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        </>
    )
}
const Styles = StyleSheet.create({
    
    row_3_col: { width: wp('66%'), marginHorizontal: wp('2%'), borderRadius: wp('7%'), height: hp('40%'), overflow: 'hidden' },
    row_3_col_row: {  },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('5%'),  },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('3.5%'), paddingVertical: wp('2%') },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
   

})
export default StoryItem
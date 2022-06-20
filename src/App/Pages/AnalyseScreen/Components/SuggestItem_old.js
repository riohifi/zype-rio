import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';

const SuggestItem = ({ item }) => {
    return (
        <>
            <LinearGradient 
                start={{ x: 0.0, y: 0.9 }} end={{ x: 0.8, y: 0.0 }}
                locations={[0, 0.0, 0.8]}
                colors={item.color}
                style={[Styles.row_3_col]}>
            <ImageBackground source={item.icon} resizeMode="cover" style={{flex: 1,}} >

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text}>{item.tag}</Text>
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_2}>{item.title}</Text>
                    <Text style={Styles.row_3_col_row_text_2}>{item.desc}</Text>
                </View>

                <View style={[Styles.row_3_col_row, { }]}>
                    <TouchableOpacity style={Styles.btn}>
                    <Text style={Styles.row_3_col_row_text_3}> View More </Text>
                    <MaterialCommunityIcons name='arrow-right-circle' size={wp('7%')} color={Colors.black} />
                    </TouchableOpacity>
                </View>

                </ImageBackground>
            </LinearGradient>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%'), },

    row_3_col: { width: wp('73%'), paddingHorizontal: wp('4%'),  marginHorizontal: wp('2%'), borderRadius: wp('5%'), paddingVertical: wp('3%') },
    row_3_col_row: {  marginVertical: wp('2%'), },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4.5%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.black, fontFamily: Fonts.bold, fontSize: wp('3.5%'), paddingVertical: wp('2%'),  },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
    row_3_col_row_img: { width: wp('8%') },

    btn: { flexDirection: 'row', backgroundColor: Colors.white, width: wp('35%'), paddingHorizontal: 10, borderRadius: wp('5%'), alignItems: 'center', justifyContent: 'space-between' },

})
export default SuggestItem
import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import ParsedText from 'react-native-parsed-text';

const SuggestItem = ({ item }) => {
    var regexp = /#(\S)/g;
    return (
        <>
            <View 
                style={[Styles.row_3_col]}>
                 <ImageBackground source={item.icon} resizeMode='stretch' style={{flex: 1}} >
                <View style={[ {  flex: 1,  zIndex: 1, top: -6, position: 'absolute', alignSelf: 'center', paddingHorizontal: wp('4%')}]}>
                    <Text style={Styles.row_3_col_row_text}>{item.tag}</Text>
                </View>

                <View style={[Styles.row_3_col_row, { flex: 1, marginVertical: wp('3%')}]}>
                    <Text style={[Styles.row_3_col_row_text_4,]}>{item.title}</Text>
                    <ParsedText 
                        parse={[
                            {pattern: /%|more|20/, style: {fontFamily: Fonts.bold}},
                        ]} 
                        childrenProps={{allowFontScaling: false}}
                        style={[Styles.row_3_col_row_text_2,]}>{(item.desc).replace(regexp, '$1')}</ParsedText>
                </View>

                <View style={[Styles.row_3_col_row, { paddingVertical: wp('7%') , flex: 1}]}>
                    {/* <TouchableOpacity>
                    <LinearGradient
                            start={{ x: 0.0, y: 0.9 }} end={{ x: 0.8, y: 0.0 }}
                            locations={[0, 0.0, 0.8]}
                            style={Styles.btn}
                            colors={item.color}
                        >
                                <Text style={Styles.row_3_col_row_text_3}> View More / CTA </Text>
                                <MaterialCommunityIcons name='arrow-right-circle' size={wp('9%')} color={Colors.white} style={{marginLeft: 10}} />
                        </LinearGradient>
                    </TouchableOpacity> */}
                </View>
                </ImageBackground>
            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%'), },

    row_3_col: { width: wp('75%'),  marginHorizontal: wp('2%'), borderColor: Colors.white, borderRadius: wp('7%'), marginVertical: wp('3%'), flex: 1 },
    row_3_col_row: { marginTop: wp('5%'), paddingHorizontal: wp('5%') },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('4%'), textAlign: 'center' },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4.5%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4.0%'), paddingVertical: wp('2%'),  },
    row_3_col_row_text_4: { color: Colors.gray30, fontFamily: Fonts.regular, fontSize: wp('3.5%'), paddingVertical: wp('4%') },
    row_3_col_row_img: { width: wp('8%') },

    btn: { flexDirection: 'row', backgroundColor: Colors.white, paddingHorizontal: wp('8%'), paddingVertical: wp('2%'), borderRadius: wp('3%'), alignItems: 'center', alignSelf: 'center' },

})
export default SuggestItem
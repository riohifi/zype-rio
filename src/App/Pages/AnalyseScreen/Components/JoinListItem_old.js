import React from 'react';
import { StyleSheet, View, Text, Image, ImageBackground, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient';
import ParsedText from 'react-native-parsed-text';

const JoinListItem = ({ item }) => {
    return (
        <>
        <View style={Styles.row_3}>
            <LinearGradient 
                start={{ x: 0.0, y: 0.9 }} end={{ x: 0.8, y: 0.0 }}
                locations={[0, 0.0, 0.8]}
                colors={item.color}
                style={[Styles.row_3_col]}>
        
                <View style={Styles.tag}>
                    <View style={Styles.row_4_col_row}>
                        <FontAwesome name="user-circle-o" color={Colors.white} size={wp('6%')} />
                        <Text style={Styles.row_4_col_row_text}>32</Text>
                    </View>
                    <View style={Styles.row_4_col_row}>
                        <Text style={Styles.row_4_col_row_text}>Others</Text>
                        <Text style={Styles.row_4_col_row_text}>Joined</Text>
                    </View>
                </View>

                <View style={Styles.row_3_col_row}>
                    <ParsedText 
                        parse={[
                            {pattern: /30%|less/, style: {color: Colors.black}},
                        ]}
                        style={Styles.row_3_col_row_text_2}>{(item.title)}</ParsedText>
                    <Text style={Styles.row_3_col_row_text_3}>{item.desc}</Text>
                </View>
            </LinearGradient>

            <View style={[Styles.row_3_col_row_2, { }]}>
                <TouchableOpacity style={Styles.btn}>
                    <MaterialCommunityIcons name='share-variant-outline' size={wp('7%')} color={Colors.black} />
                </TouchableOpacity>
                <TouchableOpacity style={Styles.btn}>
                    <Text style={Styles.row_3_col_row2_text_3}> I am in!  </Text>
                    <MaterialCommunityIcons name='arrow-right-circle' size={wp('7%')} color={Colors.black} />
                </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { backgroundColor: Colors.white, borderRadius: wp('5%'), width: wp('73%'),  marginHorizontal: wp('2%'),},

    row_3_col: { flex: 1, paddingHorizontal: wp('4%'),  borderRadius: wp('5%'), padding: wp('3%') },
    row_3_col_row: {  marginVertical: wp('2%'), },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('7%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('3.5%'), paddingVertical: wp('2%'),  },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
    row_3_col_row_img: { width: wp('8%') },
    row_3_col_row2_text_3: { color: Colors.black, fontFamily: Fonts.bold, fontSize: wp('3.5%'), paddingVertical: wp('2%'),  },

    row_3_col_row_2: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: wp('2%')},

    btn: { flexDirection: 'row', backgroundColor: Colors.white, width: wp('30%'), paddingHorizontal: 10, borderRadius: wp('5%'), alignItems: 'center', justifyContent: 'space-between' },
   
    row_4_col_row: {  flexDirection: 'row', justifyContent: 'space-between'},
    row_4_col_row_text: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('4.3%') },

    tag: {paddingHorizontal: wp('3%'), paddingVertical: wp('2%') ,borderWidth: 0.5,  width: wp('37%'), borderRadius: wp('5%'), borderColor: Colors.white, marginVertical: wp('3%')},
})
export default JoinListItem
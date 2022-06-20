import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import Config from '../../../../Utils/Config';
import NavigationService from '../../../../Utils/NavigationService';
import { numberWithCommas } from '../../../../Utils/Utils';

const PaymentItem = ({ item, navigate, index}) => {
    // console.log('index', index)
    return (
        <>
            <TouchableOpacity onPress={()=> NavigationService.navigate(navigate, {data: item, "index": index})} style={[Styles.row_8_col_row_col_1, Styles.mod_col]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={{uri: item.icon_image}} style={Styles.icon_box_sm} resizeMode='contain' />
                        <View style={{marginHorizontal: wp('3%')}}>
                            <Text style={Styles.row_8_text_2}>{item.title}</Text>
                            <Text style={Styles.row_8_text_3}>Next <Text style={{color: Colors.cyan}}> {item.date}</Text></Text>
                        </View>
                    </View>
                    <View>
                        <Text style={Styles.row_8_text_5}>{Config.currency} {numberWithCommas(item.amount)}</Text>
                    </View>
                </TouchableOpacity> 
        </>
    )
}
const Styles = StyleSheet.create({
   
 row_8_col_row_col_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: wp('80%'), paddingVertical: wp('4%')},
    row_8_col_row_col_1_col_1: { flexDirection: 'row', alignItems: 'baseline', flex: 1},
    row_8_col_row_col_1_col_2: { flex: 1},

    icon_box: { width: wp('12%'), marginHorizontal: wp('1%') },
    icon_box_sm: { width: wp('5%'),  height: wp('5%'),marginHorizontal: wp('1%') },

    mod_col: { backgroundColor: Colors.black , marginTop: 10, paddingHorizontal: wp('4%'), borderRadius: wp('5%')},

    row_8_text_1: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.medium, fontSize: wp('3.5%')},
    row_8_text_2: {color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4.5%')},
    row_8_text_3: {color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('3.5%')},
    row_8_text_5: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.bold, fontSize: wp('5%')},
    row_8_text_7: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.bold, fontSize: wp('7%')},

})

PaymentItem.defaultProps = {
    navigate: "MonthlyPaymentsScreen"
}
export default PaymentItem
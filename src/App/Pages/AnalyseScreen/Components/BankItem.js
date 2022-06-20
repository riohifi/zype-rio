import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import { numberWithCommas } from '../../../../Utils/Utils';

const BankItem = ({ item }) => {
    return (
        <>
            <View style={[Styles.row_3_col, {borderColor: item.color}]}>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text}> {item.bankName} </Text>
                    <Image source={{uri: item.icon_image}} style={Styles.row_3_col_row_img} resizeMode='contain' />
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_2}> {numberWithCommas(item.amount)} </Text>
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_3}>{item.date}</Text>
                    <Text style={Styles.row_3_col_row_text_4}>{item.tag}</Text>
                </View>

            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },

    row_3_col: { width: wp('46%'), paddingHorizontal: wp('4%'), borderWidth: 1, borderColor: Colors.white, marginHorizontal: wp('2%'), paddingVertical: wp('1%'), borderRadius: wp('5%') },
    row_3_col_row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('5%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('2.5%'), paddingVertical: wp('2%') },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
    row_3_col_row_img: { width: wp('8%'), height: wp('8%'), marginVertical: wp('3%') },

})
export default BankItem
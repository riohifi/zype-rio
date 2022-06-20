import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import Config from '../../../../Utils/Config';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { observer } from 'mobx-react-lite';

const CreditBankItem = ({ item, handleUISelect, index }) => {

    const allCreditData = AnalyseStore.allCreditData
    
    const handleNextGo = (val)=>{
        const flData = allCreditData?.accounts.filter((fl)=> fl.account_number == val.account_number)
            // AnalyseStore.setLoanDetails(allCreditData?.accounts[index])
            AnalyseStore.setLoanDetails(flData[0])
            handleUISelect(2) 
            // console.log('itemitem', allCreditData?.accounts.filter((fl)=> fl.account_number == val.account_number))
    }

    return (
        <>
            <TouchableOpacity onPress={()=>handleNextGo(item)} style={[Styles.row_3_col, {borderColor: item.color, backgroundColor: item.backgroundColor}]}>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text}> {item.bankName}  <Text style={{ fontFamily: Fonts.regular, fontSize: wp('3.0%') }}>{item.tag}</Text> </Text>
                     <Text style={Styles.row_3_col_row_text}> <Text style={{ fontFamily: Fonts.bold, fontSize: wp('4.2%'), color: Colors.orange }}><Feather name="flag" size={15} color={Colors.orange} />  {item.overDue}</Text> </Text>
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_2}> {Config.currency}{item.amount} </Text>
                </View>

                <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_3}>Total: <Text style={{fontFamily: Fonts.bold}}>{item.total_payment}</Text> {" "} <Octicons name="dot-fill" size={10} color={Colors.white} /> {" "}  {item.date}</Text>
                    <Text style={Styles.row_3_col_row_text_4}>  <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white }]} size={wp('5%')} /> </Text>
                </View>

            </TouchableOpacity>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },

    row_3_col: { width: wp('80%'), paddingHorizontal: wp('4%'), borderWidth: 1, borderColor: Colors.white, marginHorizontal: wp('2%'), paddingTop: wp('2%'), borderRadius: wp('5%') },
    row_3_col_row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' , marginVertical: wp('2%')},
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('8%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('3.2%'), paddingVertical: wp('2%') },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
    row_3_col_row_img: { width: wp('8%') },

})
export default observer(CreditBankItem)
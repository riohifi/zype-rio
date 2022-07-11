import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../../Utils/Assets/Colors';
import Images from '../../../../Utils/Assets/Images';
import Fonts from '../../../../Utils/Assets/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationService from '../../../../Utils/NavigationService';
import PaymentItem from '../Components/PaymentItem';
import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { numberWithCommas, getPaymentIcon } from '../../../../Utils/Utils';
import moment from 'moment';
import Config from '../../../../Utils/Config';

const MonthlyPaymentsScreen = () => {

    var allAnalyseData = AnalyseStore.allAnalyseData
    var payData = AnalyseStore.recurringPayments
    const [spendAmount, setSpendAmount] = useState(0)
    const [paymentList, setPaymentList] = useState([])
      // ************** Total Expense **************
      const formatPayment = ()=>{
        const tempArr = []
        payData?.records.map((item)=>{
            const tempFormat = {}
            tempFormat['amount'] = numberWithCommas(item.amount, 2)
            tempFormat['title'] = item.name
            tempFormat['id'] = item?.id
            tempFormat['date'] = moment(item.bill_date).format('DD MMMM')
            tempFormat['icon'] = getPaymentIcon(item.icon_url)
            tempFormat['icon_image'] = item.icon_image
            tempFormat['bill_date'] = moment(item.bill_date).format('DD MMMM')
            tempFormat['next_bill_date'] = moment(item.next_bill_date).format('DD MMMM')
            tempArr.push(tempFormat)
        });
        // console.log('tempArr', tempArr)
        setPaymentList(tempArr)
    }

    useEffect(()=>{
        // ************** Total Expense **************
        formatPayment();
        if(allAnalyseData?.expenses?.monthly_expenses.length > 0){
            setSpendAmount(allAnalyseData?.expenses?.monthly_expenses[0]?.total_expense)
        }
    },[AnalyseStore.allAnalyseData, AnalyseStore.recurringPayments])

    return (
        <>
            <SafeAreaView style={Styles.body}>
                <LinearGradient
                    colors={[Colors.primary, Colors.black30]}
                    style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
                >
                    <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                        <ImageBackground source={Images.gradient_bg} style={[Styles.row_8_col]}>

                            {/* **********  Section One ********** */}
                            <TouchableOpacity style={[Styles.row_2,]} onPress={() => NavigationService.goBack()}>
                                <View style={[Styles.row_1_col, { flex: 3 }]}>
                                    <AntDesign name="left" style={[{ color: Colors.white }]} size={wp('6%')} />
                                </View>
                            </TouchableOpacity>
                            {/* **********  Section One  end********** */}

                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Total Spend</Text>
                                <Text style={Styles.h1}>{Config.currency} {numberWithCommas(allAnalyseData?.total_recurring_expense)}</Text>

                                <TouchableOpacity onPress={()=> NavigationService.navigate("NewSubscriptionScreen")} style={Styles.create_btn}>
                                    <AntDesign name="pluscircleo" color={Colors.white} size={25} style={{ marginRight: 10 }} />
                                    <Text style={Styles.h4}>Create New Subscription</Text>
                                </TouchableOpacity>

                            </View>


                        </ImageBackground>

                        <View style={[Styles.section, { marginTop: wp('-20%') }]}>
                            <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                                {
                                    paymentList.map((item, i) => (<PaymentItem key={`pay-${i}`} index={i} item={item} navigate="PaymentsDetailsScreen" />))
                                }
                            </ScrollView>
                        </View>

                        <View style={{ marginBottom: wp('20%') }}></View>

                    </ScrollView>
                </LinearGradient>
            </SafeAreaView>
        </>
    )
}


const Styles = StyleSheet.create({
    body: { backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' },

    section: { paddingVertical: wp('2%'), flex: 1, alignItems: 'center', },

    divider: { paddingVertical: 0.2, backgroundColor: Colors.gray, flex: 1, width: wp('100%') },

    row_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('2%') },
    row_1_col: { flex: 1 },
    row_1_col_text: { fontFamily: Fonts.italic, fontSize: wp('2.5%'), color: Colors.gray40, textAlign: 'right' },

    row_2: { flexDirection: 'row', width: wp('100%'), marginBottom: wp('1%'), marginLeft: wp('5%') },

    row_8_col: { paddingVertical: wp('5%'), flex: 1, width: wp('100%'), marginVertical: wp('2%'), height: hp('50%') },
    row_8_col_row: { backgroundColor: Colors.black30, paddingVertical: wp('2%'), paddingHorizontal: wp('5%'), marginHorizontal: wp('5%'), borderRadius: wp('7%'), overflow: 'scroll' },
    row_8_col_row_col_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    row_8_col_row_col_1_col_1: { flexDirection: 'row', alignItems: 'baseline', flex: 1 },
    row_8_col_row_col_1_col_2: { flex: 1 },

    create_btn: { flexDirection: 'row', paddingHorizontal: wp('5%'), paddingVertical: wp('4%'), backgroundColor: Colors.black, borderRadius: wp('10%'), alignItems: 'center', justifyContent: 'space-between' },

    h6: { fontFamily: Fonts.italic, fontSize: wp('5%'), color: Colors.white },
    h4: { fontFamily: Fonts.medium, fontSize: wp('4%'), color: Colors.white },
    h1: { fontFamily: Fonts.bold, fontSize: wp('9%'), color: Colors.white, marginVertical: wp('4%') },

})


export default observer(MonthlyPaymentsScreen)
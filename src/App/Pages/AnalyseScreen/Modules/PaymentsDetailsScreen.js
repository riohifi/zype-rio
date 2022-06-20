import React, { useEffect, useState } from 'react';
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity, ImageBackground, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../../Utils/Assets/Colors';
import Images from '../../../../Utils/Assets/Images';
import Fonts from '../../../../Utils/Assets/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from '../../../../Utils/NavigationService';
import PaymentItem from '../Components/PaymentItem';
import { numberWithCommas } from '../../../../Utils/Utils';
import Config from '../../../../Utils/Config';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { useToast } from 'react-native-toast-notifications';

const PaymentsDetailsScreen = (props) => {

    const toast = useToast()

    const data = props.route.params
    console.log(data.data)
    const [paymentList, setPaymentList] = useState([
        // {date: "31st March 2022", amount: "₹ 2,400"},
    ])
    const formatData = ()=>{
        const tempArr = []
        tempArr.push({date: data.data?.bill_date, amount: `${Config.currency} ${numberWithCommas(data.data?.amount)}`})
        setPaymentList(tempArr)
    }
    useEffect(()=>{
        formatData();
    },[])

    const handleDelete = async()=>{
        await AnalyseStore.deleteRecurringPaymentsFunc(data?.data?.id)
        toast.show("Deleted Successfully", {type: 'success', placement: 'bottom'})
        NavigationService.goBack()
    }

    return (
        <>
            <SafeAreaView style={Styles.body}>
                <LinearGradient
                    colors={[Colors.primary, Colors.black30]}
                    style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
                >
                    <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                       
                            {/* **********  Section One ********** */}
                            <TouchableOpacity style={[Styles.row_2,]} onPress={() => NavigationService.goBack()}>
                                <View style={[Styles.row_1_col, { flex: 3 }]}>
                                    <AntDesign name="left" style={[{ color: Colors.white }]} size={wp('6%')} />
                                </View>
                            </TouchableOpacity>
                            {/* **********  Section One  end********** */}

                            <View style={Styles.section}>
                                <Text style={Styles.h1} numberOfLines={1} ellipsizeMode='tail' >{Config.currency} {data.data?.amount} </Text>
                                <Text style={Styles.h4}><MaterialCommunityIcons name="lightning-bolt-outline" color={Colors.cyan20} size={20} />{data.data?.title}</Text>
                                <Text style={Styles.h6}> Next <Text style={{color: Colors.cyan}}>{data.data?.bill_date}</Text></Text>
                            </View>

                            <View style={[Styles.section, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('5%'), width: wp('30%'), alignSelf: 'flex-end', marginRight: wp('5%'), paddingBottom: wp('7%')}]}>
                                {/* <TouchableOpacity style={{flex: 1}}><Text  style={[ Styles.h6, {textAlign: 'left', color: Colors.gray}]}><MaterialCommunityIcons name="file-document-edit-outline" color={Colors.cyan} size={30} /></Text></TouchableOpacity> */}
                                <TouchableOpacity onPress={handleDelete} style={{flex: 1}}>
                                    {/* <Text style={[ Styles.h6, {textAlign: 'right', color: Colors.gray}]}> */}
                                        {/* <MaterialCommunityIcons name="delete-variant" color={Colors.orange} size={30} /> */}
                                        <Image source={Images.delete_icon} style={{ height: 30, width: 30, position: 'absolute', right: 0}} resizeMode='contain' />
                                    {/* </Text> */}
                                </TouchableOpacity>
                            </View>
                            
                            <View style={[Styles.section, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('5%'), width: wp('100%')}]}>
                                <View style={{flex: 1}}><Text  style={[ Styles.h6, {textAlign: 'left', color: Colors.gray}]}>Last Billed on :</Text></View>
                                <View style={{flex: 1}}><Text style={[ Styles.h6, {textAlign: 'right', color: Colors.gray}]}>Amount:</Text></View>
                            </View>
                            
                            {
                                paymentList.map((item, i)=>(
                                   <View key={i} style={[Styles.section, {flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp('5%'), width: wp('100%'), marginVertical: wp('3%')}, i=== 0 ? { borderBottomWidth: 0.2, borderColor: Colors.gray30 } : null]}>
                                        <View style={{flex: 1}}><Text  style={[{textAlign: 'left'}, Styles.h3]}>{ item.date }</Text></View>
                                        <View style={{flex: 1}}><Text style={[{textAlign: 'right'}, Styles.h3]}>{item.amount}</Text></View>
                                    </View> 
                                ))
                            }
                            

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

    h6: { fontFamily: Fonts.regular, fontSize: wp('4%'), color: Colors.white , marginTop: wp('2%')},
    h4: { fontFamily: Fonts.medium, fontSize: wp('5%'), color: Colors.white },
    h3: { fontFamily: Fonts.medium, fontSize: wp('4.5%'), color: Colors.white },
    h1: { fontFamily: Fonts.bold, fontSize: wp('8%'), color: Colors.white, marginTop: wp('2%') },

})


export default PaymentsDetailsScreen
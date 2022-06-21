import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../../Utils/Assets/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ParsedText from 'react-native-parsed-text';
import Images from '../../../../../Utils/Assets/Images';
import Fonts from '../../../../../Utils/Assets/Fonts';
import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../../Stores/AnalyseStore';
import Config from '../../../../../Utils/Config';
import moment from 'moment';
import { paymentHistoryIcon, paymentHistoryIconColor } from '../../../../../Utils/Utils';

const CreditCardDetails = ({ handleUISelect, Styles }) => {

    const [months] = useState(["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"])

    const [data, setData] = useState(null)
    const allCreditData = AnalyseStore.allCreditData

    useEffect(()=>{
        // console.log(JSON.stringify(AnalyseStore.loanDetails))
        setData(AnalyseStore.loanDetails)
    },[AnalyseStore.loanDetails, AnalyseStore.allCreditData])

    return (
        <>
            <View style={{ paddingBottom: wp('20%'), flex: 1, alignItems: 'center' ,}}>

                <View style={[Styles.row_1, {borderWidth: 0, backgroundColor: Colors.white}]}>
                    {/* *********** Row 1 Start ******* */}
                    <TouchableOpacity onPress={() => { handleUISelect(1) }} style={[Styles.row_1_row, { justifyContent: 'space-between', alignItems: 'center' }]}>
                        <View style={{flexDirection: 'row'}}>
                            <FontAwesome name="angle-left" size={25} color={Colors.black} />
                            <Image style={{width: 25, height: 25, marginHorizontal: wp('3%')}} source={{uri: data?.icon_image}} />
                            <Text style={[Styles.row_1_row_text, { color: Colors.black, fontFamily: Fonts.bold}]}>{data?.subscriber_name} <Text style={{color: Colors.gray60, fontSize: wp('3.5')}}> {data?.loan_type}</Text></Text>
                        </View>
                        <View>
                            <Text style={{color: Colors.green20, fontFamily: Fonts.medium, fontSize: wp('3.5%')}}>ACTIVE</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={[Styles.row_1_row_text, { color: Colors.black, fontFamily: Fonts.regular, marginLeft: wp('16%'), fontSize: wp('3.2%')}]}>{data?.account_number}</Text>
                    {/* *********** Row 1 end ******* */}
                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('4%') }]}>
                        <View>
                            <Text style={[Styles.row_1_row_btn_text_3, {color: Colors.black}]}>amount to be paid</Text>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontSize: wp('4.5%'), marginVertical: wp('2%'), fontFamily: Fonts.medium}]}>{Config.currency} {data?.remaining_amount}</Text>
                        </View>
                        <TouchableOpacity style={{  }}>
                            <Text style={[Styles.row_1_row_btn_text_3, {color: Colors.black}]}>sanctioned amount</Text>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontSize: wp('4.5%'), marginVertical: wp('2%'), fontFamily: Fonts.medium}]}>{Config.currency} {data?.loan_type !== 'Credit Card' ? data?.loan_amount : data?.credit_limit}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* *********** Row 3 End ******* */}
                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('2%') }]}>
                        <View>
                            <Text style={[Styles.row_1_row_btn_text_3, {color: Colors.black}]}>issued on</Text>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontSize: wp('4.5%'), marginVertical: wp('2%'), fontFamily: Fonts.medium}]}>{moment(data?.disburse_date).format("DD MMM YYYY")}</Text>
                        </View>
                        <TouchableOpacity style={{  }}>
                            <Text style={[Styles.row_1_row_btn_text_3, {color: Colors.black}]}>loan tenure</Text>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontSize: wp('4.5%'), marginVertical: wp('2%'), fontFamily: Fonts.medium}]}>{allCreditData?.bureau_age}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* *********** Row 3 End ******* */}
                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('4%') }]}>
                        <View>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontSize: wp('4%'),}]}>payment history</Text>
                        </View>
                        <TouchableOpacity style={{  }}>
                            <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.green20, fontSize: wp('4%'),}]}>{data?.full_payment/data?.total_payment*100}% ON TIME</Text>
                        </TouchableOpacity>
                    </View>
                    {/* *********** Row 3 End ******* */}

                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('2%') }]}>
                    <Text style={[Styles.text_sm, { fontFamily: Fonts.bold, fontSize: wp('3%'), color: Colors.white}]}>2022</Text>
                       {
                           months.map((month, i)=>(
                               <Text key={i} style={Styles.text_sm}>{month}</Text>
                           ))
                       }
                       
                    </View>
                    {
                        data?.payment_history !== undefined &&
                        Object.keys(data?.payment_history).map((item, i)=>(
                            <View style={[Styles.row_1_row, { marginTop: wp('1%') }]} key={i}>
                                <Text style={[Styles.text_sm, { fontFamily: Fonts.bold, fontSize: wp('3%')}]}>{item}</Text>
                                {
                                    months.map((month, j)=>(
                                        <FontAwesome key={j} size={8} name={paymentHistoryIcon(data?.payment_history[item], month)} color={paymentHistoryIconColor(data?.payment_history[item], month)} />
                                    ))
                                }
                            </View>
                        ))
                    }
                    
                    
                    {/* *********** Row 3 End ******* */}

                    <View style={[Styles.divider, {marginVertical: wp('5%'), width: wp('80%')}]}></View>

                    <View style={[Styles.row_1_row, { marginTop: wp('1%'), }]}>
                        <Text style={[Styles.h6, {color: Colors.black}]}>
                            <FontAwesome size={13} name={"check"} color={Colors.green} /> {"  "}
                            on time payment
                        </Text>
                        <Text style={[Styles.h6, {color: Colors.black}]}>
                            <FontAwesome size={13} name={"remove"} color={Colors.orange} /> {"  "}
                            delayed
                        </Text>
                        <Text style={[Styles.h6, {color: Colors.black}]}>
                            <FontAwesome size={13} name={"circle-o"} color={Colors.yellow} /> {"  "}
                            overdue
                        </Text>
                    </View>
                    <View style={[Styles.row_1_row, { marginTop: wp('4%'), }]}>
                        <Text style={[{color: Colors.black, fontFamily: Fonts.regular, fontSize: wp('3%')}]}>last updated by bureau on <Text style={{ fontSize: wp('3.5%'), fontFamily: Fonts.bold }}>{moment(allCreditData?.last_updated_at).format("DD MMM `YY")}</Text></Text>
                    </View>

                </View>

               

            </View>
        </>
    )
}

export default observer(CreditCardDetails)
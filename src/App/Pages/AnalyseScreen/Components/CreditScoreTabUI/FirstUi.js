import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList, Linking } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../../Utils/Assets/Colors';
import Fonts from '../../../../../Utils/Assets/Fonts';
import Images from '../../../../../Utils/Assets/Images';
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import TabLinearButton from '../TabLinearButton';
import TabNormalButton from '../TabNormalButton';
import CreditBankItem from '../CreditBankItem';
import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../../Stores/AnalyseStore';
import _ from 'lodash'
import { daysAgo, numberWithCommas, random_rgba, statusColor } from '../../../../../Utils/Utils';
import moment from 'moment';
import AnotherChart from '../AnotherChart';
import Config from '../../../../../Utils/Config';

const FirstUi = ({ Styles, handleUISelect, catList, setCatList })=>{

    const allCreditData = AnalyseStore.allCreditData

    const [showBank, setShowBank] = useState(true)
    const toggleBankView = ()=>{
        setShowBank(false)
        setTimeout(() => { setShowBank(true) }, 100);
    }

    // console.log('allCreditData', allCreditData?.experian_report_link)

    const [activeCat, setActiveCat] = useState(0)
    const toggleCatButton = (value) => { setActiveCat(value); getBankList(value); toggleBankView() }

    const CategorySectionUi = (catIndex, activeCat, category) => {
        if (activeCat === catIndex) {
            return <TabLinearButton
                title={category}
                buttonStyle={Styles.row_4_catItem}
                textStyle={Styles.row_4_catItem_text}
                tabValue={catIndex}
                colorGradient={[Colors.orange, Colors.orange20, Colors.orange30]}
                handleAction={toggleCatButton} />
        } else {
            return <TabNormalButton
                title={category}
                buttonStyle={[Styles.row_4_catItem, { backgroundColor: Colors.primary, }]}
                tabValue={catIndex}
                textStyle={[Styles.row_4_catItem_text, { fontFamily: Fonts.regular }]}
                handleAction={toggleCatButton}
            />
        }
    }
    const renderCatItem = ({ item, index }) => (CategorySectionUi(index, activeCat, item));

    const [bankList, setBankList] = useState([])
    const renderItem = ({ item, index }) => (<CreditBankItem item={item} index={index} handleUISelect={handleUISelect} />);

    const [score, setScore] = useState(0)
    const [scoreHistory, setScoreHistory] = useState({})

    const getScoreFunc = ()=>{
        if(allCreditData && allCreditData !== undefined){
            // console.log(allCreditData)
            setScore(allCreditData.score)
        }
    }

    const getBankList = (catIndex)=>{
        var temArr = []
        var temCat = AnalyseStore.loanCategory
        // console.log('temCat[catIndex]', temCat[catIndex])
        if(allCreditData && allCreditData !== undefined && temCat !== null){
            var filterData = [];
            if(temCat[catIndex] === "All"){ filterData = allCreditData.accounts }
            else{ filterData = allCreditData.accounts.filter((fl)=> fl.loan_type == temCat[catIndex]) }
            
            // console.log('filterData', filterData)
            filterData.map((item, i)=>{
                var tempFormat = {}
                tempFormat["bankName"] = item.subscriber_name
                tempFormat["amount"] = numberWithCommas(item.loan_type === 'Credit Card' ? item.credit_limit : item.loan_amount)
                tempFormat["tag"] = item.tenure
                tempFormat["loan_type"] = item.loan_type
                tempFormat["total_payment"] = item.total_payment
                tempFormat["rate_of_interest"] = item.rate_of_interest
                tempFormat["date"] = moment(item.disburse_date).format('MMM YYYY')
                tempFormat["total"] = numberWithCommas(item.loan_amount)
                tempFormat["color"] = i < 1 ? Colors.orange : '#b2fdf4'
                tempFormat["backgroundColor"] =  i < 1 ? 'rgba(244, 103, 90, 0.20465)' : 'rgba(178, 253, 244, 0.20465)'
                tempFormat["overDue"] = item.account_status 
                tempFormat["account_number"] = item.account_number
                
                temArr.push(tempFormat)
            })
        }
        setBankList(temArr)
    }
    
    const formatScoreHistory = ()=>{
        var tempHist = allCreditData?.score_history
        var tempMArr = []
        var tempAArr = []
        tempAArr.push(0)
        tempHist !== undefined && tempHist.map((item, i)=>{
            tempMArr.push(Object.keys(item)[0])
            tempAArr.push(item[Object.keys(item)[0]])
            // console.log('tempArr', item[Object.keys(item)[0]])
        })
        tempAArr.push(900)
        var tempFormat = {}
        tempFormat['month'] = tempMArr
        tempFormat['amount'] = tempAArr
        setScoreHistory(tempFormat)
    }

    useEffect(()=>{
        getScoreFunc()
        getBankList(0)
        formatScoreHistory()
    },[AnalyseStore.allCreditData, AnalyseStore.loanCategory])

    // console.log('scoreHistory', scoreHistory)

    const handleUpdateIn = async()=>{
        await AnalyseStore.getUpdateIn()
    }

    return(
        <>
        
        <View style={{ paddingBottom: wp('20%'), flex: 1, alignItems: 'center' }}>
            <View style={Styles.row_1}>
                {/* *********** Row 1 Start ******* */}
                <View style={Styles.row_1_row}>
                    <Text style={Styles.row_1_row_text}>Your Credit Score</Text>
                    <TouchableOpacity style={[Styles.row_1_row_btn, {backgroundColor: statusColor(allCreditData?.score_status)}]}>
                        <Image source={Images.won} style={{ width: 10, height: 10 }} resizeMode='cover' />
                        <Text style={Styles.row_1_row_btn_text}>{allCreditData?.score_status}</Text>
                    </TouchableOpacity>
                </View>
                {/* *********** Row 1 end ******* */}
                {/* *********** Row 2 Start ******* */}
                <View style={[Styles.row_1_row, { marginTop: 10 }]}>
                    <Text style={Styles.row_2_row_text}> {score}<Text style={{ fontSize: wp('4.5%'), fontFamily: Fonts.regular }}>/900</Text> </Text>
                </View>
                {/* *********** Row 2 End ******* */}
                {/* *********** Row 3 Start ******* */}
                <View style={Styles.row_1_row}>
                    <View>
                        <Image source={Images.ex_logo} style={{ width: wp('20%'), height: wp('10%') }} resizeMode='contain' />
                    </View>
                    {
                        daysAgo(allCreditData?.last_updated_at) > 30 ?
                    
                    <TouchableOpacity onPress={handleUpdateIn} style={{ flexDirection: 'row' }}>
                        {/* <Text style={Styles.row_1_row_btn_text_2}>update in {daysAgo(allCreditData?.last_updated_at)} days ago</Text> */}
                        <Ionicons name="reload" size={wp('5%')} color={Colors.white} />
                    </TouchableOpacity>
                    :
                    <Text style={Styles.row_1_row_btn_text_2}>updated {daysAgo(allCreditData?.last_updated_at)} days ago</Text>
                    }
                </View>
                {/* *********** Row 3 End ******* */}

            </View>

            {/* *********** Section 2  Start ************* */}

            <TouchableOpacity onPress={()=> handleUISelect(1)} style={[Styles.row_2,]}>
                <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.row_2_col_text}> Your Credit Overview  </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white }]} size={wp('4%')} />
                </View>
            </TouchableOpacity>
            {/* ************* Row 4 End ************ */}
            <View style={[Styles.divider, { backgroundColor: '#999a9a' }]}></View>

            {/* *********** Section 2  End ************* */}
            {/* *********** Section 3  Start ************* */}

            <View style={Styles.row_4}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={catList}
                    renderItem={renderCatItem}
                    keyExtractor={(item, i) => i}
                />
            </View>

            {/* *********** Section 3  End ************* */}

            {/* ************* Row 3 Start ************** */}
            <View style={Styles.row_3}>
                {showBank && <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={bankList}
                    renderItem={renderItem}
                    keyExtractor={(item, i) => i}
                /> }
                {/* ************* Row 3 End ************** */}
            </View>
            {/* ------------------------------------------ */}
            {/* ************************** Row 4 ************* */}
            <View style={Styles.row_5}>
                <View style={[Styles.row_5_row_1,]}>
                    <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                        <Text style={Styles.row_5_row_1_col_text}>Payments  </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{handleUISelect(3)}} style={[Styles.row_1_col]}>
                        <AntDesign name="right" style={[{ color: Colors.white }]} size={wp('5%')} />
                    </TouchableOpacity>
                </View>
                {/* ************* Row 4 End ************ */}
                <View style={[Styles.divider, { backgroundColor: '#999a9a', width: wp('75%') }]}></View>

                <View style={{ flex: 1, marginVertical: wp('2%') }}>
                    <Text style={Styles.row_5_row_1_col_text_2}>{allCreditData?.full_payments}/{allCreditData?.total_payments}</Text>
                </View>

                <View style={[Styles.row_1_row, { justifyContent: 'space-between', width: wp('80%') }]}>
                    <Text style={Styles.row_1_row_text}>Payments on Time</Text>
                    <TouchableOpacity style={[Styles.row_1_row_btn, { width: wp('28%'), backgroundColor: statusColor(allCreditData?.on_time_payment_status) }]}>
                        <Image source={Images.won} style={{ width: 10, height: 10 }} resizeMode='cover' />
                        <Text style={Styles.row_1_row_btn_text}>{allCreditData?.on_time_payment_status}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* ************************** Row 4 End ************* */}

            {/* ************************** Row 4 ************* */}
            <View style={Styles.row_5}>
                <View style={[Styles.row_5_row_1,]}>
                    <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                        <Text style={Styles.row_5_row_1_col_text}>CREDIT LIMIT  </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{handleUISelect(4)}} style={[Styles.row_1_col]}>
                        <AntDesign name="right" style={[{ color: Colors.white }]} size={wp('5%')} />
                    </TouchableOpacity>
                </View>
                {/* ************* Row 4 End ************ */}
                <View style={[Styles.divider, { backgroundColor: '#999a9a', width: wp('75%') }]}></View>

                <View style={{ flex: 1, marginVertical: wp('2%') }}>
                    <Text style={Styles.row_5_row_1_col_text_2}>{allCreditData?.total_credit_limit_available}</Text>
                </View>

                <View style={[Styles.row_1_row, { justifyContent: 'space-between', width: wp('80%') }]}>
                    <Text style={Styles.row_1_row_text}>Available Credit limit</Text>
                    <TouchableOpacity style={[Styles.row_1_row_btn, { paddingHorizontal: wp('5%'), backgroundColor: statusColor(allCreditData?.on_time_payment_status) }]}>
                        <Image source={Images.won} style={{ width: 10, height: 10 }} resizeMode='cover' />
                        <Text style={Styles.row_1_row_btn_text}>{allCreditData?.on_time_payment_status}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* ************************** Row 4 End ************* */}

            {/* ************************** Row 4 ************* */}
            <View style={Styles.row_5}>
                <View style={[Styles.row_5_row_1,]}>
                    <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center', marginVertical: 0 }]}>
                        <Text style={Styles.row_5_row_1_col_text}>CREDIT AGE  </Text>
                    </View>
                    <TouchableOpacity style={[Styles.row_1_col]}>
                        {/* <AntDesign name="right" style={[{ color: Colors.white }]} size={wp('5%')} /> */}
                    </TouchableOpacity>
                </View>
                {/* ************* Row 4 End ************ */}
                <View style={[Styles.divider, { backgroundColor: '#999a9a', width: wp('75%') }]}></View>

                <View style={{ flex: 1, marginVertical: wp('2%') }}>
                    <Text style={Styles.row_5_row_1_col_text_2}>{allCreditData?.bureau_age}</Text>
                </View>

                <View style={[Styles.row_1_row, { justifyContent: 'space-between', width: wp('80%') }]}>
                    <Text style={Styles.row_1_row_text}>Since First Account</Text>
                    <TouchableOpacity style={[Styles.row_1_row_btn, { paddingHorizontal: wp('3%'), backgroundColor: statusColor(allCreditData?.bureau_age_status) }]}>
                        <Image source={Images.won} style={{ width: 10, height: 10 }} resizeMode='cover' />
                        <Text style={Styles.row_1_row_btn_text}>{allCreditData?.bureau_age_status}</Text>
                    </TouchableOpacity>
                </View>

            </View>
            {/* ************************** Row 4 End ************* */}

            {/* ______________________________________________ */}

            {/* *********** Section 2  Start ************* */}

            <View style={[Styles.row_2,]}>
                <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.row_2_col_text}> Your Score History  </Text>
                </View>
                <TouchableOpacity style={[Styles.row_1_col]}>
                    {/* <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white }]} size={wp('4%')} /> */}
                </TouchableOpacity>
            </View>
            {/* ************* Row 4 End ************ */}
            <View style={[Styles.divider, { backgroundColor: '#999a9a' }]}></View>

            {/* *********** Section 2  End ************* */}

            <View style={[Styles.row_2,]}>
                <AnotherChart scoreHistory={scoreHistory} />
            </View>

            <TouchableOpacity onPress={()=>{ allCreditData?.experian_report_link !== undefined ?  Linking.openURL(allCreditData?.experian_report_link): null}} style={[Styles.row_2,]}>
                <View style={{ padding: wp('3%'), marginVertical: wp('4%'), borderWidth: 1, borderColor: 'rgba(229, 80, 80, 0.7)', backgroundColor: 'rgba(229, 80, 80, 0.1)', flex: 1, justifyContent: 'center', flexDirection: 'row', borderRadius: 10 }}>
                    <View style={[Styles.row_1_col, { flex: 3, flexDirection: 'row'}]}>
                        <Feather name="info" style={[ { color: Colors.white , marginRight: 5, marginTop: 10}]} size={wp('5%')} />
                        <Text style={[Styles.row_2_col_text, { fontSize: wp('3.3%'), marginTop: 10, fontFamily: Fonts.regular,color: Colors.gray60 }]}> Report an issue with your </Text>
                        <Image source={Images.ex_logo} style={{width: 40, height: 40, marginLeft: 5}} resizeMode='contain' />
                        <Text style={[Styles.row_2_col_text, { fontSize: wp('3.3%'), marginTop: 10, fontFamily: Fonts.regular,color: Colors.gray60 }]}> Report </Text>
                    </View>
                    <View style={[Styles.row_1_col]}>
                        <AntDesign name="right" style={[ { color: Colors.white, marginTop: 10 }]} size={wp('5%')} />
                    </View>
                </View>
            
            </TouchableOpacity>


        </View>
   
    </>
    )
}

export default observer(FirstUi)
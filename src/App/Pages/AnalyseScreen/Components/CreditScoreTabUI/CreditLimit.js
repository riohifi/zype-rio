import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../../../../../Utils/Assets/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Fonts from '../../../../../Utils/Assets/Fonts';
import ParsedText from 'react-native-parsed-text';
import TabLinearButton from '../TabLinearButton';
import TabNormalButton from '../TabNormalButton';
import Images from '../../../../../Utils/Assets/Images';
import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../../Stores/AnalyseStore';
import moment from 'moment';
import { numberWithCommas } from '../../../../../Utils/Utils';
import Config from '../../../../../Utils/Config';

const CreditLimit = ({ handleUISelect, Styles , catList, setCatLis}) => {

    const allCreditData = AnalyseStore.allCreditData

    const [activeCat, setActiveCat] = useState(0)
    const toggleCatButton = (value) => { setActiveCat(value), getBankList(value) }
  
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

    const getBankList = (catIndex)=>{
        var temArr = []
        var temCat = AnalyseStore.loanCategory
        if(allCreditData && allCreditData !== undefined && temCat !== null){
            var filterData = allCreditData.accounts
            // console.log('filterData', filterData)
            filterData.map((item, i)=>{
                var tempFormat = {}
                tempFormat["bankName"] = item.subscriber_name
                tempFormat["icon_image"] = item.icon_image
                tempFormat["account_number"] = item.account_number
                tempFormat["amount"] = numberWithCommas(item.remaining_amount)
                tempFormat["tag"] = item.tenure
                tempFormat["total_payment"] = item.total_payment
                tempFormat["rate_of_interest"] = item.rate_of_interest
                tempFormat["disburse_date"] = item.disburse_date
                tempFormat["loan_type"] = item.loan_type
                tempFormat["date"] = moment(item.disburse_date).format('MMM YYYY')
                tempFormat["total"] = numberWithCommas(item.loan_amount)
                tempFormat["color"] = i < 1 ? Colors.orange : '#b2fdf4'
                tempFormat["backgroundColor"] =  i < 1 ? 'rgba(244, 103, 90, 0.20465)' : 'rgba(178, 253, 244, 0.20465)'
                tempFormat["overDue"] = item.account_status === "Overdue" ? true : false
                
                temArr.push(tempFormat)
            })
        }
        setBankList(temArr)
    }

    useEffect(()=>{
        getBankList(0)
    },[AnalyseStore.allCreditData])

    const handleNextGo = (val)=>{
        if(allCreditData && allCreditData !== undefined){
            // AnalyseStore.setLoanDetails(allCreditData.accounts[id])
            // handleUISelect(2) 
            const flData = allCreditData?.accounts.filter((fl)=> fl.account_number == val.account_number)
            AnalyseStore.setLoanDetails(flData[0])
            handleUISelect(2) 
        }
        
    }

    return (
        <>
            <View style={{ paddingBottom: wp('20%'), flex: 1, alignItems: 'center' }}>

                <View style={[Styles.row_1, {marginBottom: wp('5%'), backgroundColor: 'rgba(188, 141, 20, 0.33)', borderColor: Colors.yellow50}]}>
                    {/* *********** Row 1 Start ******* */}
                    <TouchableOpacity onPress={() => { handleUISelect(0) }} style={[Styles.row_1_row, { justifyContent: 'flex-start', alignItems: 'flex-end' }]}>
                        <FontAwesome name="angle-left" size={30} color={Colors.white} />
                        <Text style={Styles.row_1_row_text}>{"   "}CREDIT LIMIT</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', position: 'absolute', right: 0 , backgroundColor: 'rgba(255, 201, 7, 1)', paddingHorizontal: 10, borderRadius: wp('5%'), paddingVertical: wp('0.5%')}}>
                            <Text style={[ {textAlign: 'center', color: Colors.black, fontFamily: Fonts.bold, fontSize: wp('3%')}]}>FAIR</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    <Text style={[Styles.row_1_row_btn_text_2, { fontFamily: Fonts.regular, marginLeft: wp('5%'), fontSize: wp('2.6')}]}> Remaining limit of your credit cards</Text>
                    {/* *********** Row 1 end ******* */}
                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('2%') }]}>
                        <View>
                            {/* <ParsedText parse={[{ pattern: /2|4/, style: { fontSize: wp('5%') } }]} style={Styles.row_1_row_btn_text_2}>4 active 2 closed accounts</ParsedText> */}
                            <Text style={[Styles.row_1_row_btn_text_2, { fontFamily: Fonts.regular}]}><Text style={{ fontSize: wp('5%'), fontFamily: Fonts.bold }}>{allCreditData?.total_credit_limit_available}</Text> of your limit is available</Text>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row' }}>
                            <Text style={Styles.row_1_row_btn_text_2}>{allCreditData?.score_status}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* *********** Row 3 End ******* */}

                </View>


                {
                    bankList.map((item, i)=>(
                        <TouchableOpacity onPress={() => { handleNextGo(item) }}  key={i} style={[Styles.row_1, { borderWidth: 0, backgroundColor: Colors.white, marginVertical: wp('2%') }]}>
                        {/* *********** Row 1 Start ******* */}
                        <TouchableOpacity onPress={() => { handleNextGo(item) }} style={[Styles.row_1_row]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{uri: item.icon_image}} style={{ width: 25, height: 25 }} resizeMode='cover' />
                                <Text style={[Styles.row_1_row_text, { fontFamily: Fonts.bold, color: Colors.black}]}>{"   "} {item.bankName} {" "} <Text style={{ fontSize: wp('3%'), fontFamily: Fonts.regular }}>{item.loan_type}</Text></Text>
                            </View>
                            <View>
                                <Text style={[Styles.row_1_row_text, {color: Colors.black, fontSize: wp('3%')}]}>
                                <Text style={{ fontFamily: Fonts.bold, color: Colors.success, fontSize: wp('4%') }}>{item.total_payment}/{item.total_payment}</Text> on time
                                </Text>
                            </View>
                        </TouchableOpacity>
                        {/* *********** Row 1 end ******* */}
                        <TouchableOpacity onPress={() => { handleNextGo(item) }} style={[Styles.row_1_row,]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[Styles.row_1_row_text, { fontSize: wp('3%'), marginLeft: wp('9%'), color: Colors.black }]}>{item.account_number}</Text>
                            </View>
                            <View>
                                <Text style={[Styles.row_1_row_text, { fontSize: wp('3%'), color: Colors.gray60 }]}>max used</Text>
                            </View>
                        </TouchableOpacity>
                        {/* *********** Row 3 Start ******* */}
                        <View style={[Styles.row_1_row, { marginTop: wp('4%') }]}>
                            <View>
                                <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontFamily: Fonts.regular}]}>Last Updated : {moment(item.disburse_date).format('DD MMM YYYY')}</Text>
                            </View>
                            <TouchableOpacity  onPress={() => { handleNextGo(item) }} style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[Styles.row_1_row_btn_text_2, {color: Colors.black, fontFamily: Fonts.regular}]}>Available <Text style={{fontFamily: Fonts.bold, fontSize: item.rate_of_interest ? wp('5%') : wp('3%'), color: '#E55050',}}>{item.rate_of_interest ? `${item.rate_of_interest}%` : ' --'}</Text></Text>
                                <FontAwesome name="angle-right" color={ Colors.black} size={15} />
                            </TouchableOpacity>
                        </View>
                        {/* *********** Row 3 End ******* */}
    
                    </TouchableOpacity>
                    ))
                }

               

            </View>
        </>
    )
}

export default observer(CreditLimit)
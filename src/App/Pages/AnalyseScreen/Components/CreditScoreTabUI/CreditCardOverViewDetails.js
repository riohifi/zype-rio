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

const CreditCardOverViewDetails = ({ handleUISelect, Styles , catList, setCatLis}) => {

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
            // var filterData = allCreditData.accounts.filter((fl)=> fl.loan_type == temCat[catIndex])
            // console.log('filterData', filterData)
            var filterData = [];
            if(temCat[catIndex] === "All"){ filterData = allCreditData.accounts }
            else{ filterData = allCreditData.accounts.filter((fl)=> fl.loan_type == temCat[catIndex]) }
            
            filterData.map((item, i)=>{
                var tempFormat = {}
                tempFormat["bankName"] = item.subscriber_name
                tempFormat["icon_image"] = item.icon_image
                tempFormat["account_number"] = item.account_number
                tempFormat["amount"] = numberWithCommas(item.remaining_amount)
                tempFormat["tag"] = item.tenure
                tempFormat["loan_amount"] = item.loan_amount
                tempFormat["credit_limit"] = item.credit_limit
                tempFormat["loan_type"] = item.loan_type
                tempFormat["remaining_amount"] = item.remaining_amount
                tempFormat["account_status"] = item.account_status
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

                <View style={Styles.row_1}>
                    {/* *********** Row 1 Start ******* */}
                    <TouchableOpacity onPress={() => { handleUISelect(0) }} style={[Styles.row_1_row, { justifyContent: 'flex-start', alignItems: 'flex-end' }]}>
                        <FontAwesome name="angle-left" size={30} color={Colors.white} />
                        <Text style={Styles.row_1_row_text}>{"   "}YOUR CREDIT OVERVIEW</Text>
                    </TouchableOpacity>
                    {/* *********** Row 1 end ******* */}
                    {/* *********** Row 3 Start ******* */}
                    <View style={[Styles.row_1_row, { marginTop: wp('7%') }]}>
                        <View>
                            {/* <ParsedText parse={[{ pattern: /2|4/, style: { fontSize: wp('5%') } }]} style={Styles.row_1_row_btn_text_2}>4 active 2 closed accounts</ParsedText> */}
                            <Text style={[Styles.row_1_row_btn_text_2, {fontFamily: Fonts.regular, fontSize: wp('2.5%')}]}><Text style={{ fontSize: wp('5%') }}>{allCreditData?.active_account_count}</Text> active <Text style={{ fontSize: wp('5%') }}>{allCreditData?.writeOff_account_count !== null ? allCreditData?.writeOff_account_count : '0' }</Text> writeOff <Text style={{ fontSize: wp('5%') }}>{allCreditData?.overdue_account_count !== null ? allCreditData?.overdue_account_count : '0' }</Text> overdue  <Text style={{ fontSize: wp('5%') }}>{allCreditData?.closed_account_count}</Text> closed accounts </Text>
                        </View>
                        
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <Text style={Styles.row_1_row_btn_text_2}>{allCreditData?.credit_limit_status}</Text>
                        </TouchableOpacity>
                    {/* *********** Row 3 End ******* */}

                </View>

                <View style={Styles.row_4}>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        data={catList}
                        renderItem={renderCatItem}
                        keyExtractor={(item, i) => i}
                    />
                </View>

                {
                    bankList.map((item, i)=>(
                        <TouchableOpacity onPress={() => { handleNextGo(item) }}  key={i} style={[Styles.row_1, { borderWidth: 0, backgroundColor: i < 1 ? Colors.orange : Colors.white, marginVertical: wp('2%') }]}>
                        {/* *********** Row 1 Start ******* */}
                        <TouchableOpacity onPress={() => { handleNextGo(item) }} style={[Styles.row_1_row]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={{uri: item.icon_image}} style={{ width: 25, height: 25 }} resizeMode='cover' />
                                <Text style={[Styles.row_1_row_text, { fontFamily: Fonts.bold, color: i < 1 ? Colors.white : Colors.black}]}>{"   "} {item.bankName} {" "} <Text style={{ fontSize: wp('3%'), fontFamily: Fonts.regular }}>{item.loan_type}</Text></Text>
                            </View>
                            <View>
                                <Text style={[Styles.row_1_row_text, { fontFamily: Fonts.bold, color: i < 1 ? Colors.white : Colors.black }]}>{Config.currency} {item.loan_type === 'Credit Card'? numberWithCommas(item.credit_limit) : numberWithCommas(item.loan_amount)}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* *********** Row 1 end ******* */}
                        <TouchableOpacity onPress={() => { handleNextGo(item) }} style={[Styles.row_1_row,]}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[Styles.row_1_row_text, { fontSize: wp('3%'), marginLeft: wp('9%'), color: i < 1 ? Colors.white : Colors.black }]}>{item.account_number}</Text>
                            </View>
                            <View>
                                <Text style={[Styles.row_1_row_text, { fontSize: wp('3%'), color: i < 1 ? Colors.white : Colors.black }]}>{item.date}</Text>
                            </View>
                        </TouchableOpacity>
                        {/* *********** Row 3 Start ******* */}
                        <View style={[Styles.row_1_row, { marginTop: wp('4%') }]}>
                            <View>
                                <Text style={[Styles.row_1_row_btn_text_2, {color: i < 1 ? Colors.white : Colors.black}]}><FontAwesome name="flag" color={i < 1 ? Colors.white : Colors.black} size={10} /> {"  "} {item.account_status}</Text>
                            </View>
                            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[Styles.row_1_row_btn_text_2, {color: i < 1 ? Colors.white : Colors.black}]}>Remaining : {numberWithCommas(item.remaining_amount)}</Text>
                                <FontAwesome name="angle-right" color={ i < 1 ? Colors.white : Colors.black} size={15} />
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

export default observer(CreditCardOverViewDetails)
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import AntDesign from 'react-native-vector-icons/AntDesign'
import JoinListItem from '../Components/JoinListItem';
import { Image } from 'react-native-svg';
import NavigationService from '../../../../Utils/NavigationService';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { BarChart, PieChart } from "react-native-chart-kit";
import Config from '../../../../Utils/Config';
import { numberWithCommas, round } from '../../../../Utils/Utils';
import { observer } from 'mobx-react-lite';
import BarChartComponent from '../Components/BarChartComponent';
import AnalyseStore from '../../../../Stores/AnalyseStore';

import _ from 'lodash'
import { useToast } from "react-native-toast-notifications";

const BudgetChallengeDetailsScreen = (props) => {

    const data = props.route.params?.data
    var allAnalyseData = AnalyseStore.allAnalyseData

    const toast = useToast();

    console.log('data==', data)

    const [joinList] = useState([
        { title: "I will spend 30% less on eating out ", desc: 'Nothing beats a home cooked meal. Save money by cooking at home', tag: "#Zypeinsights", icon: Image.bg_1, color: Colors.orange, backgroundColor: 'rgba(233, 69, 120, 0.2)' },
    ])
    const [dates, setDates] = useState([])

    // *************** Filter category Chart data Func *********
    const [dataRaw, setDataRaw] = useState([]) 
    const filterCatData = (value)=>{
        let tempFormat = []
            var getValue = allAnalyseData?.expenses?.monthly_expenses
            for (var i = getValue?.length; i >= 0; i--) { 
                // console.log(getValue[i]?.total_expense);
                if(getValue[i]?.total_expense !== undefined){
                    if(i === 0)
                    {tempFormat.push({ value: getValue[i].total_expense, month: getValue[i].month , svg: { fill: 'url(#gradientTwo)'}})}
                    else{
                        tempFormat.push({ value: getValue[i].total_expense, month: getValue[i].month })
                    }
                }
             } 
        setDataRaw(tempFormat)
    }
    
    const setDate = ()=>{
        var tempArr = []
        var monthData = allAnalyseData?.expenses?.monthly_expenses
        if(monthData !== undefined && monthData.length > 0){
            monthData.map((item, i)=>{
                tempArr.push(`${item.month} '${item.year}`)
            })
        }
        // var a = _.groupBy(tempArr, function(n) { return n; });
        //   const keys = Object.keys(a)
        setDates(tempArr)
    }

    // ************** Net Worth ***************
const [netWorth, setNetWorth] = useState(0)
const [spendAmount, setSpendAmount] = useState(0)
const [lastMonthAmount, setLastMonthAmount] = useState(0)
const [totalExpense, setTotalExpense] = useState(0)
// ************** Net Worth End ***************
const calculateNetWorth = ()=>{
    var totalWorth = allAnalyseData?.accounts.map(item => item.amount).reduce((prev, next) => prev + next);
    setNetWorth(totalWorth)

    if(allAnalyseData?.expenses?.monthly_expenses.length > 0){
        setSpendAmount(allAnalyseData?.expenses?.monthly_expenses[0]?.category_expense?.[data?.category])
        setLastMonthAmount(allAnalyseData?.expenses?.monthly_expenses[1]?.category_expense?.[data?.category])
    }
        
}

    useEffect(()=>{
        filterCatData(0)
        setDate()
        calculateNetWorth()
    },[AnalyseStore.allAnalyseData])

    const joinNow = async()=>{
        var formData = {
            customer_id: "1032",
            challenge_id: data.id,
            amount: data.challenge_amount
        }
        await AnalyseStore.postJoinData(formData)
        // console.log('formData', formData)
        toast.show("Join Successfully", {type: 'success', placement: 'bottom'});
        await AnalyseStore.getAllAnalyseData()
        NavigationService.goBack()
    }

    return (
        <SafeAreaView style={Styles.body}>
            <LinearGradient
                colors={[Colors.primary, Colors.black30]}
                style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
            >
                {
                    data !== undefined ?
                
                <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>

                    {/* **********  Section One ********** */}
                    <TouchableOpacity style={[Styles.row_2,]} onPress={() => NavigationService.goBack()}>
                        <View style={[Styles.row_1_col, { flex: 3 }]}>
                            <Text style={Styles.row_2_col_text}>
                                <AntDesign name="left" style={[{ color: Colors.white }]} size={wp('6%')} />
                                {"   "} Budget Challenge! </Text>
                        </View>
                    </TouchableOpacity>
                    {/* **********  Section One  end********** */}
                    {/* **********  Section 2  start********** */}
                    <View style={Styles.section}>
                        <JoinListItem item={data} bodyStyle={{ width: wp('90%') }} isIAmIn={false} />
                    </View>
                    {/* **********  Section 2  end********** */}
                    {/* **********  Section 3  start********** */}
                    <View style={Styles.section}>
                        <View style={Styles.row_4}>
                            <View style={Styles.row_4_col_1}>
                                <View>
                                    <Text style={Styles.row_4_col_1_text_1}>You spent an average of </Text>
                                    <Text style={Styles.row_4_col_1_text_3}>(in the last 6 months) </Text>
                                </View>
                                <View>
                                    <Text style={[Styles.row_4_col_1_text_2, { color: Colors.orange }]}>{Config.currency} {numberWithCommas(data.current_amount)} </Text>
                                </View>
                            </View>
                            <View style={Styles.row_4_col_1}>
                                <View>
                                    <Text style={Styles.row_4_col_1_text_1}>You spent an average of </Text>
                                </View>
                                <View>
                                    <Text style={[Styles.row_4_col_1_text_2, { color: Colors.success }]}>{Config.currency} {numberWithCommas(data.challenge_amount)}</Text>
                                </View>
                            </View>
                        </View>
                        <Text style={[Styles.row_4_col_1_text_3, { color: Colors.cyan, marginVertical: wp('2%') }]}>We will notify you if & when you are nearing the limit</Text>
                    </View>
                    {/* **********  Section 3  end********** */}

                    {/* **********  Section 4  start********** */}
                    <View style={Styles.section}>
                        <View style={Styles.row_6}>
                            <View style={[Styles.row_6_col, { flex: 2 }]}>
                                <Text style={[Styles.row_6_col_text_2,]}>Total spent on {data?.category}</Text>
                                <Text style={[Styles.row_6_col_text]}>{Config.currency}{numberWithCommas(spendAmount)}  <Text style={[Styles.row_6_col_text_2, { color: Math.round((spendAmount - lastMonthAmount)/lastMonthAmount*100) > 0 ? Colors.orange : Colors.success, flexDirection: 'row', alignItems: 'center' }]}> <MaterialCommunityIcons name="trending-up" />  {round(Math.round((spendAmount - lastMonthAmount)/lastMonthAmount*100), 2)}%</Text></Text>

                            </View>
                            {/* <View style={Styles.row_6_col_2}>
                                <SelectDropdown
                                    data={dates}
                                    defaultValueByIndex={0}
                                    defaultValue={dates[dates.length-1]}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                    }}
                                    defaultButtonText={'Select Date'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    buttonStyle={Styles.dropdown1BtnStyleMid}
                                    buttonTextStyle={Styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#fff'} size={11} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={Styles.dropdown1DropdownStyle}
                                    rowStyle={Styles.dropdown1RowStyle}
                                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                                />
                            </View>
                        */}
                        </View>
                    </View>
                    {/* **********  Section 4  end********** */}
                    {/* *************** Row 6 Start Chart 1 ************* */}
                    <View style={Styles.row_5}>
                    <BarChartComponent dataRaw={dataRaw} data={allAnalyseData?.expenses} />
                        {/* <BarChart
                            data={{
                                labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                                legend: ["L1", "L2", "L3"],
                                datasets: [
                                    { data: [60, 45, 30, 15, 0] }
                                ]
                            }}
                            width={Dimensions.get("window").width - 40} // from react-native
                            height={220}
                            yAxisLabel={'\u20B9'}
                            yAxisSuffix="k"
                            chartConfig={{
                                fillShadowGradientFrom: '#13B1E0',
                                fillShadowGradientTo: '#0487C9',
                                fillShadowGradientFromOpacity: 1,
                                fillShadowGradientToOpacity: 0.8,
                                strokeWidth: 0,
                                backgroundColor: "transparent",
                                // backgroundGradientFrom: "#fb8c00",
                                // backgroundGradientTo: "#ffa726",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                // formatYLabel: (f) => {console.log('444', f); return f},
                                propsForLabels: { fontFamily: Fonts.regular, fontSize: wp('3%') },
                            }}
                            style={{
                                borderRadius: 16,
                            }}
                            // withInnerLines={false}
                            withOuterLines={false}
                            withShadow={false}
                            showBarTops={false}
                        // yLabelsOffset={0}
                        /> */}
                    </View>
                    {/* *************** Row 6 End Chart 1 ************* */}

                    {/* *************** Row 7 Start ************* */}
                    <View style={Styles.section}>
                        <TouchableOpacity onPress={()=>{joinNow()}}>
                            <LinearGradient
                                start={{ x: 0.0, y: 0.9 }} end={{ x: 0.8, y: 0.0 }}
                                locations={[0, 0.0, 0.8]}
                                style={Styles.btn}
                                colors={[Colors.cyan, Colors.cyan20, Colors.cyan30]}
                            >
                                <Text style={Styles.row_3_col_row_text_3}> Join now</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {/* *************** Row 7 end ************* */}

                    <View style={{ marginBottom: wp('20%') }}></View>
                </ScrollView>
                :
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontFamily: Fonts.extraBold, fontSize: wp('8%'),  color: Colors.white}}>Empty</Text>

                    <TouchableOpacity onPress={()=> NavigationService.goBack()} style={{marginVertical: wp('10%'), borderWidth: 1, borderColor: Colors.white, borderRadius: wp('7%'), paddingHorizontal: wp('15%'), paddingVertical: wp('1%')}}>
                        <Text style={{fontFamily: Fonts.bold, fontSize: wp('5%'), color: Colors.white}}>Back</Text>
                    </TouchableOpacity>
                </View>
            }
            </LinearGradient>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    body: { backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' },

    section: { paddingVertical: wp('2%'), flex: 1, alignItems: 'center' },

    row_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('2%') },
    row_1_col: { flex: 1 },
    row_1_col_text: { fontFamily: Fonts.italic, fontSize: wp('2.5%'), color: Colors.gray40, textAlign: 'right' },

    row_2: { flexDirection: 'row', alignItems: 'center', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginBottom: wp('1%') },
    row_2_col: { flex: 1 },
    row_2_col_text: { fontFamily: Fonts.bold, fontSize: wp('5%'), color: Colors.white, },
    row_2_col_text_2: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.cyan30, textAlign: 'right' },

    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%'), },
    row_3_col: { width: wp('75%'), marginHorizontal: wp('2%'), borderColor: Colors.white, borderRadius: wp('7%'), marginVertical: wp('3%'), flex: 1 },
    row_3_col_row: { marginTop: wp('5%'), paddingHorizontal: wp('5%') },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('4%'), textAlign: 'center' },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4.5%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('4.0%'), paddingVertical: wp('0%'), textAlign: 'center', width: wp('90%') },
    row_3_col_row_text_4: { color: Colors.gray30, fontFamily: Fonts.regular, fontSize: wp('3.5%'), paddingVertical: wp('4%') },
    row_3_col_row_img: { width: wp('8%') },

    row_4: { flex: 1, paddingHorizontal: wp('5%'), paddingVertical:wp('3%'), backgroundColor: Colors.black30, width: wp('90%'), borderRadius: wp('5%') },
    row_4_col_1: { justifyContent: 'space-between', flexDirection: 'row', marginVertical: wp('0%'), alignItems: 'center' },
    row_4_col_1_text_1: { fontFamily: Fonts.bold, fontSize: wp('3.5%'), color: Colors.white },
    row_4_col_1_text_2: { fontFamily: Fonts.bold, fontSize: wp('6%'), color: Colors.black },
    row_4_col_1_text_3: { fontFamily: Fonts.italic, fontSize: wp('3%'), color: Colors.gray60, textAlign: 'left' },

    row_5: { flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },

    row_6: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('0%') },
    row_6_col: { flex: 1, },
    row_6_col_2: { flex: 0.9 },
    row_6_col_text: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.white, textAlign: 'left' },
    row_6_col_text_2: { fontFamily: Fonts.regular, fontSize: wp('3.5%'), color: Colors.gray30, textAlign: 'left' },

    btn: { flexDirection: 'row', backgroundColor: Colors.white, width: wp('90%'), paddingVertical: wp('3%'), borderRadius: wp('3%'), alignItems: 'center', alignSelf: 'center' },

    divider: { paddingVertical: 0.2, backgroundColor: Colors.gray, flex: 1, width: wp('100%') },

    dropdown1BtnStyle: {
        width: '45%',
        height: 20,
        backgroundColor: '#FFF',
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnStyleLg: {
        width: '50%',
        height: 40,
        backgroundColor: '#FFF',
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnStyleMid: {
        width: wp('25%'),
        height: 30,
        backgroundColor: Colors.black,
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnStyleMid_new: {
        width: wp('25%'),
        height: 30,
        backgroundColor: Colors.black,
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnStyleSm: {
        width: '30%',
        height: 20,
        backgroundColor: '#FFF',
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dropdown1BtnTxtStyle: { color: '#FFF', textAlign: 'left', fontSize: wp('3.2%'), fontFamily: Fonts.regular, marginHorizontal: 2 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: wp('4%'), fontFamily: Fonts.regular },

})

export default observer(BudgetChallengeDetailsScreen)
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, ImageBackground , Image, ScrollView, Switch} from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Images from '../../../../Utils/Assets/Images';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import LinearGradient from 'react-native-linear-gradient';
import SelectDropdown from 'react-native-select-dropdown';
import Fonts from '../../../../Utils/Assets/Fonts';
import BankItem from '../Components/BankItem';
import SuggestItem from '../Components/SuggestItem';
import TabLinearButton from '../Components/TabLinearButton';
import TabNormalButton from '../Components/TabNormalButton';
import { BarChart, PieChart } from "react-native-chart-kit";
import JoinListItem from '../Components/JoinListItem';
import ChallengeItem from '../Components/ChallengeItem';
import PaymentItem from '../Components/PaymentItem';
import StoryItem from '../Components/StoryItem';
import NavigationService from '../../../../Utils/NavigationService';
import GlobalModal from '../../../../Utils/Components/GlobalModal'

import {BlurView} from '@react-native-community/blur';

import BarChartComponent from '../Components/BarChartComponent'

import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts'
import { getBankIcon, numberWithCommas, getPaymentIcon , getLastDigit, random_rgba, pickColor} from '../../../../Utils/Utils';
import moment from 'moment';
import Config from '../../../../Utils/Config';
import Carousel from 'react-native-snap-carousel';
import PieChartComponent from '../Components/PieChartComponent';
import { useFocusEffect, useIsFocused } from '@react-navigation/core';


const MyAccountTabs = () => {

    // ************************* Call Api ***********************

    var allAnalyseData = AnalyseStore.allAnalyseData

    const categoryRef = useRef()
    // console.log("%%%%%%", allAnalyseData)
// ************************* Call Api End ***********************

    const [viewRef, setViewRef] = useState(null);
    const monthRef = useRef(null);

    const [dates, setDates] = useState(["June ‘22 ", "July ‘22 "])
    const [months, setMonths] = useState([])

    const [isRow2Opened, setIsRow2Opened] = useState(false)
    const handleIsRow2Opened = ()=>{setIsRow2Opened(!isRow2Opened)}

    const [bankList, setBankList] = useState([
        {bankName: "--", amount: "--", tag: "AA", date: "15th July 2022", icon: Images.hdfc, color: Colors.cyan},
        {bankName: "--", amount: "--", tag: "AA", date: "15th July 2022", icon: Images.icici, color: Colors.orange},
    ])
    const renderItem = ({ item }) => ( <BankItem item={item} /> );

    const [activeCat, setActiveCat] = useState(0)
    const [selectCatIndex, setSelectCatIndex] = useState(0)
    const toggleCatButton = (value)=>{setActiveCat(value); filterCatData(value);}
    const [catList, setCatList] = useState([ "All"])
    

    const CategorySectionUi = (catIndex, activeCat, category)=>{
        if(activeCat === catIndex){
            return <TabLinearButton
            title={category}
            buttonStyle={Styles.row_4_catItem}
            textStyle={Styles.row_4_catItem_text}
            tabValue={catIndex}
            colorGradient={[Colors.orange, Colors.orange20, Colors.orange30]}
            handleAction={toggleCatButton} />
        }else{
            return <TabNormalButton
            title={category}
            buttonStyle={[Styles.row_4_catItem, { backgroundColor: Colors.primary ,}]}
            tabValue={catIndex}
            textStyle={[Styles.row_4_catItem_text, { fontFamily: Fonts.regular }]}
            handleAction={toggleCatButton}
        />
        }
    }
    const renderCatItem = ({ item, index }) => ( CategorySectionUi(index, activeCat, item) );

    const [suggestList, setSuggestList] = useState([
        {title: " ", desc: 'You seemed to have spent 20% more on dining than last month', tag: "#Zypeinsights", icon: Images.color_bd_1, color: [Colors.cyan, Colors.cyan20, Colors.cyan30]},
        {title: "Taj Hotels", desc: 'You seemed to have spent 20% more on dining than last month ', tag: "Taj Hotels", icon: Images.color_bd_2, color: [Colors.orange, Colors.orange20, Colors.orange10]},
    ])
    const renderSuggestItem = ({ item }) => ( <SuggestItem item={item} /> );

    const [pieData, setPieData] = useState([]);
    const [pieNewData, setNewPieData] = useState([]);
    const [pieNewCategory, setNewPieCategory] = useState([]);

      const [joinList, setJoinList] = useState([
        {
                    id: '', 
                    title: '', 
                    desc: '', 
                    color: '', 
                    category: '',
                    challenge_amount: 0,
                    current_amount: 0,
                    count: 0,
                    percentage: 0,
                    backgroundColor: ''
        }
    ])
    const renderJointItem = ({ item, index }) => ( <JoinListItem item={item} isIAmIn={true} index={index}  /> );

    const [challengeList, setChallengeList] = useState([
        {circle: true, title: "Limit fashion shopping", color: ['rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.092824)'], buttonText: '🙌 GOING GOOD'},
        {circle: false, title: "No drink november", color: ['rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.092824)'], buttonText: '🤙 COMPLETED'},
    ])
    const renderChallengeItem = ({ item, index }) => ( <ChallengeItem item={item} index={index} /> );

    const [paymentList, setPaymentList] = useState([
        {title: "Rent", date: '22 April', amount: '₹ 20,000', icon: Images.car},
        {title: "Electricity Bill", date: '22 April', amount: '₹ 2,000', icon: Images.light},
        {title: "Mobile Re.", date: '22 April', amount: '₹ 999', icon: Images.light},
    ])
   
    const [storyList, setStoryList] = useState([
        {title: "5 Women on things they wish they knew about finances sooner", color: ['rgba(247, 122, 91, 0)', 'rgba(247, 122, 91, 0.632824)', '#F77A5B'], by: 'Oct 26, 2021 - Marsha Barnes', image: null},
        {title: "5 Women on things they wish they knew about finances sooner", color: ['rgba(66, 205, 236, 0)', 'rgba(113, 229, 255, 0.632824)', '#1c96b1'], by: 'Oct 26, 2021 - Marsha Barnes', image: null},
    ])
    const renderStoryItem = ({ item }) => ( <StoryItem item={item} /> );
    

    const [isEnabled, setIsEnabled] = useState(true);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
// ************** Net Worth ***************
const [netWorth, setNetWorth] = useState(0)
const [spendAmount, setSpendAmount] = useState(0)
const [lastMonthAmount, setLastMonthAmount] = useState(0)
const [totalExpense, setTotalExpense] = useState(0)
// ************** Net Worth End ***************
const calculateNetWorth = ()=>{
    var totalWorth = allAnalyseData?.accounts.map(item => item.amount).reduce((prev, next) => prev + next);
    setNetWorth(totalWorth)

    /* if(allAnalyseData?.accounts.length > 0){
        setSpendAmount(allAnalyseData?.accounts[0]?.amount)
        setLastMonthAmount(allAnalyseData?.accounts[1]?.amount)
    } */

    if(allAnalyseData?.expenses?.monthly_expenses.length > 0){
        setSpendAmount(allAnalyseData?.expenses?.monthly_expenses[0]?.total_expense)
        setLastMonthAmount(allAnalyseData?.expenses?.monthly_expenses[1]?.total_expense)
    }
        
}
// *************** Filter category Chart data Func *********
    const [dataRaw, setDataRaw] = useState([]) 
    const filterCatData = (value)=>{
        
        let tempFormat = []
        if(catList[value] === "All"){
            // allAnalyseData?.expenses
            // .monthly_expenses
            // .map((item, i)=>{
            //     if(i === (allAnalyseData?.expenses.monthly_expenses.length - 1 )){ tempFormat.push({ value: item.total_expense, month: item.month,  svg: { fill: 'url(#gradientTwo)', } }) }
            //     else{tempFormat.push({ value: item.total_expense, month: item.month })}
            // })
            var getValue = allAnalyseData?.expenses?.monthly_expenses.slice(0,5)
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
        }
        else{
            // allAnalyseData?.expenses
            // .monthly_expenses
            // .map((item, i)=>{
            //     if(i === (allAnalyseData?.expenses.monthly_expenses.length - 1 )){ tempFormat.push({ value: item.category_expense[catList[value]], month: item.month,  svg: { fill: 'url(#gradientTwo)', } }) }
            //     else{tempFormat.push({ value: item.category_expense[catList[value]], month: item.month })}
            // })
            var getValue = allAnalyseData?.expenses?.monthly_expenses.slice(0,5)
            for (var i = getValue?.length; i >= 0; i--) { 
                // console.log(getValue[i]?.total_expense);
                if(getValue[i]?.total_expense !== undefined){
                    if(i == 0)
                    {
                        tempFormat.push({ value: getValue[i].category_expense[catList[value]], month: getValue[i].month , svg: { fill: 'url(#gradientTwo)'}});
                    }
                    else{
                        tempFormat.push({ value: getValue[i].category_expense[catList[value]], month: getValue[i].month })
                    }
                }
             }
        }
        
        setDataRaw(tempFormat)
    }
// *************** Filter category Chart data Func End *********
// *************** Filter Account data Func End *********
    const formatAccount = ()=>{
        const tempFormat = {}
        const tempArr = []
        allAnalyseData?.accounts.map((item)=>{
            tempFormat["bankName"] = item.bank_name
            tempFormat["amount"] = numberWithCommas(item.amount)
            tempFormat["tag"] = allAnalyseData?.source_type
            tempFormat["date"] = moment(item.updated_at).format('Do MMMM YYYY')
            tempFormat["icon"] = getBankIcon(item.icon_url)
            tempFormat["icon_image"] = (item.icon_image)
            tempFormat["color"] = Colors.orange
            tempArr.push(tempFormat)
        })
        setBankList(tempArr)
    }
// *************** Filter Account data Func End *********

 // ***************** Join Challenges ***********
    const formatJoinChallenges = ()=>{
        const tempArr = []
        allAnalyseData?.joined_challenges.map((item, i)=>{
            const tempFormat = {};
            tempFormat['title'] = item.name;
            tempFormat['circle'] = item.active;
            tempFormat['buttonText'] = item.status;
            tempFormat['buttonText'] = item.status;
            tempFormat['description'] = item.description;
            tempFormat['days_left'] = item.days_left;
            tempFormat['amount_left'] = item.amount_left;
            tempFormat['active'] = item.active;
            tempFormat['is_completed'] = item.is_completed;
            tempFormat['color'] = ['rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.032824)', 'rgba(32, 165, 165, 0.092824)'];
            tempArr.push(tempFormat)
        });
        setChallengeList(tempArr)
    }
    // ************** Total Expense **************
    const formatPayment = ()=>{
        const tempArr = []
        allAnalyseData?.recurring_payments.slice(0, 3).map((item)=>{
            const tempFormat = {}
            tempFormat['amount'] = numberWithCommas(item.amount, 2)
            tempFormat['title'] = item.name
            tempFormat['id'] = item?.id
            tempFormat['icon_image'] = item.icon_image
            tempFormat['date'] = moment(item.bill_date).format('DD MMMM')
            tempFormat['icon'] = getPaymentIcon(item.icon_url)
            tempFormat['bill_date'] = moment(item.bill_date).format('DD MMMM')
            tempArr.push(tempFormat)
        });
        setPaymentList(tempArr)
    }

    // ************* getZypeInsight Func *************
    const getZypeInsight = ()=>{
        var tempArr = []
        var ZypeInsight = allAnalyseData?.zype_insights
        if(ZypeInsight !== undefined && ZypeInsight.length > 0){
        ZypeInsight.map((item, i)=>{
            tempArr.push({title: '', desc: item, tag: '#Zypeinsights', color: (i%2) !== 1 ? [Colors.cyan, Colors.cyan20, Colors.cyan30] : [Colors.orange, Colors.orange20, Colors.orange10], icon: (i%2) !== 1 ? Images.color_bd_1 : Images.color_bd_2, })
            })
        }
        setSuggestList(tempArr) 
    }

    // ************* joinListFunc Func *************
    const joinListFunc = ()=>{
        var tempArr = []
        var joinData = allAnalyseData?.ongoing_challenge
        if(joinData !== undefined && joinData.length > 0){
            joinData.map((item, i)=>{
                tempArr.push({
                    title: item.name, 
                    desc: item.description, 
                    color: (i%2) !== 1 ? Colors.orange : Colors.cyan, 
                    category: item.category,
                    challenge_amount: item.challenge_amount,
                    current_amount: item.current_amount,
                    count: item.count,
                    id: item.id,
                    percentage: item.percentage,
                    backgroundColor: (i%2) !== 1 ? 'rgba(233, 69, 120, 0.2)' : 'rgba(34, 189, 225, 0.2)'
                })
            })
        }
        setJoinList(tempArr)
    }

    // ************* setStoryListFunc Func *************
    const setStoryListFunc = ()=>{
        var tempArr = []
        var storyData = allAnalyseData?.zype_stories
        if(storyData !== undefined && storyData.length > 0){
            storyData.map((item, i)=>{
                tempArr.push({
                    title: item.title, 
                    color: (i%2) !== 1 ? ['rgba(247, 122, 91, 0)', 'rgba(247, 122, 91, 0.632824)', '#F77A5B'] : ['rgba(66, 205, 236, 0)', 'rgba(113, 229, 255, 0.632824)', '#1c96b1'], 
                    by: '', 
                    image: item.image_data,
                    web_url: item.web_url
                })
            })
        }
        setStoryList(tempArr)
    }

    // ************* setMonthsFunc Func *************
    const setMonthsFunc = ()=>{
        var tempArr = []
        var tempArr2 = []
        var monthData = allAnalyseData?.expenses?.monthly_expenses
        if(monthData !== undefined && monthData.length > 0){
            monthData.map((item, i)=>{
                tempArr.push(item.month)
                tempArr2.push(item.year)
            })
        }
        setMonths(tempArr)
        setDates(tempArr2)
    }

    // ************* setMonthsFunc Func *************
    const setPieDataFunc = (index)=>{
        var monthData = allAnalyseData?.expenses?.monthly_expenses
       if(monthData !== undefined && monthData.length > 0){
            var temData = monthData[index]
            // console.log('temData', temData)
            const keys = Object.keys(temData?.category_expense)
            const tempArr = []
            if(keys.length > 0){
                keys.map((item, i)=>{
                    if(temData?.category_expense[item] > 0)
                        {tempArr.push({
                            name: ` ( ${item} ) `,
                            population: temData?.category_expense[item],
                            legendFontColor: "#fff",
                            legendFontSize: wp('3.5%'),
                            color: pickColor(i),
                        })}
                })
            }
            // console.log('catList', catList)
            const catArr = []
            const catAmount = []
            const tempCat = []
            allAnalyseData?.top_categories.map((item)=>{ tempCat.push(item) })
            tempCat.push("Others")

            tempCat.map((item, i)=>{
                var tempKey = keys.filter((fl)=> fl == item)
                if(tempKey.length > 0){ 
                    catArr.push(tempKey[0])
                    catAmount.push(temData.category_expense[tempKey[0]])
                }
            })
            // console.log('tempArr', catArr)
            // console.log('catAmount', catAmount)
            setPieData(tempArr)
            setNewPieData(catAmount)
            setNewPieCategory(catArr)
        }
        
    }

    const checkIsNull = ()=>{
        if(allAnalyseData === null){ setIsEnabled(false) }
    }

    const isFocused = useIsFocused();
   
    useEffect(()=>{
        // Load Category From Server
        
        if(allAnalyseData !== null && allAnalyseData !== ''){
            var tempCat = ["All"]
            allAnalyseData?.top_categories.map((item)=>{ tempCat.push(item) })
            tempCat.push("Others")
            setCatList(tempCat)  
        
        // ************* getZypeInsight *************
        getZypeInsight()
        // ************** Net Worth Func ***************
        calculateNetWorth()
        // ******** Filter category Chart data
        filterCatData(0)
        // *************** Filter Account data Func  *********
        formatAccount()
        // ***************** Join Challenges ***********
        formatJoinChallenges()
        // ***************** Join Challenges ***********
        setTotalExpense(numberWithCommas(allAnalyseData?.total_recurring_expense, 2))

        // ************** Total Expense **************
        formatPayment();

        // ************** joinListFunc **************
        joinListFunc();

        // ************** setStoryListFunc **************
        setStoryListFunc();
        // ************** setMonthsFunc **************
        setMonthsFunc();
        // ************** setPieDataFunc **************
        setPieDataFunc(0);
        }
        else{
            if(isFocused){ checkIsNull() }
        }

    },[AnalyseStore.allAnalyseData, isFocused])

    const navClickBudgetChallengeDetailsScreen = (index)=>{
        if(joinList.length > 0)
            NavigationService.navigate("BudgetChallengeDetailsScreen", {data: joinList[index]})
    }
    
// console.log('lastMonthAmount', lastMonthAmount)
    return (
        <>
        <View style={{paddingBottom: 60, flex: 1, width: wp('100%'), alignItems: 'center'}}>
        {/* ************* Row 1 Start ************ */}
        {/* <View style={Styles.row_1}>
            <View style={Styles.row_1_col}>
                <SelectDropdown
                    data={dates}
                    defaultValueByIndex={0}
                    // defaultValue={'Egypt'}
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
                    buttonStyle={Styles.dropdown1BtnStyleMid_new}
                    buttonTextStyle={Styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={11} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={Styles.dropdown1DropdownStyle}
                    rowStyle={Styles.dropdown1RowStyle}
                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                />
            </View>
            <View style={[Styles.row_1_col, { flex: 2 }]}>
                <Text style={Styles.row_1_col_text}>last updated on : 15th July 2022</Text>
            </View>
        </View> */}
        {/* ************* Row 1 End ************ */}
        {/* ************* Row 2 Start ************ */}
        
            <View style={[Styles.row_2, {marginVertical: wp('2%')}]}>
                <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.row_2_col_text}> Net Worth  </Text>
                    <TouchableOpacity onPress={handleIsRow2Opened}>
                        <FontAwesome name={isRow2Opened ? 'chevron-up' : 'chevron-down'} color={Colors.white} size={wp('5')} />
                    </TouchableOpacity>
                </View>
                <View style={[Styles.row_1_col]}>
                    <Text style={Styles.row_2_col_text_2}>{Config.currency} {numberWithCommas(netWorth)}</Text>
                </View>
            </View>
        {/* ************* Row 2 End ************ */}
        <View style={Styles.divider}></View>
        
        {/* ************* Row 3 Start ************** */}
        {!isRow2Opened &&
        <View style={Styles.row_3}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={bankList}
                renderItem={renderItem}
                keyExtractor={(item, i) => i}
            />
        </View>}
        {/* ************* Row 3 End ************** */}

            {/* ************* Row 4 Start ************ */}
        
            <View style={[Styles.row_2,]}>
                <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.row_2_col_text}> Your spend trend  </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    <Text style={[Styles.row_2_col_text_2, { color: Colors.orange}]}>{Config.currency} {numberWithCommas(spendAmount)}</Text>
                </View>
            </View>
        {/* ************* Row 4 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999a9a'}]}></View>
        
        {/* *************** Row 5 Start ************* */}
        <View style={Styles.row_4}>
            {/* <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={catList}
                renderItem={renderCatItem}
                keyExtractor={(item, i) => i}
            /> */}
            {selectCatIndex > 0 && <TouchableOpacity onPress={()=>{categoryRef.current.snapToPrev()}} style={{position: 'absolute', left: 3, alignSelf: 'center'}}>
                <AntDesign name="left" style={[ { color: Colors.white}]} size={wp('5%')} />
            </TouchableOpacity>}
            <Carousel
                  layout={"default"}
                  ref={categoryRef}
                  data={catList}
                  sliderWidth={wp('30%')}
                  itemWidth={wp('32%')}
                  renderItem={renderCatItem}
                  loopClonesPerSide={1}
                  onSnapToItem = { index => setSelectCatIndex(index) } />

           {((catList.length/3)-1) >= selectCatIndex && <TouchableOpacity onPress={()=>{categoryRef.current.snapToNext()}} style={{position: 'absolute', right: 3, alignSelf: 'center'}}>
                <AntDesign name="right" style={[{ color: Colors.white}]} size={wp('5%')} />
            </TouchableOpacity>}
        </View>
        {/* *************** Row 5 End ************* */}

        {/* *************** Row 6 Start Chart 1 ************* */}
        <View style={Styles.row_5}>
           
           <View style={{ height: 0, paddingHorizontal: 20, flexDirection: 'row' }}>
               
                {/* <View style={{ flex: 1, marginLeft: 10, flexDirection: 'row' }}>
                <BarChart
                data={{
                labels: ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan"],
                legend: ["L1", "L2", "L3"],
                datasets: [
                    { data: [ 60, 45, 30, 15, 0] }
                ]
                }}
                
                width={Dimensions.get("window").width-40} // from react-native
                height={220}
                yAxisLabel={'\u20B9'}
                yAxisSuffix="k"
                chartConfig={{
                    fillShadowGradientFrom:'#13B1E0',
                    fillShadowGradientTo:'#0487C9',
                    fillShadowGradientFromOpacity:1,
                    fillShadowGradientToOpacity:0.8,
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
                    propsForLabels: {fontFamily: Fonts.regular, fontSize: wp('3%')},
                }}
                style={{
                borderRadius: 16,
                marginLeft: wp('-25%'),
                }}
                // withInnerLines={false}
                withOuterLines={false}
                withShadow={false}
                showBarTops={false}
                withHorizontalLabels={false}
                // yLabelsOffset={wp('-85%')}
                showValuesOnTopOfBars={false}
            />
                </View> */}
                {/* <YAxis
                    data={data}
                    style={{ marginBottom: xAxisHeight }}
                    contentInset={verticalContentInset}
                    svg={axesSvg}
                    numberOfTicks={10}
                /> */}
            </View>
            <BarChartComponent dataRaw={dataRaw} data={allAnalyseData?.expenses} activeCat={activeCat} catList={catList} />
            </View>
        {/* *************** Row 6 End Chart 1 ************* */}

        {/* ************* Row 7 Start ************** */}
        <View style={Styles.row_3}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={suggestList}
                renderItem={renderSuggestItem}
                keyExtractor={(item, i) => i}
            />
        </View>
        {/* ************* Row 7 End ************** */}

            {/* ************* Row 4 Start ************ */}
        
        {/* ************* Row 8 Header 3 Start ************ */}
            <View style={[Styles.row_2]}>
                <View style={[Styles.row_1_col, { flexDirection: 'row', alignItems: 'center' }]}>
                    <Text style={Styles.row_2_col_text}> How you spend </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    {/* <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white}]} size={wp('4%')} /> */}
                </View>
            </View>
        {/* ************* Row 8 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999'}]}></View>

        {/* ************* Row 9 Chart 2 Start ************ */}
        <View style={Styles.row_6}>
            <View style={[Styles.row_6_col, { flex: 2 }]}>
                <Text style={[Styles.row_6_col_text_2, ]}>Total Spend</Text>
                <Text style={[Styles.row_6_col_text]}>{Config.currency}{numberWithCommas(spendAmount)}</Text>
                <Text style={[Styles.row_6_col_text_2, {color: Math.round(spendAmount - lastMonthAmount) > 0 ? Colors.orange : Colors.success, flexDirection: 'row', alignItems:'center'}]}> <MaterialCommunityIcons name="trending-up" /> 
                    {Config.currency}{numberWithCommas(spendAmount - lastMonthAmount)} ( {Math.abs(Math.round(((spendAmount - lastMonthAmount)/lastMonthAmount*100)))}%)
                </Text>
            </View>
            <View style={Styles.row_6_col_2}>
                <SelectDropdown
                    ref={monthRef}
                    data={months}
                    defaultValueByIndex={0}
                    // defaultValue={'Egypt'}
                    onSelect={(selectedItem, index) => {
                        setPieDataFunc(index)
                        console.log(selectedItem, index);
                    }}
                    defaultButtonText={months[0]}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                        return item;
                    }}
                    buttonStyle={Styles.dropdown1BtnStyleMid}
                    buttonTextStyle={Styles.dropdown1BtnTxtStyle}
                    renderDropdownIcon={isOpened => {
                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.white} size={11} />;
                    }}
                    dropdownIconPosition={'right'}
                    dropdownStyle={Styles.dropdown1DropdownStyle}
                    rowStyle={Styles.dropdown1RowStyle}
                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                />
            </View>
        </View>
        <View style={[Styles.row_6, {marginTop: -15, height: 200}]}>
        {/* <PieChart
            data={pieData}
            width={Dimensions.get('window').width-50}
            height={180}
            chartConfig={{
                backgroundGradientFrom: "#1E2923",
                // backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                // backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(26, 100, 146, ${opacity})`,
                // strokeWidth: 1, // optional, default 3
                // barPercentage: 1,
                propsForLabels: {fontFamily: Fonts.regular, fontSize: wp('3%')},
              }}
            accessor={"population"}
            backgroundColor={"transparent"}
            paddingLeft={"5"}
            center={[0, 0]}
            // absolute
            avoidFalseZero={true}
            /> */}
            {
                <PieChartComponent pieNewData={pieNewData} pieNewCategory={pieNewCategory} />
            }
            
        </View>
        {/* ************* Row 9 Chart 2 end ************ */}


      {/* ************* Row 14 Header 4 Start ************ */}
      <TouchableOpacity onPress={()=> NavigationService.navigate("MonthlyPaymentsScreen")} style={[Styles.row_2, { marginVertical: wp('4%')}]}>
                <View style={[Styles.row_1_col, {flex: 3}]}>
                    <Text style={Styles.row_2_col_text}>Your Monthly Payments </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white}]} size={wp('4%')} />
                </View>
            </TouchableOpacity>
        {/* ************* Row 14 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999'}]}></View>

        {/* ************* Row 15 Start ************ */}
        <ImageBackground  source={Images.gradient_bg} style={[Styles.row_8_col]}>
            <View style={Styles.row_8_col_row}>
                {/*  ******* 1st Part ********** */}
                <View style={Styles.row_8_col_row_col_1}>
                    <View style={Styles.row_8_col_row_col_1_col_1}>
                        <Image source={{uri: paymentList[0]?.icon_image}} style={Styles.icon_box} resizeMode='contain' />
                        <Image source={{uri: paymentList[1]?.icon_image}} style={Styles.icon_box} resizeMode='contain' />
                    </View>
                    <View style={Styles.row_8_col_row_col_1_col_2}>
                        <Text style={Styles.row_8_text_1}>Total  EXPENSE</Text>
                        <Text style={Styles.row_8_text_7}>{Config.currency} {totalExpense}</Text>
                    </View>
                </View>  
                {/*  ******* 2nd Part ********** */}
                <View style={{height: hp('33%'), overflow: 'scroll' }}>
                    <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
                        {
                            paymentList.map((item, i)=> (<PaymentItem index={i} key={`pay-${i}`} navigate="PaymentsDetailsScreen" item={item} />))
                        }
                    </ScrollView>
                </View>
                
            </View>
        </ImageBackground>
        {/* ************* Row 15 End ************ */}


        {/* ************* Row 10 Header 4 Start ************ */}
            <TouchableOpacity onPress={()=> {navClickBudgetChallengeDetailsScreen(0)} }  style={[Styles.row_2]}>
                <View style={[Styles.row_1_col, {flex: 3}]}>
                    <Text style={Styles.row_2_col_text}>Join a Budget Challenge!   </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white}]} size={wp('4%')} />
                </View>
            </TouchableOpacity>
        {/* ************* Row 10 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999'}]}></View>

        {/* ************* Row 11 Start ************** */}
        <View style={Styles.row_3}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={joinList}
                renderItem={renderJointItem}
                keyExtractor={(item, i) => i}
            />
        </View>
        {/* ************* Row 11 End ************** */}
        
        {/* ************* Row 12 Header 4 Start ************ */}
           <TouchableOpacity style={[Styles.row_2, { marginVertical: wp('4%')}]}>
                <View style={[Styles.row_1_col, {flex: 3}]}>
                    <Text style={Styles.row_2_col_text}>Active Challenges </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white}]} size={wp('4%')} />
                </View>
            </TouchableOpacity>
        {/* ************* Row 12 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999'}]}></View>

        {/* ************* Row 13 Start ************** */}
        <View style={Styles.row_3}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={challengeList}
                renderItem={renderChallengeItem}
                keyExtractor={(item, i) => i}
            />
        {/* ************* Row 13 End ************** */}
        </View>

        {/* ************* Row 16 Header Start ************ */}
            <View style={[Styles.row_2, { marginVertical: wp('4%')}]}>
                <View style={[Styles.row_1_col, {flex: 3}]}>
                    <Text style={Styles.row_2_col_text}>Zype Stories </Text>
                </View>
                <View style={[Styles.row_1_col]}>
                    {/* <AntDesign name="right" style={[Styles.row_2_col_text_2, { color: Colors.white}]} size={wp('4%')} /> */}
                </View>
            </View>
        {/* ************* Row 16 End ************ */}
        <View style={[Styles.divider, {backgroundColor: '#999'}]}></View>

        {/* ************* Row 17 Start ************** */}
            <View style={Styles.row_3}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={storyList}
                    renderItem={renderStoryItem}
                    keyExtractor={(item, i) => i}
            />
        </View>
        {/* ************* Row 17 End ************** */}

            
            <View style={[Styles.row_2,]}>
                <View style={{ padding: wp('3%'), marginVertical: wp('4%'), borderWidth: 1, borderColor: 'rgba(229, 80, 80, 0.7)', backgroundColor: 'rgba(229, 80, 80, 0.1)', flex: 1, justifyContent: 'center', flexDirection: 'row', borderRadius: 10 }}>
                    <View style={[Styles.row_1_col, { flex: 3, }]}>
                        <Text style={[Styles.row_2_col_text, { fontSize: wp('3.5%'), fontFamily: Fonts.medium, marginTop: -25, position: 'absolute' }]}>Analyse Status </Text>
                    </View>
                    <View style={[Styles.row_1_col]}>
                        <Switch
                            trackColor={{ false: Colors.gray40, true: Colors.gray40 }}
                            thumbColor={isEnabled ? Colors.white : Colors.cyan}
                            ios_backgroundColor={Colors.orange20}
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </View>
                </View>
            
            </View>

            {!isEnabled && (
                 <BlurView
                 style={Styles.absolute}
                 viewRef={viewRef}
                 blurType="light"
                 blurAmount={10}
                 reducedTransparencyFallbackColor="white"
               />
            )}

        </View>

        <GlobalModal 
            body={
                <>
                <View style={{paddingHorizontal: wp('2%'), paddingBottom: wp('2%'), paddingTop: wp('5%')}}>
                    <Text style={{color: Colors.gray30, fontFamily: Fonts.regular, fontSize: wp('3.8%')}}>Link with account aggregator to get insights on how you spend</Text>
                    {/* <Text style={{color: Colors.gray30, fontFamily: Fonts.italic, fontSize: wp('3%'), marginTop: 5}}>TIP : Keep paying your EMIs on time for a good score</Text> */}
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingVertical: wp('5%'), width: wp('80%')}}>
                    <LinearGradient 
                    start={{ x: 0.0, y: 0.4 }} end={{ x: 0.8, y: 0.5 }}
                    locations={[0, 0.0, 0.9]}
                    style={Styles.btn}
                    colors={[Colors.orange20, Colors.orange20, 'rgba(233, 69, 120, 1)']}
                    style={{ paddingHorizontal: wp('8%'), paddingVertical: wp('1%'), borderRadius: 5  }}>
                        <TouchableOpacity onPress={()=> {NavigationService.navigate('EmptyAnalyseScreen'); setIsEnabled(true)}}>
                            <Text style={{color: Colors.gray30, fontFamily: Fonts.bold, fontSize: wp('3.8%')}}>Why?</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                    <LinearGradient 
                    start={{ x: 0.0, y: 0.1 }} end={{ x: 0, y: 0.9 }}
                    locations={[0, 0.0, 0.9]}
                    colors={['rgba(52, 226, 139, 1)', 'rgba(52, 226, 139, 1)', 'rgba(33, 165, 165, 1)']}
                     style={{ paddingHorizontal: wp('8%'), paddingVertical: wp('1%'), borderRadius: 5 , marginLeft: wp('5%') }}>
                        <TouchableOpacity onPress={()=> {NavigationService.navigate('ShopScreen'); setIsEnabled(true)}}>
                            <Text style={{color: Colors.gray30, fontFamily: Fonts.bold, fontSize: wp('3.8%')}}>Link now</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
                </>
            }
            visible={!isEnabled}
            onSave={toggleSwitch}
            onCancel={()=>{}}
            savebtnShow={false}
            cancelbtnShow={false}
            headerTitle={"NEED MORE INFORMATION"}
            header={true}
            showheaderCrossbtn={true}
            modalContentStyle={{borderRadius: 7, backgroundColor: Colors.black}}
          />
            
        </>
    )
}

const Styles = StyleSheet.create({
    row_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('2%') },
    row_1_col: { flex: 1, alignSelf: 'baseline' },
    row_1_col_text: { fontFamily: Fonts.italic, fontSize: wp('2.5%'), color: Colors.gray40, textAlign: 'right' },

    row_2: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginBottom: wp('2%') },
    row_2_col: { flex: 1 },
    row_2_col_text: { fontFamily: Fonts.bold, fontSize: wp('5%'), color: Colors.white,},
    row_2_col_text_2: { fontFamily: Fonts.bold, fontSize: wp('6%'), color: Colors.cyan30, textAlign: 'right' },

    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },

    row_3_col: { width: wp('50%'), paddingHorizontal: wp('4%'), borderWidth: 1, borderColor: Colors.white, marginHorizontal: wp('2%'), paddingVertical: wp('1%'), borderRadius: wp('5%')},
    row_3_col_row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    row_3_col_row_text: { color: Colors.white , fontFamily: Fonts.regular, fontSize: wp('4%')},
    row_3_col_row_text_2: { color: Colors.white , fontFamily: Fonts.medium, fontSize: wp('5%'), marginTop: wp('-2%'), paddingBottom: wp('2%')},
    row_3_col_row_text_3: { color: Colors.white , fontFamily: Fonts.italic, fontSize: wp('3%'), paddingVertical: wp('2%')},
    row_3_col_row_text_4: { color: Colors.white , fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%')},
    row_3_col_row_img: { width: wp('8%') },

    row_4: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },
    row_4_catItem: { paddingHorizontal: wp('3.5%'), paddingVertical: wp('1%'), borderRadius: wp('5%'), marginHorizontal: wp('1%')},
    row_4_catItem_text:{ color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), textAlign: 'center' },
    row_4_catItem_normal: { paddingHorizontal: wp('5%'), paddingVertical: wp('1%'),  borderWidth: 1, borderRadius: wp('5%'), borderColor: '#F0F0F0',},
    
    row_5: {flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('0%') },

    row_6: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },
    row_6_col: { flex: 1,  },
    row_6_col_2: { flex: 0.6},
    row_6_col_text: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.white, textAlign: 'left' },
    row_6_col_text_2: { fontFamily: Fonts.regular, fontSize: wp('3.5%'), color: Colors.gray30, textAlign: 'left' },

    divider: {paddingVertical: 0.2, backgroundColor: Colors.gray, flex: 1, width: wp('87%'), borderWidth: 0.7},

    row_8_col: {paddingVertical: wp('5%'), flex: 1, width: wp('100%'), marginVertical: wp('2%')},
    row_8_col_row: { backgroundColor: Colors.black30, paddingVertical: wp('2%'), paddingHorizontal: wp('5%') ,marginHorizontal: wp('5%'),  borderRadius: wp('7%'), overflow: 'scroll' },
    row_8_col_row_col_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
    row_8_col_row_col_1_col_1: { flexDirection: 'row', alignItems: 'baseline', flex: 1},
    row_8_col_row_col_1_col_2: { flex: 1},

    icon_box: { width: wp('5%'), height: wp('5%'), marginHorizontal: wp('2%') },
    icon_box_sm: { width: wp('10%'), marginHorizontal: wp('1%') },

    mod_col: { backgroundColor: Colors.black , marginTop: 10, paddingHorizontal: wp('4%'), borderRadius: wp('5%')},

    row_8_text_1: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.medium, fontSize: wp('3.5%')},
    row_8_text_2: {color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4.5%')},
    row_8_text_3: {color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('3.5%')},
    row_8_text_5: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.bold, fontSize: wp('5%')},
    row_8_text_7: {color: Colors.white, textAlign: 'right', fontFamily: Fonts.bold, fontSize: wp('6%')},

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
        width: wp('20%'),
        height: 30,
        backgroundColor: Colors.black,
        borderRadius: wp('5%'),
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnStyleMid_new: {
        width: wp('25%'),
        height: 30,
        backgroundColor: Colors.white,
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
    dropdown1BtnTxtStyle: { color: Colors.white, textAlign: 'left', fontSize: wp('3.2%'), fontFamily: Fonts.regular, marginHorizontal: 2 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: wp('4%'), fontFamily: Fonts.regular },

    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }

})

export default observer(MyAccountTabs)
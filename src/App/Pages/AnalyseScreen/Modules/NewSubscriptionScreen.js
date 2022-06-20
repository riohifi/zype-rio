import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, ActivityIndicator, } from 'react-native';
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
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { useToast } from "react-native-toast-notifications";

const NewSubscriptionScreen = () => {

    const toast = useToast();

    const [category, setCategory] = useState([])
    const [cycle, setCycle] = useState(["Monthly", "Yearly"])
    const [alert, setAlert] = useState(["None", "Yes"])

    const [isLoading, setIsLoading] = useState(false)

    const [step, setStep] = useState(1)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)

    const checkTodayUI = ()=>{
        console.log(date, (new Date()))
        if(moment(date).format("DD-MM-YYYY") === moment(new Date()).format("DD-MM-YYYY")){ return <Text style={{ color: Colors.gray20 }}> ( Today )</Text> }
        else{ return null}
    }
    const [formData, setFormData] = useState({
        name: '', description: '', category: '', recurrence: cycle[0], amount: '', alert_type: alert[0], bill_date: date, amount: "0"
    })
    const [formDataErr, setFormDataErr] = useState({
        name: '', category: '', amount: ''
    })

    var allAnalyseData = AnalyseStore.allAnalyseData

    const formatRecurrence = ()=>{
        // allAnalyseData.recurrences.map((item)=>{
            setCycle(allAnalyseData.recurrences)
        // })
    }
    const formatRecurring_categories = ()=>{
        // allAnalyseData.recurring_categories.map((item)=>{
            setCategory(allAnalyseData.recurring_categories)
        // })
    }

    useEffect(()=>{
        // if(allAnalyseData !== null){
        //     var tempCat = []
        //     allAnalyseData?.top_categories.map((item)=>{ tempCat.push(item) })
        //     tempCat.push("Others")
        //     setCategory(tempCat)  
        // }
        formatRecurrence()
        formatRecurring_categories()
    },[AnalyseStore.allAnalyseData])

    const onHandleChange = (value, name)=>{ setFormData({...formData, [name]: value}); setFormDataErr({ name: '', category: '', amount: ''}) }

    const handleContinue = ()=>{
        if(formData.name === ''){ 
            // toast.show('Name Required!', {type: 'danger', placement: 'top'});
            setFormDataErr({...formDataErr, name: 'Name Required!'})
         }
        // else if(formData.description === ''){ toast.show('Description Required!', {type: 'danger', placement: 'top'});  }
        else if(formData.category === ''){ 
            // toast.show('Category Required!', {type: 'danger', placement: 'top'});
            setFormDataErr({...formDataErr, category: 'Category Required!'})
          }
        else{ setStep(2) }
    }

    const handleSubmit = async()=>{
        setIsLoading(true)
        // if(formData.amount === ''){ 
        //     // toast.show('Cost Required!', {type: 'danger', placement: 'top'});
        //     setFormDataErr({...formDataErr, amount: 'Cost Required!'})
        //  }
        // else{ 
            var data = {
                "alert_type": formData.alert_type,
                "amount": formData.amount,
                "bill_date": moment(formData.bill_date).format('YYYY-MM-DD'),
                "category": formData.category,
                "customer_id": 1032,
                "description": formData.description,
                "name": formData.name,
                "recurrence": formData.recurrence
            }
            const resp = await AnalyseStore.postSubscribeData(data)
            toast.show("Success", {type: 'success', placement: 'top'});
            console.log('formData', resp)
            NavigationService.goBack()
            setIsLoading(false)
        //  } 
    }

    return (
        <>
        <SafeAreaView style={Styles.body}>
            <LinearGradient
                colors={[Colors.primary, Colors.black30]}
                style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <ScrollView keyboardShouldPersistTaps='handled' style={{ flex: 1, }} showsVerticalScrollIndicator={false}>

                        {/* **********  Section One ********** */}
                        <TouchableOpacity style={[Styles.row_2,]} onPress={() =>{ step === 1 ? NavigationService.goBack() : setStep(1)}}>
                            <View style={[Styles.row_1_col, { flex: 3 }]}>
                                <Text style={Styles.row_2_col_text}>
                                    <AntDesign name="left" style={[{ color: Colors.white }]} size={wp('6%')} />
                                    {"   "} Step {step} <Text style={{ color: Colors.gray60 }}>/ 2</Text> </Text>
                            </View>
                        </TouchableOpacity>
                        {/* **********  Section One  end********** */}

                        {/* ************* Form Step 1 Start *********** */}
                    { step === 1 &&
                        <View>

                            {/* ************* header 1 ************* */}
                            <View style={Styles.section}>
                                <Text style={Styles.h1}>What is this subscription about?</Text>
                            </View>
                            {/* ************* header 1 end ************* */}

                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Name </Text>
                                <TextInput defaultValue={formData.name} onChangeText={(e)=>{onHandleChange(e, 'name')}} placeholder="Name" style={Styles.textInput} placeholderTextColor={Colors.gray60} />
                                <Text style={{textAlign: 'right', fontFamily: Fonts.regular, fontSize: wp('3%'), color: Colors.orange, marginRight: 5}}>{formDataErr.name}</Text>
                            </View>
                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Description</Text>
                                <TextInput defaultValue={formData.description} onChangeText={(e)=>{onHandleChange(e, 'description')}} placeholder="Description" style={Styles.textInput} placeholderTextColor={Colors.gray60} />
                                <Text style={{textAlign: 'right', fontFamily: Fonts.regular, fontSize: wp('3%'), color: Colors.orange, marginRight: 5}}> </Text>
                            </View>
                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Category</Text>
                                <SelectDropdown
                                    data={category}
                                    defaultValueByIndex={0}
                                    defaultValue={formData.category}
                                    onSelect={(selectedItem, index) => {
                                        onHandleChange(selectedItem, 'category')
                                        console.log(selectedItem, index);
                                    }}
                                    defaultButtonText={'Select Category'}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem;
                                    }}
                                    rowTextForSelection={(item, index) => {
                                        return item;
                                    }}
                                    buttonStyle={Styles.dropdown1BtnStyleMid}
                                    buttonTextStyle={Styles.dropdown1BtnTxtStyle}
                                    renderDropdownIcon={isOpened => {
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.gray60} size={11} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={Styles.dropdown1DropdownStyle}
                                    rowStyle={Styles.dropdown1RowStyle}
                                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                                />
                                <Text style={{textAlign: 'right', fontFamily: Fonts.regular, fontSize: wp('3%'), color: Colors.orange, marginRight: 5}}>{formDataErr.category}</Text>
                            </View>
                            <View style={[Styles.section, { marginTop: wp('10%') }]}>
                                <TouchableOpacity onPress={()=> { handleContinue() }}>
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.1 }} end={{ x: 0, y: 0.9 }}
                                        locations={[0, 0.0, 0.9]}
                                        style={Styles.btn}
                                        colors={['rgba(52, 226, 139, 1)', 'rgba(52, 226, 139, 1)', 'rgba(33, 165, 165, 1)']}
                                    >
                                        <Text style={[Styles.h3, { width: wp('90%') }]}> Next Step </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>}
                        {/* ************* Form Step 1 end *********** */}

                        {/* ************* Form Step 2 Start *********** */}
                    { step === 2 &&
                        <View>
                            {/* ************* header 1 ************* */}
                            <View style={Styles.section}>
                                <Text style={Styles.h1}>What is this subscription about?</Text>
                            </View>
                            {/* ************* header 1 end ************* */}

                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Cost</Text>
                                <TextInput defaultValue={formData.amount} onChangeText={(e)=>{onHandleChange(e, 'amount')}} placeholder="Cost" style={Styles.textInput} placeholderTextColor={Colors.gray60} keyboardType='decimal-pad' />
                                <Text style={{textAlign: 'right', fontFamily: Fonts.regular, fontSize: wp('3%'), color: Colors.orange, marginRight: 5}}>{formDataErr.amount}</Text>
                            </View>

                            <View style={Styles.section}>
                                <Text style={Styles.h6}>First Bill Date</Text>
                                <TouchableOpacity onPress={() => setOpen(true)}  style={[Styles.textInput, {flexDirection: 'row', justifyContent: 'space-between', paddingVertical: wp('3%')}]}>
                                    <Text style={{color: Colors.gray60, fontFamily: Fonts.medium, fontSize: wp('4%')}}> {moment(date).format('DD MMM, YYYY')} {checkTodayUI()} </Text>
                                    <FontAwesome name="angle-right" size={wp('7%')} color={Colors.gray60} />
                                </TouchableOpacity>
                            </View>

                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Cycle</Text>
                                <SelectDropdown
                                    data={cycle}
                                    defaultValueByIndex={0}
                                    defaultValue={formData.recurrence}
                                    onSelect={(selectedItem, index) => {
                                        onHandleChange(selectedItem, 'recurrence')
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
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.gray60} size={11} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={Styles.dropdown1DropdownStyle}
                                    rowStyle={Styles.dropdown1RowStyle}
                                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                                />
                            </View>
                            
                            <View style={Styles.section}>
                                <Text style={Styles.h6}>Alert</Text>
                                <SelectDropdown
                                    data={alert}
                                    defaultValueByIndex={0}
                                    defaultValue={formData.alert_type}
                                    onSelect={(selectedItem, index) => {
                                        onHandleChange(selectedItem, 'alert_type')
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
                                        return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={Colors.gray60} size={11} />;
                                    }}
                                    dropdownIconPosition={'right'}
                                    dropdownStyle={Styles.dropdown1DropdownStyle}
                                    rowStyle={Styles.dropdown1RowStyle}
                                    rowTextStyle={Styles.dropdown1RowTxtStyle}
                                />
                            </View>

                            <View style={[Styles.section, { marginTop: wp('10%') }]}>
                                <TouchableOpacity disabled={isLoading} onPress={()=> { handleSubmit() }}>
                                <LinearGradient
                                        start={{ x: 0.0, y: 0.1 }} end={{ x: 0, y: 0.9 }}
                                        locations={[0, 0.0, 0.9]}
                                        style={Styles.btn}
                                        colors={['rgba(52, 226, 139, 1)', 'rgba(52, 226, 139, 1)', 'rgba(33, 165, 165, 1)']}
                                    >
                                        {
                                            !isLoading ? <Text style={[Styles.h3, { width: wp('90%') }]}> Save Subscription </Text> :
                                            <View style={{flex: 1, justifyContent: 'center'}}><ActivityIndicator size={30} color={Colors.white} /></View>
                                        }
                                        
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>}
                        {/* ************* Form Step 2 end *********** */}



                        <View style={{ marginBottom: wp('20%') }}></View>
                    </ScrollView>
                </TouchableWithoutFeedback>

            </LinearGradient>
        </SafeAreaView>
        <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(date) => {
                onHandleChange(date, 'bill_date')
            setOpen(false)
            setDate(date)
            }}
            onCancel={() => {
            setOpen(false)
            }}
            textColor={Colors.orange}
            theme="dark"
        />
        </>
    )
}

const Styles = StyleSheet.create({
    body: { backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' },

    section: { paddingVertical: wp('0%'), flex: 1, paddingHorizontal: wp('5%') },

    row_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('2%') },
    row_1_col: { flex: 1 },
    row_1_col_text: { fontFamily: Fonts.italic, fontSize: wp('2.5%'), color: Colors.gray40, textAlign: 'right' },

    row_2: { flexDirection: 'row', alignItems: 'center', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginBottom: wp('1%') },
    row_2_col: { flex: 1 },
    row_2_col_text: { fontFamily: Fonts.bold, fontSize: wp('5%'), color: Colors.orange, },
    row_2_col_text_2: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.cyan30, textAlign: 'right' },

    btn: { flexDirection: 'row', backgroundColor: Colors.white, width: wp('90%'), paddingVertical: wp('3%'), borderRadius: wp('3%'), alignItems: 'center', alignSelf: 'center', },

    divider: { paddingVertical: 0.2, backgroundColor: Colors.gray, flex: 1, width: wp('100%') },

    h6: { fontFamily: Fonts.regular, fontSize: wp('4%'), color: Colors.gray60, marginTop: wp('2%') },
    h4: { fontFamily: Fonts.medium, fontSize: wp('5%'), color: Colors.white, textAlign: 'left' },
    h3: { fontFamily: Fonts.medium, fontSize: wp('4.5%'), color: Colors.white, textAlign: 'center' },
    h1: { fontFamily: Fonts.bold, fontSize: wp('8%'), color: Colors.white, marginTop: wp('2%') },

    textInput: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), backgroundColor: Colors.black30, borderRadius: wp('3%'), paddingHorizontal: wp('3%'), marginVertical: wp('1%') ,  paddingVertical: wp('3%')},

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
        width: wp('90%'),
        height: 50,
        backgroundColor: Colors.black30,
        borderRadius: wp('3%'),
        borderWidth: 1,
        borderColor: Colors.black30,
        marginTop: 5
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
    dropdown1BtnTxtStyle: { color: Colors.white, textAlign: 'left', fontSize: wp('4%'), fontFamily: Fonts.medium, marginHorizontal: 2 },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: wp('4%'), fontFamily: Fonts.regular },

})

export default observer(NewSubscriptionScreen)
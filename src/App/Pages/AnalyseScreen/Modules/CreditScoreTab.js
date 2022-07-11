import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, FlatList } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import FirstUi from '../Components/CreditScoreTabUI/FirstUi';
import CreditCardOverViewDetails from '../Components/CreditScoreTabUI/CreditCardOverViewDetails';
import CreditCardDetails from '../Components/CreditScoreTabUI/CreditCardDetails';
import AnalyseStore from '../../../../Stores/AnalyseStore';
import { observer } from 'mobx-react-lite';
import _ from 'lodash'
import PaymentsDetails from '../Components/CreditScoreTabUI/PaymentsDetails';
import CreditLimit from '../Components/CreditScoreTabUI/CreditLimit';
import GlobalModal from '../../../../Utils/Components/GlobalModal';
import { BlurView } from '@react-native-community/blur';
import { useIsFocused } from '@react-navigation/core';

const CreditScoreTab = (props) => {

    const allCreditData = AnalyseStore.allCreditData

    const [UITab, setUITab] = useState(0)
    const handleUISelect = (val) => {setUITab(val)}

    const [catList, setCatList] = useState([])
    const [isEnabled, setIsEnabled] = useState(false);
    const viewRef = useRef()

    
    const getCatList = ()=>{
        var temArr = []
        temArr.push("All");
        if(allCreditData && allCreditData !== undefined){
            allCreditData?.accounts.map((item, i)=>{
                temArr.push(item.loan_type)
            })
        }
        var a = _.groupBy(temArr, function(n) { return n; });
        const keys = Object.keys(a)

        setCatList(keys)
        AnalyseStore.setLoanCategory(keys)
    }

    const checkIsNull = ()=>{
        if(allCreditData === null){ setIsEnabled(true) }
    }

    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused){ checkIsNull() }
        
        getCatList()
    },[AnalyseStore.allCreditData, isFocused])


    return (
        <>
        {/* *********** Main tab ********** */}
        {
            UITab === 0 &&  
                <FirstUi 
                    handleUISelect={handleUISelect} 
                    Styles={Styles} 
                    catList={catList}
                    setCatList={setCatList}
                    
                    />
        }
        {/* *********** Credit CreditCardOverViewDetails card Details  */}
        {
            UITab === 1 && 
                <CreditCardOverViewDetails  
                    handleUISelect={handleUISelect} 
                    Styles={Styles} 
                    catList={catList}
                    setCatList={setCatList}
                    />
        }
        
        {
            UITab === 2 && <CreditCardDetails  handleUISelect={handleUISelect} Styles={Styles} />
        }
        {
            UITab === 3 && 
                <PaymentsDetails  
                    handleUISelect={handleUISelect} 
                    Styles={Styles} 
                    catList={catList}
                    setCatList={setCatList}
                    />
        }
        {
            UITab === 4 && 
                <CreditLimit  
                    handleUISelect={handleUISelect} 
                    Styles={Styles} 
                    catList={catList}
                    setCatList={setCatList}
                    />
        }

{isEnabled && (
                 <BlurView
                 style={Styles.absolute}
                 viewRef={viewRef}
                 blurType="light"
                 blurAmount={10}
                 reducedTransparencyFallbackColor="white"
               />
            )}

        <GlobalModal
            body={
                <>
                <View style={{paddingHorizontal: wp('2%'), paddingBottom: wp('3%'), paddingTop: wp('5%')}}>
                    <Text style={{color: Colors.gray30, fontFamily: Fonts.regular, fontSize: wp('3.8%')}}>You don’t have enough credit age to show details of your score</Text>
                    <Text style={{color: Colors.gray30, fontFamily: Fonts.italic, fontSize: wp('3%'), marginTop: wp('5%')}}>TIP : Keep paying your EMIs on time for a good score</Text>
                </View>
                </>
            }
            visible={isEnabled}
            onSave={()=>{}}
            onCancel={()=>{props.toggleButton(1)}}
            savebtnShow={false}
            cancelbtnShow={false}
            headerTitle={"NO SCORE"}
            header={true}
            showheaderCrossbtn={true}
            modalContentStyle={{borderRadius: 7, backgroundColor: Colors.black}}
          />
           
        </>
    )
}

const Styles = StyleSheet.create({
    row_1: { borderWidth: 1, borderColor: Colors.green20, padding: wp('5%'), flex: 1, width: wp('90%'), borderRadius: wp('5%'), backgroundColor: 'rgba(32, 165, 165, 0.092824)' },
    row_1_row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    row_1_row_btn: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.green20, paddingHorizontal: wp('4%'), paddingVertical: wp('2%'), borderRadius: wp('10%') },
    row_1_row_btn_text: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('3%'), marginLeft: 10, },

    row_1_row_text: { fontFamily: Fonts.regular, fontSize: wp('4%'), color: Colors.white },
    row_2_row_text: { fontFamily: Fonts.bold, fontSize: wp('8%'), color: Colors.green20 },
    row_1_row_btn_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('2.9%'), marginRight: 10 },

    row_2: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },
    row_2_col: { flex: 1 },
    row_2_col_text: { fontFamily: Fonts.bold, fontSize: wp('5%'), color: Colors.white, },
    row_2_col_text_2: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.cyan30, textAlign: 'right' },

    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('1%') },

    row_4: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('7%') },
    row_4_catItem: { paddingHorizontal: wp('3.5%'), paddingVertical: wp('1%'), borderRadius: wp('5%'), marginHorizontal: wp('1%') },
    row_4_catItem_text: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), textAlign: 'center' },
    row_4_catItem_normal: { paddingHorizontal: wp('5%'), paddingVertical: wp('1%'), borderWidth: 1, borderRadius: wp('5%'), borderColor: '#F0F0F0', },

    row_5: { backgroundColor: Colors.black, marginTop: wp('5%'), flex: 1, width: wp('90%'), borderRadius: wp('7%'), paddingHorizontal: wp('2%'), alignItems: 'center', paddingBottom: wp('5%') },
    row_5_row_1: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', flex: 1, width: wp('90%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },
    row_5_row_1_col: { flex: 1 },
    row_5_row_1_col_text: { fontFamily: Fonts.bold, fontSize: wp('4%'), color: Colors.gray40, },
    row_5_row_1_col_text_2: { fontFamily: Fonts.bold, fontSize: wp('6.5%'), color: Colors.white, textAlign: 'left', width: wp('75%') },

    text_sm: { fontFamily: Fonts.regular, color: Colors.black, fontSize: wp('2.5%'), textAlign: 'left',},
    h6: { fontFamily: Fonts.regular, color: Colors.black, fontSize: wp('2.7%'), textAlign: 'left', marginRight: wp('1%')},

    divider: { paddingVertical: 0.2, backgroundColor: Colors.gray, flex: 1, width: wp('87%') },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      },

})

export default observer(CreditScoreTab)
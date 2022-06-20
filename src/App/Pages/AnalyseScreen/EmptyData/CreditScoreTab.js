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
import {BlurView} from '@react-native-community/blur';
import GlobalModal from '../../../../Utils/Components/GlobalModal';

const CreditScoreTab = (props) => {

    const allCreditData = {
        "accounts": [
            {
                "account_number": "xxxx0994",
                "account_status": "Overdue",
                "credit_limit": "50000.00",
                "disburse_date": "12/13/1998",
                "full_payment": 0,
                "icon_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH7SURBVHgBtZRPaxNBHIaf2d1uUxObNE1S0zZlkzSh2iDFg1XUmlJBKCIo1IN+ACWXqgjqyYOgBw8ePPgFPIlYiiAIguJB9Fb0rBaMh1JLIWnzr0nTSUq2BJK0C8kLuzPzsvMwv31nRpTL5QVggvYprsmXSz4GbZRCB6Q1MreT/9j69t0cC1cf2li0zlOHh9FOnbQCTbJ59/6eEQpivzdf5+lXLuOwAq3J9vgR+ulJRJeGcLvp/fi+6qev3Wg1rTVU9Q+gRSN8/pmEjTQeu5NYyMd+aghV5P/qnruK4vGyvJJi+uHrqn9rZoyXd2bRL82ixo41hTZNX4yGEf3uxpMiYRSvF0srrQSVe/oMNRzEdWaKJ9cnq/5EaBeUe/6CrvPn0GemDw6tqVzYwim/eDAnUxYCSiXK+Tz7qSU0k5gnU+nUtlTiNgdR06BsiZt7Rp8LdTRS57UKSsgL5ZNs44WFRYTPx9/1LF/tfqzq7PgQhq+30jXMleZ+LfMld4jS4jteReOE/S4CnsMk/6dJZQuocp8s/V7l4gmDH39W6enWOBroZ2V9kyU5LpW2MS6M71ZqljwSIDMwiDLkR9cUZAXVVsZVhdjkqcoVigy6HQSPOJmKBcjmi6QyBXp0rXH5+TdvETYba0XBB8cIVhU/HjDLN6G0T0ZH7tOOQHcA6iiORi5VjgwAAAAASUVORK5CYII=",
                "icon_url": "icici.png",
                "loan_amount": "None",
                "loan_type": "Credit Card",
                "payment_history": {
                    "2018": [
                        {
                            "month": "Sep",
                            "status": -1
                        }
                    ]
                },
                "rate_of_interest": null,
                "remaining_amount": "80000.00",
                "subscriber_name": "icicibank",
                "tenure": "0",
                "total_payment": 1
            },
            {
                "account_number": "xxxx1308",
                "account_status": "Closed",
                "credit_limit": "None",
                "disburse_date": "07/18/1994",
                "full_payment": 1,
                "icon_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH7SURBVHgBtZRPaxNBHIaf2d1uUxObNE1S0zZlkzSh2iDFg1XUmlJBKCIo1IN+ACWXqgjqyYOgBw8ePPgFPIlYiiAIguJB9Fb0rBaMh1JLIWnzr0nTSUq2BJK0C8kLuzPzsvMwv31nRpTL5QVggvYprsmXSz4GbZRCB6Q1MreT/9j69t0cC1cf2li0zlOHh9FOnbQCTbJ59/6eEQpivzdf5+lXLuOwAq3J9vgR+ulJRJeGcLvp/fi+6qev3Wg1rTVU9Q+gRSN8/pmEjTQeu5NYyMd+aghV5P/qnruK4vGyvJJi+uHrqn9rZoyXd2bRL82ixo41hTZNX4yGEf3uxpMiYRSvF0srrQSVe/oMNRzEdWaKJ9cnq/5EaBeUe/6CrvPn0GemDw6tqVzYwim/eDAnUxYCSiXK+Tz7qSU0k5gnU+nUtlTiNgdR06BsiZt7Rp8LdTRS57UKSsgL5ZNs44WFRYTPx9/1LF/tfqzq7PgQhq+30jXMleZ+LfMld4jS4jteReOE/S4CnsMk/6dJZQuocp8s/V7l4gmDH39W6enWOBroZ2V9kyU5LpW2MS6M71ZqljwSIDMwiDLkR9cUZAXVVsZVhdjkqcoVigy6HQSPOJmKBcjmi6QyBXp0rXH5+TdvETYba0XBB8cIVhU/HjDLN6G0T0ZH7tOOQHcA6iiORi5VjgwAAAAASUVORK5CYII=",
                "icon_url": "icici.png",
                "loan_amount": "50000.00",
                "loan_type": "Business Loan",
                "payment_history": {
                    "2017": [
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2018": [
                        {
                            "month": "Jan",
                            "status": -1
                        },
                        {
                            "month": "Feb",
                            "status": -1
                        },
                        {
                            "month": "Mar",
                            "status": -1
                        },
                        {
                            "month": "Apr",
                            "status": -1
                        },
                        {
                            "month": "May",
                            "status": -1
                        },
                        {
                            "month": "Jun",
                            "status": -1
                        },
                        {
                            "month": "Jul",
                            "status": -1
                        },
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2019": [
                        {
                            "month": "Jan",
                            "status": 0
                        }
                    ]
                },
                "rate_of_interest": null,
                "remaining_amount": "0.00",
                "subscriber_name": "icicibank",
                "tenure": "0",
                "total_payment": 18
            },
            {
                "account_number": "xxxx1306",
                "account_status": "Overdue",
                "credit_limit": "50000.00",
                "disburse_date": "07/16/1994",
                "full_payment": 0,
                "icon_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH7SURBVHgBtZRPaxNBHIaf2d1uUxObNE1S0zZlkzSh2iDFg1XUmlJBKCIo1IN+ACWXqgjqyYOgBw8ePPgFPIlYiiAIguJB9Fb0rBaMh1JLIWnzr0nTSUq2BJK0C8kLuzPzsvMwv31nRpTL5QVggvYprsmXSz4GbZRCB6Q1MreT/9j69t0cC1cf2li0zlOHh9FOnbQCTbJ59/6eEQpivzdf5+lXLuOwAq3J9vgR+ulJRJeGcLvp/fi+6qev3Wg1rTVU9Q+gRSN8/pmEjTQeu5NYyMd+aghV5P/qnruK4vGyvJJi+uHrqn9rZoyXd2bRL82ixo41hTZNX4yGEf3uxpMiYRSvF0srrQSVe/oMNRzEdWaKJ9cnq/5EaBeUe/6CrvPn0GemDw6tqVzYwim/eDAnUxYCSiXK+Tz7qSU0k5gnU+nUtlTiNgdR06BsiZt7Rp8LdTRS57UKSsgL5ZNs44WFRYTPx9/1LF/tfqzq7PgQhq+30jXMleZ+LfMld4jS4jteReOE/S4CnsMk/6dJZQuocp8s/V7l4gmDH39W6enWOBroZ2V9kyU5LpW2MS6M71ZqljwSIDMwiDLkR9cUZAXVVsZVhdjkqcoVigy6HQSPOJmKBcjmi6QyBXp0rXH5+TdvETYba0XBB8cIVhU/HjDLN6G0T0ZH7tOOQHcA6iiORi5VjgwAAAAASUVORK5CYII=",
                "icon_url": "icici.png",
                "loan_amount": "50000.00",
                "loan_type": "Credit Card",
                "payment_history": {
                    "2017": [
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2018": [
                        {
                            "month": "Jan",
                            "status": -1
                        },
                        {
                            "month": "Feb",
                            "status": -1
                        },
                        {
                            "month": "Mar",
                            "status": -1
                        },
                        {
                            "month": "Apr",
                            "status": -1
                        },
                        {
                            "month": "May",
                            "status": -1
                        },
                        {
                            "month": "Jun",
                            "status": -1
                        },
                        {
                            "month": "Jul",
                            "status": -1
                        },
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2019": [
                        {
                            "month": "Jan",
                            "status": -1
                        }
                    ]
                },
                "rate_of_interest": null,
                "remaining_amount": "80000.00",
                "subscriber_name": "icicibank",
                "tenure": "0",
                "total_payment": 18
            },
            {
                "account_number": "xxxx1307",
                "account_status": "Overdue",
                "credit_limit": "None",
                "disburse_date": "07/17/1994",
                "full_payment": 0,
                "icon_image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAUCAYAAABiS3YzAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH7SURBVHgBtZRPaxNBHIaf2d1uUxObNE1S0zZlkzSh2iDFg1XUmlJBKCIo1IN+ACWXqgjqyYOgBw8ePPgFPIlYiiAIguJB9Fb0rBaMh1JLIWnzr0nTSUq2BJK0C8kLuzPzsvMwv31nRpTL5QVggvYprsmXSz4GbZRCB6Q1MreT/9j69t0cC1cf2li0zlOHh9FOnbQCTbJ59/6eEQpivzdf5+lXLuOwAq3J9vgR+ulJRJeGcLvp/fi+6qev3Wg1rTVU9Q+gRSN8/pmEjTQeu5NYyMd+aghV5P/qnruK4vGyvJJi+uHrqn9rZoyXd2bRL82ixo41hTZNX4yGEf3uxpMiYRSvF0srrQSVe/oMNRzEdWaKJ9cnq/5EaBeUe/6CrvPn0GemDw6tqVzYwim/eDAnUxYCSiXK+Tz7qSU0k5gnU+nUtlTiNgdR06BsiZt7Rp8LdTRS57UKSsgL5ZNs44WFRYTPx9/1LF/tfqzq7PgQhq+30jXMleZ+LfMld4jS4jteReOE/S4CnsMk/6dJZQuocp8s/V7l4gmDH39W6enWOBroZ2V9kyU5LpW2MS6M71ZqljwSIDMwiDLkR9cUZAXVVsZVhdjkqcoVigy6HQSPOJmKBcjmi6QyBXp0rXH5+TdvETYba0XBB8cIVhU/HjDLN6G0T0ZH7tOOQHcA6iiORi5VjgwAAAAASUVORK5CYII=",
                "icon_url": "icici.png",
                "loan_amount": "50000.00",
                "loan_type": "Business Loan",
                "payment_history": {
                    "2017": [
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2018": [
                        {
                            "month": "Jan",
                            "status": -1
                        },
                        {
                            "month": "Feb",
                            "status": -1
                        },
                        {
                            "month": "Mar",
                            "status": -1
                        },
                        {
                            "month": "Apr",
                            "status": -1
                        },
                        {
                            "month": "May",
                            "status": -1
                        },
                        {
                            "month": "Jun",
                            "status": -1
                        },
                        {
                            "month": "Jul",
                            "status": -1
                        },
                        {
                            "month": "Aug",
                            "status": -1
                        },
                        {
                            "month": "Sep",
                            "status": -1
                        },
                        {
                            "month": "Oct",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        },
                        {
                            "month": "Nov",
                            "status": -1
                        }
                    ],
                    "2019": [
                        {
                            "month": "Jan",
                            "status": -1
                        }
                    ]
                },
                "rate_of_interest": null,
                "remaining_amount": "85000.00",
                "subscriber_name": "icicibank",
                "tenure": "0",
                "total_payment": 18
            }
        ],
        "active_account_count": 2,
        "bureau_age": "26 y",
        "bureau_age_status": "Excellent",
        "closed_account_count": 1,
        "full_payments": 1,
        "last_updated_at": "2022-06-16 17:53:58",
        "on_time_payment_status": "Below Avg",
        "score": 719,
        "score_history": [
            {
                "May": 700
            },
            {
                "Jun": 719
            },
            {
                "Jul": 724
            }
        ],
        "score_status": "Fair",
        "total_credit_limit_available": "100%",
        "total_payments": 55
    }

    const viewRef = useRef()

    const [UITab, setUITab] = useState(0)
    const handleUISelect = (val) => {setUITab(val)}

    const [catList, setCatList] = useState([])
    const [isEnabled, setIsEnabled] = useState(true);

    
    const getCatList = ()=>{
        var temArr = []
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


    useEffect(()=>{
        getCatList()
    },[AnalyseStore.allCreditData])


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
import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import CircularProgress from 'react-native-circular-progress-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { round } from '../../../../Utils/Utils';
import Config from '../../../../Utils/Config';
import MarqueeView from 'react-native-marquee-view';
import Images from '../../../../Utils/Assets/Images';
import moment from 'moment';

const ChallengeItem = ({ item, index }) => {
    var now = moment()
    const startOfNextMonth = moment().add(1, 'M').startOf('month').format('YYYY-MM-DD hh:mm:ss');
    // console.log('startOfNextMonth', startOfNextMonth)
    const difDay = now.diff(startOfNextMonth, 'days') 
    return (
        <>
            <LinearGradient 
                start={{ x: 0.0, y: 0.0 }} end={{ x: 0.0, y: 0.9 }}
                locations={[0.0, 0.0, 0.8]}
                colors={item.color}
                style={[Styles.row_3_col, index < 1 ? {borderWidth: 1} : null ]}>
                
                <View style={{ marginBottom: wp('8%'), flex: 1 }}>

                { (item.active && item.is_completed) ?
                        <View style={{ width: wp('20%'), height: wp('20%'), marginBottom: wp('5%') }}>
                            {/* <View style={{ width: wp('15%'), height: wp('15%'), borderRadius: wp('50%'), backgroundColor: "#35E889", justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                                <Ionicons size={30} color={Colors.white} name="md-checkmark-done-outline" />
                            </View> */}
                            <Image source={Images.circle} resizeMode='contain' />
                            <MarqueeView
                            style={{
                                // backgroundColor: 'blue',
                                width: wp('49%'),
                                overflow: 'hidden',
                                marginTop: wp('5%')
                            }}>
                            <Text style={Styles.row_3_col_row_text_2}>{item.title} </Text>
                        </MarqueeView>
                        </View> : null }

                { (!item.active && !item.is_completed) || (item.active && !item.is_completed) ?
                    <View>
                    {/* <CircularProgress
                        value={52}
                        radius={wp('10%')}
                        inActiveStrokeColor={'#353F3F'}
                        inActiveStrokeOpacity={0.3}
                        progressValueColor={'#fff'}
                        valueSuffix={'%'}
                        titleStyle={{}}
                        activeStrokeWidth={5}
                        inActiveStrokeWidth={5}
                        progressValueStyle={{ fontWeight: '400', color: 'white' }}
                    /> */}
                        <MarqueeView
                            style={{
                                // backgroundColor: 'blue',
                                // width: wp('49%'),
                                flex: 1,
                                overflow: 'hidden'
                            }}>
                            <Text style={Styles.row_3_col_row_text_2}>{item.title} </Text>
                        </MarqueeView>
                        {(!item.active && !item.is_completed && difDay < 0) ?
                        <Text style={Styles.row_3_col_row_text_4}>{Math.abs(difDay)} days to start</Text>
                        :
                        <Text style={Styles.row_3_col_row_text_4}>{item.days_left} days left</Text>
                        }
                        {(item.active && !item.is_completed) &&
                        <Text style={Styles.row_3_col_row_text_4}>{Config.currency} {round((item.amount_left), 2)} left to spend</Text>
                        }
                    </View> : null}
                    
                    
                </View>

                {/* {!item.circle && <View style={Styles.row_3_col_row}>
                    <Text style={Styles.row_3_col_row_text_2}>{item.title} </Text>
                </View>} */}
            { (item.active && item.is_completed) ?
                <TouchableOpacity style={Styles.btn}>
                    <Text style={Styles.btn_text}>🤙 COMPLETED</Text>
                </TouchableOpacity>
                :
                (item.active && !item.is_completed) ?
                <TouchableOpacity style={Styles.btn}>
                    <Text style={Styles.btn_text}>🙌 GOING GOOD</Text>
                </TouchableOpacity>
                : 
                <TouchableOpacity style={Styles.btn}>
                    <Text style={Styles.btn_text}>STARTING SOON</Text>
                </TouchableOpacity>
            }
            </LinearGradient>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { flexDirection: 'row', flex: 1, width: wp('100%'), paddingHorizontal: wp('5%'), marginVertical: wp('5%') },

    row_3_col: { width: wp('56%'), paddingHorizontal: wp('4%'), borderColor: Colors.green, marginHorizontal: wp('2%'), paddingVertical: wp('5%'), borderRadius: wp('5%'), flex: 1 },
    row_3_col_row: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('5%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('2.5%'), paddingVertical: wp('2%') },
    row_3_col_row_text_4: { color: "#319DB5", fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('1%') ,},
    row_3_col_row_img: { width: wp('8%') },

    btn: {  paddingHorizontal: wp('3%'), paddingVertical: wp('1%'), backgroundColor: '#2B3535', width: wp('35%') , borderRadius: wp('2%'),},
    btn_text: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('3.5%'), textAlign: 'center' },

})
export default ChallengeItem
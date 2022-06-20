import React from 'react';
import { StyleSheet, View, Text, Image, Share, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationService from '../../../../Utils/NavigationService';

import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';

function checkFirstWeek(mJsDate = moment()){
    var str =  Math.ceil(mJsDate.date() / 7)
    return str;
 }
 function startIn(){
    const a = moment().endOf('month');
    const b = moment();
   return 'Next start in '+a.diff(b, 'days')+ ' days later'
 }

const JoinListItem = ({ item , bodyStyle, isIAmIn, index}) => {

    const onShare = async (message) => {
        try {
          const result = await Share.share({
            message: message,
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
        }
    }
    const navClickBudgetChallengeDetailsScreen = ()=>{
        NavigationService.navigate("BudgetChallengeDetailsScreen", {data: item})
    }
     
    return (
        <>
            <View style={[Styles.row_3, bodyStyle, { backgroundColor: item.backgroundColor, borderColor: item.color, borderWidth: 1 }]}>
                <View
                    style={[Styles.row_3_col]}>
                    <View style={Styles.row_3_col_row}>
                        <Text style={Styles.row_3_col_row_text_2}>{(item.title)}</Text>
                
                            <View style={Styles.row_4_col_row}>
                                <FontAwesome name="user-circle-o" color={Colors.white} size={wp('6%')} />
                                <Text style={Styles.row_4_col_row_text}> {"  "} {item?.count} Others Joined</Text>
                            </View>
                            
                        <Text style={Styles.row_3_col_row_text_3}>{item.desc}</Text>
                    </View>
                </View>

            {isIAmIn &&
                <View style={[Styles.row_3_col_row_2, {}]}>
                    <TouchableOpacity onPress={()=>onShare(`${item.title} | Zype`)} style={Styles.btn}>
                        <MaterialCommunityIcons name='share-variant-outline' size={wp('7%')} color={Colors.white} />
                    </TouchableOpacity>
                    {
                        checkFirstWeek() !== 1 ?
                        <TouchableOpacity onPress={()=>{navClickBudgetChallengeDetailsScreen(item)}}>
                             <LinearGradient
                                start={{ x: 0.0, y: 0.4 }} end={{ x: 0.8, y: 0.5 }}
                                locations={[0, 0.0, 0.9]}
                                style={Styles.btn}
                                colors={[Colors.orange20, Colors.orange20, 'rgba(233, 69, 120, 1)']}
                            >
                                <Text style={Styles.row_3_col_row2_text_3}> I am in!  </Text>
                                <MaterialCommunityIcons name='arrow-right-circle' size={wp('7%')} color={Colors.white} />
                            </LinearGradient>
                           
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={Styles.btn}>
                            <Text style={Styles.row_3_col_row2_text_3}> {startIn()}  </Text>
                        </TouchableOpacity>
                    }
                </View>
            }

            </View>
        </>
    )
}
const Styles = StyleSheet.create({
    row_3: { borderRadius: wp('5%'), marginHorizontal: wp('2%'), paddingVertical: wp('2%') },

    row_3_col: { flex: 1, paddingHorizontal: wp('4%'), borderRadius: wp('5%'), padding: wp('3%') },
    row_3_col_row: { marginVertical: wp('2%'), },
    row_3_col_row_text: { color: Colors.white, fontFamily: Fonts.italic, fontSize: wp('4%') },
    row_3_col_row_text_2: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('7%'), marginTop: wp('-2%'), paddingBottom: wp('2%') },
    row_3_col_row_text_3: { color: Colors.white, fontFamily: Fonts.regular, fontSize: wp('3.5%'), paddingVertical: wp('2%'), },
    row_3_col_row_text_4: { color: Colors.white, fontFamily: Fonts.medium, fontSize: wp('4%'), paddingVertical: wp('2%') },
    row_3_col_row_img: { width: wp('8%') },
    row_3_col_row2_text_3: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('3.5%'), paddingVertical: wp('2%'), },

    row_3_col_row_2: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', padding: wp('2%'), alignItems: 'center' },

    btn: { flexDirection: 'row', width: wp('30%'), paddingHorizontal: 10, borderRadius: wp('2%'), alignItems: 'center', justifyContent: 'space-between' },

    row_4_col_row: { flexDirection: 'row', marginLeft: 10 },
    row_4_col_row_text: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('4.3%') },

    tag: { paddingHorizontal: wp('3%'), paddingVertical: wp('2%'), marginVertical: wp('2%') },
})

JoinListItem.defaultProps = {
    bodyStyle: { width: wp('73%') },
    isIAmIn: true,
}
export default JoinListItem
import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ScrollView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Colors from '../../../../Utils/Assets/Colors';
import Fonts from '../../../../Utils/Assets/Fonts';
import LinearGradient from 'react-native-linear-gradient';
import TabLinearButton from '../Components/TabLinearButton';
import TabNormalButton from '../Components/TabNormalButton';
import MyAccountTabs from './MyAccountTabs';
import CreditScoreTab from './CreditScoreTab';

const EmptyAnalyseScreen = () => {
    const [tabSection, setTabSection] = useState(1)
    const toggleButton = (value) => { setTabSection(value) }
    return (
        <SafeAreaView style={Styles.body}>
            <LinearGradient
                colors={[Colors.primary, Colors.black30]}
                style={{ flex: 1, width: wp('100%'), alignItems: 'center' }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>

                    {/* ************** Tab Container Start ********** */}
                    <View style={Styles.tabContainer}>
                        <View style={{borderWidth: 1, borderColor: 'rgba(229,229,229, 0.2)', flexDirection: 'row', borderRadius: wp('3%')}}>
                            <View style={Styles.tabCol}>
                                {
                                    tabSection === 1 ?
                                        <TabLinearButton
                                            title="My Accounts"
                                            buttonStyle={Styles.active}
                                            textStyle={Styles.tabCol_text}
                                            tabValue={1}
                                            handleAction={toggleButton}
                                        />
                                        :
                                        <TabNormalButton
                                            title="My Accounts"
                                            buttonStyle={[Styles.active, { backgroundColor: Colors.primary }]}
                                            tabValue={1}
                                            textStyle={Styles.tabCol_text}
                                            handleAction={toggleButton}
                                        />
                                }

                            </View>
                            <View style={Styles.tabCol}>
                            {
                                tabSection === 2 ?
                                    <TabLinearButton
                                        title="My Credit Score"
                                        tabValue={2}
                                        buttonStyle={Styles.active}
                                        textStyle={Styles.tabCol_text}
                                        handleAction={toggleButton}
                                    />
                                    :
                                    <TabNormalButton
                                        title="My Credit Score"
                                        buttonStyle={[Styles.active, { backgroundColor: Colors.primary }]}
                                        tabValue={2}
                                        textStyle={Styles.tabCol_text}
                                        handleAction={toggleButton}
                                    />
                            }

                        </View>
                        </View>
                    </View>
                    {/* ************** Tab Container Ens ********** */}

                    {/* **************** Main Section Start ************* */}
                    <View style={Styles.mainSection}>
                            
                        { tabSection === 1 ?   <MyAccountTabs /> : <CreditScoreTab toggleButton={toggleButton} /> }
                    </View>
                    {/* **************** Main Section end ************* */}
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    )
}

const Styles = StyleSheet.create({
    body: { backgroundColor: Colors.primary, flex: 1, justifyContent: 'center', alignItems: 'center' },

    tabContainer: { minHeight: wp('15%'), paddingHorizontal: wp('5%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: wp('100%'), marginTop: wp('2%') },
    tabCol: { flex: 1, paddingHorizontal: wp('2%'), paddingVertical: wp('2%') },
    tabCol_text: { color: Colors.white, fontFamily: Fonts.bold, fontSize: wp('4%'), textAlign: 'center' },

    active: { backgroundColor: Colors.black20, paddingVertical: wp('2%'), borderRadius: wp('2%'), paddingHorizontal: wp('2%') },

    mainSection: { flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 10 },

})

export default EmptyAnalyseScreen
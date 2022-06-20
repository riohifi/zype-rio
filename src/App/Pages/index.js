import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { createStackNavigator, CardStyleInterpolators, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Utils/Assets/Colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AnalyseScreen from './AnalyseScreen/AnalyseScreen';
import HomeScreen from './HomeScreen/HomeScreen';
import ShopScreen from './ShopScreen/ShopScreen';
import FeedScreen from './FeedScreen/FeedScreen';
import MyZypeScreen from './MyZypeScreen/MyZypeScreen';
import Images from '../../Utils/Assets/Images'
import Fonts from '../../Utils/Assets/Fonts';
import BudgetChallengeDetailsScreen from './AnalyseScreen/Modules/BudgetChallengeDetailsScreen';
import MonthlyPaymentsScreen from './AnalyseScreen/Modules/MonthlyPaymentsScreen';
import PaymentsDetailsScreen from './AnalyseScreen/Modules/PaymentsDetailsScreen';
import NewSubscriptionScreen from './AnalyseScreen/Modules/NewSubscriptionScreen';
import EmptyAnalyseScreen from './AnalyseScreen/EmptyData/EmptyAnalyseScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const AnalyseStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
      }}
      initialRouteName="AnalyseScreen"
    >
      <Stack.Screen name="AnalyseScreen" component={AnalyseScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="MonthlyPaymentsScreen" component={MonthlyPaymentsScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="PaymentsDetailsScreen" component={PaymentsDetailsScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="BudgetChallengeDetailsScreen" component={BudgetChallengeDetailsScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="NewSubscriptionScreen" component={NewSubscriptionScreen} options={{ headerShown: false, }} />
      <Stack.Screen name="EmptyAnalyseScreen" component={EmptyAnalyseScreen} options={{ headerShown: false, }} />
    </Stack.Navigator>
  )
}

function Pages() {
  return (
    <Tab.Navigator
      initialRouteName="AnalyseStack"
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary, borderTopWidth: 0, position: 'absolute', bottom: 10, marginHorizontal: wp('5%'), borderRadius: wp('2.5%'), flex: 1, alignItems: 'center', },
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarLabelStyle: { padding: 0, margin: 0, },
        // headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        headerRight: () => (
          <View style={{ marginRight: wp('5%'), flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Feather name="settings" color={Colors.white} size={18} />
          </TouchableOpacity>
            <TouchableOpacity style={{marginHorizontal: wp('3%')}}>
              <Image source={Images.bell} style={{width: wp('4.8%'), marginTop: 3}} resizeMode='contain' />
          </TouchableOpacity>
          </View>
        ),
        headerLeft: () => (<View style={{ marginLeft: wp('5%') }}>
          <Image source={Images.logo} style={{ width: wp('23%') }} resizeMode='contain' />
        </View>),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.primary
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen options={{
        title: "Home",
        // tabBarLabel: ({ focused, color }) => (focused && <Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Home</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={{ flexDirection: 'row', backgroundColor: Colors.white, width: wp('18%'), paddingVertical: wp('1%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('1%'), alignSelf: 'center', marginLeft: wp('3%'), marginTop: wp('1.5%'), borderRadius: wp('2%') }}>
              <AntDesign name="home" size={20} color={Colors.red} />
              <Text style={{ color: Colors.red, fontSize: wp('2.5%'), fontFamily: Fonts.regular, textAlign: 'center', marginTop: wp('1%'), marginRight: wp('1%') }}>Home</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', width: wp('18%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('1%'), alignSelf: 'center', marginLeft: wp('3%'), marginTop: wp('1.5%'), borderRadius: wp('2%') }}>
              <AntDesign name="home" size={20} color={Colors.white} />
            </View>
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: -5 },

      }}
        name="HomeScreen" component={HomeScreen} />

      {/* ********************** Shop *********************/}


      <Tab.Screen options={{
        title: "Shop",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Shop</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={{ flexDirection: 'row', backgroundColor: Colors.white, width: wp('18%'), paddingVertical: wp('1%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('2%'), alignSelf: 'center', borderRadius: wp('2%') }}>
              <SimpleLineIcons name="handbag" size={16} color={Colors.red} />
              <Text style={{ color: Colors.red, fontSize: wp('2.5%'), fontFamily: Fonts.regular, textAlign: 'center', marginTop: wp('1%'), marginRight: wp('0%') }}>Shop</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', width: wp('18%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('2%'), alignSelf: 'center', borderRadius: wp('2%'), marginTop: 0 }}>
              <SimpleLineIcons name="handbag" size={16} color={Colors.white} />
            </View>
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 0 },

      }}
        name="ShopScreen" component={ShopScreen} />

      {/* ********************** Analyse *********************/}


      <Tab.Screen options={{
        title: "Analyse",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Analyse</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={{ flexDirection: 'row', backgroundColor: Colors.white, width: wp('20%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('2%'), alignSelf: 'center', borderRadius: wp('2%') }}>
              <Ionicons name="md-grid-outline" size={16} color={Colors.red} />
              <Text style={{ color: Colors.red, fontSize: wp('2.5%'), fontFamily: Fonts.regular, textAlign: 'center', marginTop: wp('0%'), marginRight: wp('0%') }}>Analyse</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', width: wp('20%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('2%'), alignSelf: 'center', borderRadius: wp('2%') }}>
              <Ionicons name="md-grid-outline" size={16} color={Colors.white} />
            </View>
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 0 },

      }}
        name="AnalyseStack" component={AnalyseStack} />


      {/* ********************** My Zype *********************/}

      <Tab.Screen options={{
        title: "My Zype",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>My Zype</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <View style={{ flexDirection: 'row', backgroundColor: Colors.white, width: wp('18%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', borderRadius: wp('2%') }}>
              <MaterialCommunityIcons name="alpha-z" size={20} color={Colors.red} />
              <Text style={{ color: Colors.red, fontSize: wp('2.5%'), fontFamily: Fonts.regular, textAlign: 'center', marginTop: wp('1%'), marginRight: wp('2%') }}>My Zype</Text>
            </View>
            :
            <View style={{ flexDirection: 'row', width: wp('18%'), paddingVertical: wp('1.3%'), justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: wp('2%'), alignSelf: 'center', borderRadius: wp('2%') }}>
              <MaterialCommunityIcons name="alpha-z" size={25} color={Colors.white} />
            </View>
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 0 },

      }}
        name="MyZypeScreen" component={MyZypeScreen} />
    </Tab.Navigator>
  );
}

export default Pages

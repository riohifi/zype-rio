import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View, Button, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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

const Tab = createBottomTabNavigator();


function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="AnalyseScreen"
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary, borderTopWidth: 0 },
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarLabelStyle: { padding: 0, margin: 0, },
        // headerShown: false,
        tabBarLabelPosition: 'beside-icon',
      }}
    >
      <Tab.Screen options={{
        title: "Home",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Home</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <AntDesign name="home" size={18} color={Colors.secondary} />
            :
            <AntDesign name="home" size={18} color={Colors.white} />
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 5 },
        headerRight: () => (
          <View style={{ marginRight: wp('5%') }}><TouchableOpacity><Feather name="settings" color={Colors.white} size={18} /></TouchableOpacity></View>
        ),
        headerLeft: () => (<View style={{ marginLeft: wp('5%') }}>
          <Image source={Images.logo} style={{ width: wp('23%') }} resizeMode='contain' />
        </View>),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.primary
        },
      }}
        name="HomeScreen" component={HomeScreen} />

      {/* ********************** Shop *********************/}


      <Tab.Screen options={{
        title: "Shop",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Shop</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <SimpleLineIcons name="handbag" size={22} color={Colors.secondary} />
            :
            <SimpleLineIcons name="handbag" size={22} color={Colors.white} />
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 5 },
        headerRight: () => (
          <View style={{ marginRight: wp('5%') }}><TouchableOpacity><Feather name="settings" color={Colors.white} size={18} /></TouchableOpacity></View>
        ),
        headerLeft: () => (<View style={{ marginLeft: wp('5%') }}>
          <Image source={Images.logo} style={{ width: wp('23%') }} resizeMode='contain' />
        </View>),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.primary
        },
      }}
        name="ShopScreen" component={ShopScreen} />

      {/* ********************** Analyse *********************/}


      <Tab.Screen options={{
        title: "Analyse",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>Analyse</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <Ionicons name="md-grid-outline" size={18} color={Colors.secondary} />
            :
            <Ionicons name="md-grid-outline" size={18} color={Colors.white} />
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 5 },
        headerRight: () => (
          <View style={{ marginRight: wp('5%') }}><TouchableOpacity><Feather name="settings" color={Colors.white} size={18} /></TouchableOpacity></View>
        ),
        headerLeft: () => (<View style={{ marginLeft: wp('5%') }}>
          <Image source={Images.logo} style={{ width: wp('23%') }} resizeMode='contain' />
        </View>),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.primary
        },
      }}
        name="AnalyseScreen" component={AnalyseScreen} />


      {/* ********************** My Zype *********************/}

      <Tab.Screen options={{
        title: "My Zype",
        tabBarLabel: ({ focused, color }) => (<Text style={{ color: focused ? Colors.secondary : Colors.white, fontFamily: 'Poppins-Medium', fontSize: wp('3%'), }}>My Zype</Text>),
        tabBarIcon: ({ focused }) => (
          focused ?
            <MaterialCommunityIcons name="alpha-z" size={30} color={Colors.secondary} />
            :
            <MaterialCommunityIcons name="alpha-z" size={30} color={Colors.white} />
        ),
        tabBarIconStyle: { marginBottom: 0, marginTop: 5 },
        headerRight: () => (
          <View style={{ marginRight: wp('5%') }}><TouchableOpacity><Feather name="settings" color={Colors.white} size={18} /></TouchableOpacity></View>
        ),
        headerLeft: () => (<View style={{ marginLeft: wp('5%') }}>
          <Image source={Images.logo} style={{ width: wp('23%') }} resizeMode='contain' />
        </View>),
        headerTitle: '',
        headerStyle: {
          backgroundColor: Colors.primary
        },
      }}
        name="MyZypeScreen" component={MyZypeScreen} />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

function Pages() {
  return (
    <Stack.Navigator >
      {/* initialRouteName="Home" */}
      <Stack.Screen name="Home" component={MyTabs} options={{ headerShown: false, }} />
    </Stack.Navigator>
  );
}

export default Pages
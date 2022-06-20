import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../../../Utils/Assets/Colors';

const TabLinearButton = ({ textStyle, title, handleAction, buttonStyle, tabValue, colorGradient }) => {
    return (
        <TouchableOpacity onPress={()=>handleAction(tabValue)}>
            <LinearGradient
                start={{ x: 0.0, y: 0.9 }} end={{ x: 0.8, y: 0.0 }}
                locations={[0, 0.0, 0.8]}
                style={buttonStyle}
                colors={colorGradient}
            >
                <Text style={textStyle}> {title} </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}
TabLinearButton.defaultProps = {
    buttonStyle: null, textStyle: null, title: null, handleAction: () => { }, tabValue: 1, colorGradient: [Colors.cyan, Colors.cyan20, Colors.cyan30]
}

export default TabLinearButton
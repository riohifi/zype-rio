import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

const TabNormalButton = ({ textStyle, title, handleAction, buttonStyle, tabValue })=>{
    return(
        
        <TouchableOpacity style={buttonStyle} onPress={()=>handleAction(tabValue)}>
            <Text style={textStyle}> {title} </Text>
        </TouchableOpacity>
  
    )
}
TabNormalButton.defaultProps = {
    textStyle: null, title : null, handleAction : ()=>{}, buttonStyle: null, tabValue: 1
}

export default TabNormalButton
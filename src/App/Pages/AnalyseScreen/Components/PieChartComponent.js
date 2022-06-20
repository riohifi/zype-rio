import React from 'react';
import {
  Text,
  View,
  Dimensions
} from 'react-native';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { PieChart, YAxis } from 'react-native-svg-charts'
import { Text as SvgText } from 'react-native-svg'
import Colors from '../../../../Utils/Assets/Colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fonts from '../../../../Utils/Assets/Fonts';
import { pickColor, round } from '../../../../Utils/Utils';
 class PieChartComponent extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedSlice: {
        label: '',
        value: ''
      },
      labelWidth: 0
    }
  }
  
  render() {
    const { labelWidth, selectedSlice } = this.state;
    const { label, value } = selectedSlice;
    const keys = this.props.pieNewCategory;
    const values = this.props.pieNewData;
    const sum = values?.reduce((partialSum, a) => partialSum + a, 0);
    const data = keys?.map((key, index) => {
        return {
          key,
          value: values[index],
          svg: { fill: pickColor(index) },
          arc: { outerRadius: (70 + ((100/sum)*values[index])) + '%', padAngle: label === key ? 0.1 : 0 },
          onPress: () => this.setState({ selectedSlice: { label: key, value: values[index] } })
        }
      })
    const deviceWidth = Dimensions.get('window').width

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <SvgText
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'white'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={10}
                    stroke={'black'}
                    strokeWidth={0}
                >
                    {data.key}
                </SvgText>
            )
        })
    }

    return (
        <>
      <View style={{ justifyContent: 'center', flex: 1,}}>
        <PieChart
          style={{ height: 200, marginRight: widthPercentageToDP('-30%')}}
          outerRadius={'80%'}
          innerRadius={'45%'}
          data={data}
        >
            {/* <Labels/> */}
            </PieChart>
        <Text
          onLayout={({ nativeEvent: { layout: { width } } }) => {
            this.setState({ labelWidth: width });
          }}
          style={{
            position: 'absolute',
            left: deviceWidth / 2 - labelWidth / widthPercentageToDP('19%'),
            textAlign: 'center',
            color: '#fff',
            fontFamily: Fonts.regular,
            fontSize: 10,
            width: widthPercentageToDP('20%')
          }}>
          {round(100/sum*value,2) > 0 ? `${label} \n ${round(100/sum*value,2)}%` : null}
        </Text>

        <View style={{position: 'absolute', left: 0}}>
            {
                keys?.map((item, i)=>(<View style={{flexDirection: 'row'}} key={i}>
                    <FontAwesome name='circle' size={20} color={pickColor(i)} style={{marginRight: 10}} />
                    <Text style={{color: Colors.white, marginVertical: 1, fontFamily: Fonts.medium, fontSize: widthPercentageToDP('3.5%')}}>{item}</Text>
                    </View>))
            }
        </View>
          
      </View>
   
      </>
    )
  }
}

export default PieChartComponent;
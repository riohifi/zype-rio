import React, { useEffect, useState } from 'react'
import { BarChart, Grid, YAxis, XAxis } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Circle, G, Line, Rect, Text , Polygon} from "react-native-svg";
import * as scale from 'd3-scale'
import { Dimensions } from 'react-native';
import Fonts from '../../../../Utils/Assets/Fonts';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { round } from '../../../../Utils/Utils';
import Config from '../../../../Utils/Config';
import _ from 'lodash'


const BarChartComponent = (props)=> {

const  { data, dataRaw , activeCat, catList} = props

    const Gradient = () => (
        <Defs key={'gradient'}>
            <LinearGradient id={'gradient'} x1={'0'} y1={'50%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'rgba(16, 73, 101, 1)'}/>
                <Stop offset={'100%'} stopColor={'rgba(14, 45, 61, 1)'} stopOpacity={0.5} />
            </LinearGradient>
        </Defs>
    )
    const GradientTwo = () => (
        <Defs key={'gradientTwo'}>
            <LinearGradient id={'gradientTwo'} x1={'0'} y={'50%'} x2={'0%'} y2={'100%'}>
                <Stop offset={'0%'} stopColor={'rgba(52, 226, 139, 1)'} />
                <Stop offset={'100%'} stopColor={'rgba(33, 165, 165, 1)'} />
            </LinearGradient>

        </Defs>
    )
    
    const Tooltip = ({x, y, bandwidth, data}) => {
        return <>
        {
        data[data.length - 1].value > 0 &&
        <G
            x={ y(bandwidth) - (bandwidth * 0.1) }
            // y={ y(data[data.length - 1].value)/ (bandwidth)}
            y={ y(data[data.length - 1].value)/ 1.8}
            key={ 'tooltip' }
            onPress={ () => console.log('tooltip clicked') }
        >
            <G y={ widthPercentageToDP('8%') }>
            <Rect
                    height={ 35 }
                    width={ 70 }
                    stroke={ 'grey' }
                    fill={ 'white' }
                    rx={5}
                    ry={5}
                />
                <Rect
                    height={ 14 }
                    width={ 40 }
                    fill={ 'white' }
                    skewY={22}
                    x={29.6}
                    ry={3}
                />
                <Text
                    x={ 70 / 2 }
                    dy={ 20 }
                    alignmentBaseline={ 'middle' }
                    textAnchor={ 'middle' }
                    fill={ 'rgb(40, 40, 40)' }
                    fontSize={widthPercentageToDP('3.5%')}
                    fontFamily={Fonts.bold}
                >
                    { `₹${(round((data[data.length-1].value)/ 1000, 2 ))}k` }
                </Text>
            </G>

        </G>
        }
        </>
    }
    
    const Labels = ({  x, y, bandwidth, data }) => (
        data.map((value, index) => {
            // console.log(value)
                return(
                <Text
                    key={ index }
                    x={ x(index) + 5 }
                    y={ y(index/10) + (bandwidth / 2) }
                    fontSize={ 12 }
                    fill={ 'white' }
                    alignmentBaseline={ 'middle' }
                    textAnchor='start'
                    fontWeight="bold"
                >
                    {value.month}
                </Text>
            )
         }
        )
    )
    const LabelsTwo = ({  x, y, bandwidth, data }) => {
       
    const amountArr = [];
    data.map((item)=>{
        amountArr.push(item.value)
    })
        const maxVal = _.max(amountArr)
        const minVal = _.min(amountArr)

       const rang =  _.range(0, maxVal, (maxVal/6) );
        const shortRange = [];
       for (var i = rang.length-1; i >= 0; i--) { 
            shortRange.push(rang[i])
        }
        // console.log('shortRange', shortRange)
       return shortRange.map((value, index) => {
            // console.log(value)
                return(
                <Text
                    key={ index }
                    y={ widthPercentageToDP(index*10.5)}
                    x={(widthPercentageToDP('85%'))}
                    fontSize={ 11 }
                    fill={ 'white' }
                    alignmentBaseline={ 'hanging' }
                    textAnchor='start'
                    fontWeight="bold"
                >
                    {index === 0 && Config.currency}{round((value/1000), 1)}k
                </Text>
            )
         }
        )
        
    }

 
    
        return (
            <>
          
            <BarChart
                style={{ height: heightPercentageToDP('40%'), width: Dimensions.get('window').width, }}
                data={dataRaw}
                animate={true}
                gridMin={0}
                spacingInner={0.6}
                cornerRadius={10}
                svg={{ fill: 'url(#gradient)',  }}
                yAccessor={({ item }) => item.value}
                xAccessor={({item}) => item.value}
                contentInset={{ top: 0, bottom: 50 , right: 80}}
            >
                <Gradient/>
                <GradientTwo/>
                <Tooltip />
                <Labels/>
                <Grid direction={Grid.Direction.HORIZONTAL} svg={{stroke: '#fff', strokeOpacity: 0.1,}}    />
                <LabelsTwo />
            </BarChart>
            {/* <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0}
                    formatLabel={(_, index) => data[ index ].value}
                    svg={{ fontSize: 10, fill: '#fff' }}
                    labelStyle={{ color: 'white' }}
                /> */}
            
            </>
        )
    

}

export default BarChartComponent
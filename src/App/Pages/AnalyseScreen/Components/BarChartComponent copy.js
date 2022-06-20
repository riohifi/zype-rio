import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
import { Defs, LinearGradient, Stop, Circle, G, Line, Rect, Text, YAxis } from "react-native-svg";
import * as scale from 'd3-scale'

class BarChartComponent extends React.PureComponent {

    render() {

        const data = [
            {
                value: 50,
            },
            {
                value: 10,
                svg: {
                    fill: 'rgba(134, 65, 244, 0.5)',
                },
            },
            {
                value: 95,
                svg: {
                    fill: 'url(#gradient)',
                },
            },
            {
                value: 85,
                svg: {
                    fill: 'green',
                },
            },
        ]

        const Gradient = () => (
            <Defs key={'gradient'}>
                <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
                    <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                    <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
                </LinearGradient>
            </Defs>
        )
        
        const Tooltip = ({x, y}) => {
            return <>
            <G
                x={ y(5) - (55 / 3) }
                y={ y(130)}
                key={ 'tooltip' }
                onPress={ () => console.log('tooltip clicked') }
            >
                <G y={ 50 }>
                    <Rect
                        height={ 40 }
                        width={ 70 }
                        stroke={ 'grey' }
                        fill={ 'white' }
                        ry={ 10 }
                        rx={ 10 }
                    />
                    <Text
                        x={ 75 / 2 }
                        dy={ 20 }
                        alignmentBaseline={ 'middle' }
                        textAnchor={ 'middle' }
                        stroke={ 'rgb(134, 65, 244)' }
                    >
                        { `${data[0].value}ºC` }
                        {console.log('rrr', data)}
                    </Text>
                </G>
    
            </G>
            </>
        }

        return (
            <>
            <BarChart
                style={{ height: 300 }}
                data={data}
                gridMin={0}
                svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                yAccessor={({ item }) => item.value}
                contentInset={{ top: 60, bottom: 20 }}
            >
                <Grid/>
                <Gradient/>
                <Tooltip />
            </BarChart>
            {/* <YAxis
                    data={data}
                    yAccessor={({ index }) => index}
                    scale={scale.scaleBand}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacing={0.2}
                    formatLabel={(_, index) => data[ index ].value}
                /> */}
            </>
        )
    }

}

export default BarChartComponent
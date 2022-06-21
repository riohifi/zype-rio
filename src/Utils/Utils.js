import moment from "moment";
import Colors from "./Assets/Colors";
import Images from "./Assets/Images";

export const numberWithCommas = (x)=>{ return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

export function round(num, decimalPlaces = 0) {
    var p = Math.pow(10, decimalPlaces);
    var n = (num * p) * (1 + Number.EPSILON);
    return Math.round(n) / p;
}

export const getBankIcon = (item)=>{
    if(item === "axis.png"){ return Images.axis }
    if(item === "icici.png"){ return Images.icici }
    if(item === "hdfc.png"){ return Images.hdfc }
}
export const getPaymentIcon = (item)=>{
    if(item === "furniture.png"){ return Images.car }
    if(item === "electricity.png"){ return Images.light }
    if(item === "flash.png"){ return Images.light }
}

export const getLastDigit = (num, i=0) => +(num + '').slice(-i);

export function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 1 + ')';
}

export const pickColor = (i)=>{
    switch (i) {
        case 0:
            return 'rgba(169, 74, 222, 1)'
            break;
        case 1:
            return 'rgba(251, 226, 0, 1)'
            break;
        case 2:
            return 'rgba(67, 181, 244, 1)'
            break;
        case 3:
            return 'rgba(44, 201, 150, 1)'
            break;
        case 4:
            return 'rgba(244, 99, 67, 1)'
            break;
        case 5:
            return 'rgba(244, 184, 93, 1)'
            break;
    
        default:
            return 'rgba(0, 0, 0, 1)'
            break;
    }
}

export const daysAgo =(date)=>{
    var now = moment(new Date());
    var end = moment(date);
    // var duration = moment.duration(now.diff(end));
    // var days = duration.asDays();
    return now.diff(end, 'days')
}

export const paymentHistoryIcon =(data, month)=>{
    const tempMonth = data.filter((fl)=>fl.month.toLowerCase() == month.toLowerCase())
    // console.log('data[0]', tempMonth[0])
    if(tempMonth[0] !== undefined && tempMonth[0].month.toLowerCase() === month){
        if(tempMonth[0].status === -1){return 'circle-thin'}
        else if(tempMonth[0].status === 1){return 'close'}
        else{return 'check'}
    }else{
        return 'circle'
    }
}
export const paymentHistoryIconColor =(data, month)=>{
    const tempMonth = data.filter((fl)=>fl.month.toLowerCase() == month.toLowerCase())
    // console.log('data[0]', tempMonth[0])
    if(tempMonth[0] !== undefined && tempMonth[0].month.toLowerCase() === month){
        if(tempMonth[0].status === -1){return Colors.yellow}
        else if(tempMonth[0].status === 1){return Colors.red}
        else{return Colors.success}
    }else{
        return Colors.gray40
    }
}
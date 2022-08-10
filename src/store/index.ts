// 상태 관리 시스템
import axios from 'axios';
import _ from 'lodash';
import { compute_rest_props } from 'svelte/internal';
import {writable} from 'svelte/store';

export const priceData = writable<PriceUnit[]>([]);
export const priceDataNames = writable<string[]>([]);

function getUrl(days: 7 | 30 | 90 | 180 | 360 ){
    return `https://dashboard-mintscan.s3.ap-northeast-2.amazonaws.com/research/market/${days}.csv`
}

export interface PriceUnit{
    demon: string;
    timestamp:number;
    price: number;
    marketCap: number;
    dayVolume: number;
}

export async function updateData(days: 7 | 30 | 90 | 180 | 360 ){
    // get data
    const data = (await axios.get<string>(getUrl(days))).data;
    //table header
    priceDataNames.set( String( data.split('\n').at(0)).replaceAll("\"","").split(','));
    //make table data
    const prices = _(data.split('\n'))   //lodash 객체 만들기
        .drop(1) //앞에서 부터 드랍하려는 요소수가 1 
        .map((l)=>{ //여기서 string[]을 PsriceUnit[]로 매핑해준다.
            const eles = l.split(',');
            return {
                demon: eles[0],
                timestamp: Number(eles[1]),
                price: Number(eles[2]),
                marketCap: Number(eles[3]),
                dayVolume: Number(eles[4]),
            }as PriceUnit;
        })
        .value(); // object --> PriceUnit[]형으로 반환해준다.
    priceData.set(prices);
}


// function a(callback:(data: any)=> void){
//     axios
//         .get('https://dashboard-mintscan.s3.ap-northeast-2.amazonaws.com/research/market/7.csv')
//         .then((res)=>{
//             console.log(res.data);
//         })
//         .catch((e)=>{
//             console.error(e);
//         })
// }
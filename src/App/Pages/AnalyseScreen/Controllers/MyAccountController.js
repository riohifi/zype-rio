import React from 'react'
import Config from '../../../../Utils/Config';
import { del, get, post } from '../../../../Utils/Http';

export const getAnalyseAll = (filter) => {
    return get(`${Config.extendedUrl}accounts-data/1032`, filter).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};

export const postSubscribe = (data) => {
    // console.log(data)
    return post(`${Config.extendedUrl}subscriptions`, data).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};
export const postJoin = (data) => {
    // console.log(data)
    return post(`${Config.extendedUrl}join/challange`, data).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};

export const getScoreAll = (filter) => {
    return get(`${Config.extendedUrl}credit_data/1032`, filter).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};

export const getScoreUpdate = (cid) => {
    return post(`${Config.extendedUrl}process/credit_data/${cid}`).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};

export const getRecurringPayments = () => {
    return get(`${Config.extendedUrl}recurring-payments/1020`).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};

export const deleteRecurringPayments = (id) => {
    return del(`${Config.extendedUrl}recurring-payments/${id}`).then((response) => {
        // console.log('********* response ***', response.data)
        return response.data
    });
};
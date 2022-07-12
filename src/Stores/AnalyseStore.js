
import { types, onSnapshot, flow, applySnapshot, getSnapshot } from 'mobx-state-tree'
import { deleteRecurringPayments, getAnalyseAll, getRecurringPayments, getScoreAll, getScoreUpdate, postJoin, postSubscribe } from '../App/Pages/AnalyseScreen/Controllers/MyAccountController';

const analyseModel = types.model('analyseModel', {
    allAnalyseData : types.optional(types.frozen(), {}),
    allCreditData : types.optional(types.frozen(), {}),
    loanCategory : types.optional(types.frozen(), {}),
    loanDetails : types.optional(types.frozen(), {}),
    recurringPayments : types.optional(types.frozen(), {}),
})
.actions((self)=>({

    getAllAnalyseData: flow(function*(){
        try {
            const resp = yield getAnalyseAll()
            // console.log(resp.data)
            if(resp.status === 'success'){
                applySnapshot(self, {
                    ...self,
                    allAnalyseData: resp.data
                }) 
            }
            
        } catch (error) {
            console.log(error)
        } 
    }),

    postSubscribeData: flow(function*(data){
        // console.log(data)
        // return data
        try {
            const resp = yield postSubscribe(data)
            self.getRecurringPaymentsFunc();
            return resp
            
        } catch (error) {
            console.log(error)
            return {
                data: null,
                status: false
            }
        } 
    }),

    postJoinData: flow(function*(data){
        // console.log(data)
        // return data
        try {
            const resp = yield postJoin(data)
            return resp
            
        } catch (error) {
            console.log(error)
            return error
        } 
    }),

    getAllCreditData: flow(function*(){
        try {
            const resp = yield getScoreAll()
            // console.log(resp.data)
            if(resp.status === 'success'){
                applySnapshot(self, {
                    ...self,
                    allCreditData: resp.data
                }) 
            }
            
        } catch (error) {
            console.log(error)
        } 
    }),

    setLoanCategory: flow(function*(data){
        applySnapshot(self, {
            ...self,
            loanCategory: data
        }) 
    }),

    setLoanDetails: flow(function*(data){
        applySnapshot(self, {
            ...self,
            loanDetails: data
        }) 
    }),

    getUpdateIn: flow(function*(){
        try {
            const resp = yield getScoreUpdate(1032)
            // console.log(resp.data)
            if(resp.status === 'success'){
                applySnapshot(self, {
                    ...self,
                    allCreditData: resp.data
                }) 
            }
            
        } catch (error) {
            console.log(error)
        } 
    }),

    getRecurringPaymentsFunc: flow(function*(){
        try {
            const resp = yield getRecurringPayments()
            // console.log(resp.data)
            if(resp.status === 'success'){
                applySnapshot(self, {
                    ...self,
                    recurringPayments: resp.data
                }) 
            }
            
        } catch (error) {
            console.log(error)
        } 
    }),

    deleteRecurringPaymentsFunc: flow(function*(id){
        try {
            const resp = yield deleteRecurringPayments(id)
            // console.log(resp.data)
            if(resp.status === 'success'){
                // applySnapshot(self, {
                //     ...self,
                //     recurringPayments: resp.data
                // }) 
                self.getRecurringPaymentsFunc();
            }
            
        } catch (error) {
            console.log(error)
        } 
    }),

    // after create
    afterCreate(){ 
        self.getAllAnalyseData();
        self.getAllCreditData();
        self.getRecurringPaymentsFunc();
     },
}))
.views((self)=>({
   
}));

const AnalyseStore = analyseModel.create({
    allAnalyseData: '',
    allCreditData: '',
    loanCategory: null,
    loanDetails: null,
    recurringPayments: null,
})

export default AnalyseStore
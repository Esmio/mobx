import * as service from '../services/betresults.js';
import {routerRedux} from 'dva/router';
import {showToast} from '../common/globalToasts';

export default {
  namespace: 'betresults',
  state: {
    betList: [],
    current: {}
  },
  reducers: {
  	saveBetList(state, action){
      let {current, betItem} = action.payload;
      let {betList} = state
      betList.push(betItem)
      return {...state, betList, current}
    },
    delete(state, action) {
      let {betList} = state;
      let arr = betList.slice()
      arr.splice(action.payload,1)
      return {...state, betList:arr}
    },
    clearList(state, action) {
      let betList = [];
      return {...state, betList}
    }
  },
  effects: {
  	*bet({payload}, {call, put}){
      const {data} = yield call(service.bet, payload);
      if(data && data.transactionId){
        yield put(routerRedux.replace({
          pathname: '/success'
        }))
      }else {
        showToast('投注失败！')
      }
    }
  },
  subscriptions: {
  	
  },
};

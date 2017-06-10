import * as service from '../services/startLotto';

export default {
  namespace: 'startLotto',
  state: {

  },
  reducers: {
  	save(state, action) {
  		return {...state, ...action.payload}
  	}
  },
  effects: {
  	*results({payload}, {call, put}) {
  		const {data} = yield call(service.resultsRecord, payload);
  		const {gameNameInChinese, gameUniqueId, navigationBar} = payload
  		yield put({ type: 'save', payload: {resultsData : data, ...{gameNameInChinese, gameUniqueId, navigationBar}}})
  	}
  },
  subscriptions: {
  	setup({dispatch, history}) {
      history.listen(({pathname, query})=>{
        if(pathname==='/trend') {
          dispatch({type:'results', payload: query})          
        }
      })
    }
  },
};

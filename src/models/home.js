import * as service from '../services/home';

export default {
  namespace: 'home',
  state: {
    buyLotteryDisplay: true,
  },
  reducers: {
  	save(state, action) {
  		return {...state, ...action.payload}
  	},
    changeDisplay(state) {
      return {...state, buyLotteryDisplay:!state.buyLotteryDisplay}
    },
    tabChange(state, action) {
      return {...state, selectedTab: action.payload}
    }
  },
  effects: {
  	*fetch({payload},{call, put}) {
  		const {data} = yield call(service.homeData)
  		yield put({ type: 'save', payload: {...data}})
  	},
  	*winner({payload}, { call, put }) {
  		const {data} = yield call(service.winnerData)
  		yield put({type: 'save', payload:{prizeList:data}})
  	},
    *lotteryOption({payload}, {call, put}) {
      const {data} = yield call(service.buyLotteryData)
      yield put ({type: 'save', payload: {buyLotteryData: data}} )
    },
    *startLotto({payload}, {call, put}) {
      const {data} = yield call(service.startLottoData)
      yield put({type: 'save', payload: {startLottoData: data}})
    },
    *login({payload}, {call, put}) {
      const {data} = yield call(service.login, payload)
    },
  },
  subscriptions: {
  	setup({dispatch, history}) {
  		return history.listen(({pathname, query})=>{
  			if (pathname === '/home') {
  				dispatch({type: 'fetch'})
  				dispatch({type: 'winner'})
          dispatch({type: 'lotteryOption'})
          dispatch({type: 'startLotto'})
  			}
  		})
  	}
  },
};

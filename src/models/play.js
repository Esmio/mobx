import * as service from '../services/play.js';

export default {
  namespace: 'play',
  state: {
  	results: [],
    clickedMap: {},
    gameUniqueId: '',
    gameMathString: '',
    digits: [],
    balls: [],
    betConfirmDisplay: 'none',
    number: 0,
    allGamesPrizeSettings: null,
    betStr: '', 
    selectedDigit: ['S','G']

  },
  reducers: {
    save(state, action) {
      return {...state, ...action.payload}
    },
  	saveResult(state, action) {
  		let {resultsStr, clickedMapStr} = action.payload,
        results = JSON.parse(resultsStr),
        clickedMap = JSON.parse(clickedMapStr);
  		return {...state, results, clickedMap}
  	},
    currentDigitsAndBalls(state, action) {
      return {...state, ...action.payload}
    },
    clearResult(state, action) {
      let results = [],
        clickedMap = {},
        digit = [];
      return {...state, results, clickedMap, digit}
    },
    // @TODO 合并重复reducers
    getGameId(state, action) {
      return {...state, ...action.payload}
    },
    getGameMathString(state, action) {
      return {...state, ...action.payload}
    },
    betConfirmDisplay(state, action) {
      return {...state, ...action.payload}
    }
  },
  effects: {
    *getGameSettingsData({payload}, { call, put }) {
      const {data} = yield call(service.gamesettingsData)
      yield put({type: 'save', payload: data})
    },
    *getCurrentLotteryData({payload}, { call, put }) {
      const {data} = yield call(service.currentLotteryData, payload)
      yield put({type: 'save', payload: {countData: data}})
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/play'||pathname==='play') {
          dispatch({ type: 'getGameId', payload: query })
          dispatch({ type: 'getGameSettingsData'})
          dispatch({ type: 'getCurrentLotteryData', payload: query})
        }
      })
    }
  },
};

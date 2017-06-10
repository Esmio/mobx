import * as service from '../services/mine';
import { Toast } from 'antd-mobile';
import {showToast} from '../common/globalToasts';
import {routerRedux} from 'dva/router';

export default {
	namespace: 'mine',
	state: {
		singleDetailData: {},
		detailData: {},
		topUpData: {},
		withdrawals: {},
		ordersList: {},
		orderDetailData: {}
	},
	reducers: {
		save(state, action) {
			return { ...state, ...action.payload }
		}
	},
	effects: {
		*fetch({ payload }, { call, put }) {
			const { data } = yield call(service.mineData)
			yield put({ type: 'save', payload: { userData: data } })
		},
		*refresh({ payload }, { call, put }) {
			console.log('刷新余额')
		},
		*checkBalance({payload}, {call, put}) {
			const {data} = yield call(service.balanceData)
			const {balance} = data
			const {totalAmount} = payload
			if(balance > totalAmount) {
				yield put({type: 'betresults/bet', payload})
			}else {
				showToast('余额不足！');
			}
		},
		*getAccountDetails({}, {call, put}) {
			const {data} = yield call(service.detailData)
			yield put({ type: 'save', payload: { detailData: data } })
		},
		*getTopUpDetail({payload}, {call, put}){
			const {data} = yield call(service.orderHistory, payload)
			yield put({type: 'save', payload: {topUpData: data}})
		},
		*getWithdrawals({payload}, {call, put}){
			const {data} = yield call(service.withdrawalsHistory, payload)
			yield put({type: 'save', payload: {withdrawals: data}})
		},
		*getOrdersList({payload}, {call, put}){
			payload = payload || '0'
			const {data} = yield call(service.ordersList, payload)
			yield put({type: 'save', payload: {ordersList: data.datas}})
		},
		*getOrderDetail({payload}, {call, put}){
			const {data} = yield call(service.orderDetailData, payload)
			console.log(data)
			yield put({type: 'save', payload: {orderDetailData: data}})
			yield put(routerRedux.push({
				pathname: 'orderdetail'
			}))
		},
		*restPassword({payload}, {call, put}){
			console.log('mode-payload', payload)
			const data = yield call(service.resetPassword, payload.postData)
			console.log(data)
		}
	},
	subscriptions: {
		setup({ dispatch, history }) {
			return history.listen(({ pathname, query }) => {
				if (pathname === '/home'|| pathname === 'home') {
					dispatch({ type: 'fetch', payload: query })
				}else if(pathname === '/topupdetail' || pathname === 'topupdetail') {
					dispatch({ type: 'getTopUpDetail'})
				}else if(pathname === '/medetail' || pathname === 'medetail'){
					dispatch({type: 'getAccountDetails'})
				}else if(pathname === '/withdrawals' || pathname === 'withdrawals'){
					dispatch({type: 'getWithdrawals'})
				}else if(pathname === '/orderlist' || pathname === 'orderlist'){
					dispatch({type: 'getOrdersList'})
				}
			})
		}
	},
};

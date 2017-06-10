import request from '../utils/request';
import requestMethod from './requestMethod';
import requestConfig from '../common/requestConfig';

const token  = localStorage.getItem("access_token");

export async function mineData() {
	console.log(token)
	
	return request('api/v1/account/webapi/account/users/current', {
		method:'get',
		headers:{
			'Authorization': `bearer ${token}`,
		}
	})
}

export async function balanceData(){
	return request(`api/v1/balance/me`, {
		method: 'get', 
		headers: {
			'Authorization': `bearer ${token}`,
		}
	})
}

export async function detailData(){
	return request(`api/v1/balance/me/history?access_token=${token}`)
}

export async function orderHistory(payload){
	payload = payload || '';
	return request(`/api/v1/cashmgt/me/transfer/orderhistory?type=TOPUP&pageSize=20&start=0&state=${payload}&access_token=${token}`)
}

export async function withdrawalsHistory(payload){
	payload = payload || ''
	return request(`/api/v1/cashmgt/me/transfer/orderhistory?type=WITHDRAWAL&pageSize=20&start=0&state=${payload}&access_token=${token}`)
}

export async function ordersList(buttonIndex){
	const dict = ['WIN,LOSS,PENDING','WIN','PENDING','LOSS','WIN,LOSS']
	let state = dict[buttonIndex]
	return request(`api/v1/orderdata/me/orders/findByState?state=${state}&pageSize=20&currentPage=0&access_token=${token}`)
}

export async function orderDetailData(query){
	return request(`api/v1/orderdata/me/orders/findByTimeuuid?transactionTimeuuid=${query}&access_token=${token}`)
}

export async function resetPassword(postData) {
	console.log('serversid', postData, 'dhdhd')
	return request(`api/v1/account/webapi/account/users/change/password`,{
		method: 'post', 
		headers: {
			'Authorization': `bearer ${token}`,
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(postData)
	})
}
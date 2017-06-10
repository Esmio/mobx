import request from '../utils/request';

export async function homeData() {
  return request('/api/v1/cms/internal/mobile/31/contents');
}

export async function winnerData() {
	return request('/api/v1/orderdata/me/orders/findTopWinners?clientId=31')
}

export async function buyLotteryData() {
	return request('/api/v1/result/service/mobile/results/current')
}

export async function startLottoData() {
	return request('/api/v1/result/service/mobile/results/lastOpen')
}

export async function login(params) {
	return request('/api/v1/account/webapi/account/users/login/', {
		"method": "post",
	  "headers":{
	    "content-type":"application/json",
	  },
		"body": JSON.stringify(params)
	})
}

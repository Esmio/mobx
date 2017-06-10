import request from '../utils/request';

export async function gamesettingsData() {
	return request('/api/v1/adminsettings/user/gamessettings/31')
}

export async function currentLotteryData(query) {
	return request('/api/v1/result/service/mobile/results/currentTwo/' + query.gameUniqueId)
}
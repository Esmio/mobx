import request from '../utils/request';
import requestMethod from './requestMethod';

export async function resultsRecord(params){
	if(!params.gameUniqueId) {
		params.gameUniqueId='X3D'
	}
	return request(`/api/v1/result/service/mobile/results/hist/${params.gameUniqueId}?limit=40`)
}
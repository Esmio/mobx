import request from '../utils/request';

export async function bet(params) {
	const token  = localStorage.getItem("access_token");
	return request('/api/v1/ordercap/me', {
		"method": "post",
	  "headers":{
	    "content-type":"application/json",
		'Authorization': `bearer ${token}`
	  },
		"body": JSON.stringify(params)
	})
}

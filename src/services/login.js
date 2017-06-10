import request from '../utils/request';
import requestMethod from './requestMethod';
import {SecretUtils} from '../utils/secretHash';

const bcrypt = new SecretUtils();

export async function login(params) {

	let hash = await getHash(params)

	params.hash = hash

	console.log('params',params)

	return request('/api/v1/account/webapi/account/users/login', {
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(params)
    })
}
function getHash(params) {
	return new Promise(resolve => {
		bcrypt.encode(params.username, params.password, (hash)=>{
			resolve(hash)
		})
	})
}

export async function register(params) {
	let hash = await getHash(params)
	params.hash = hash
	const token  = localStorage.getItem("access_token");
	return request('/api/v1/account/webapi/account/users/register', {
		method: 'post',
		headers: {
			"Content-Type": "application/json",
			'Authorization': `bearer ${token}`
		},
		body: JSON.stringify(params)
	})
}

export async function loginout(){
	const token = localStorage.getItem("access_token");
	console.log(token)
	return request(`api/v1/account/account/system/logout?access_token=${token}`)
}
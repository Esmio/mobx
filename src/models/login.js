import * as service from '../services/login';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'login',
  state: {
  	isLogin: false
  },
  reducers: {
  	isLogin(state, action) {
      const isLogin = true
			const {oauthToken} = action.payload.loginData;
			const access_token = oauthToken.access_token;
			if(access_token){
				localStorage.setItem('access_token', oauthToken.access_token);
			}
  		return {...state, ...{isLogin}, ...action.payload}
  	},
  	isLoginOut(state, action) {
      const isLogin = false
  		return {...state, ...{isLogin}, ...action.payload}
  	}
  },
  effects: {
  	*login({payload},{call, put}) {
  		const {data} = yield call(service.login, payload)
  		if(data.oauthToken) {
  			yield put({ type: 'isLogin', payload: {loginData:data}})
				yield put(routerRedux.push({
          pathname: '/home'
        }))
  		}else if(data.logref==="error") {
  			yield put({ type: 'isLogin', payload: {loginData:data}})
        yield put(routerRedux.push({
          pathname: '/home'
        }))
  		}
  	},
    *register({payload}, {call, put}){
      const {data} = yield call(service.register, payload)
      if(data.oauthToken) {
        yield put({ type: 'isLogin', payload: {loginData:data}})
        yield put(routerRedux.push('/home'))
      }else if(data.logref==="error") {
        yield put({ type: 'isLoginOut', payload: {loginData:data}})
      }
    },
    *loginout({}, {call, put}){
      const {data} = yield call(service.loginout)
      if(data.message==='success'){
        yield put({ type: 'isLoginOut', payload: {loginData:data}})
        yield put(routerRedux.push('/'))
      }

    }
  },
  subscriptions: {
  	setup({dispatch, history}) {
  		return history.listen(({pathname, query})=>{
  			if (pathname === '/login') {
          dispatch({type: 'login', payload:{hash:'', username:'', password:''}})
  			}
  		})
  	}
  },
};

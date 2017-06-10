import fetch from 'dva/fetch';
import {showToast} from '../common/globalToasts';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    if(response.status === 204){
      
      return  {'message': 'success'}
    }
    return response.json();
  }else if(response.status >= 400) {
    if(response.status === 500) {
      showToast('服务器开小差，请稍后再试！')
      throw new Error("服务器内部错误");
    }else if(response.status === 401) {
      showToast('请重新登录！')
      throw new Error("401")
    }else if(response.status === 404) {
      throw new Error("404")
    }else if(response.status === 422) {
      showToast('投注错误！')
    }
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(data => ({ data }))
    // .catch(err => ({ err }));
}

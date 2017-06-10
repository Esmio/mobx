export const requestMethod ={
  post:function (params) {
    const token  = localStorage.getItem("access_token");
    return {
      method:"post",
      headers:{
        "content-type":"application/json",
        "Authorization": `bearer ${token}`,
      },
      body:params
    }
  },
  get:function () {
    const token  = localStorage.getItem("access_token");
    return {
      method:'get',
      headers:{
        'Authorization': `bearer ${token}`,
      }
    }
  },
  put:function (params) {
    const token  = localStorage.getItem("access_token");
    return {
      method:'put',
      headers:{
        "Content-Type":"application/json",
        'Authorization': `bearer ${token}`,
      },
      body:params
    }
  },
  del:function (params) {
    const token  = localStorage.getItem("access_token");
    return {
      method:'delete',
      headers:{
        "Content-Type":"application/json",
        'Authorization': `bearer ${token}`,
      },
      body:params
    }
  }
};
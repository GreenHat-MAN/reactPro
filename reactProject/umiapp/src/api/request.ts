import axios from 'axios'
import {message} from "antd";
import {history} from "umi";
export const baseURL = 'http://localhost:3000/'
// axios 的配置  request=axios
export const request = axios.create({
    timeout:60000,  // 超时
    baseURL,  // 项目的基本路径
    headers:{
        // Authorization:'AUTH_TOKEN',
        // 'Content-Type':'application/x-www-form-urlencoded'  // 设置请求的数据格式
    }
})

let loading:unknown = null
export function ShowLoading(msg='加载中'){
    message.destroy()
    message.loading(msg,0)
}

export function ShowSuccess(msg='成功'){
      message.destroy()
      message.success(msg)
}

export function ShowFail(msg='失败'){
    message.destroy()
    message.error(msg)
}
// 后面封装代码

// Interceptors 拦截器   全局统一
// 请求的拦截器   (请求发送之前做的事情)
request.interceptors.request.use(function (config:any) {
    const token = sessionStorage.getItem("wh_token") || ''  // 获取token
    config.headers.token = token;  // 把token 返回给服务器端  请求头 headers
    ShowLoading()
    return config;
}, function (error) {
// 请求失败做的事情
    ShowFail('网络异常')
return Promise.reject(error);
});

// 响应的拦截器
request.interceptors.response.use(function (response) {
    // 响应成功的拦截器
    // ShowSuccess() 手机端APP不需要成功的提示
    // console.log(response.data)
    if(response.data.code==200){
        ShowSuccess(response.data.msg)
    }else{
        ShowFail(response.data.msg)
    }
    return response;
  }, function (error) {
    // 响应失败
    ShowFail('服务器异常')
    return Promise.reject(error);
  });


// axios 增删改查
// get post delete patch

export function get(url:string,params?:object,headers?:any){
    return new Promise((resolve,reject)=>{
        return request({
            url,
            method:"GET",
            params,
            headers,
        }).then(res=>{
            resolve(res.data)  // 不需要再 点data
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url:string,data?:object,params?:object,headers?:any){
    return new Promise((resolve,reject)=>{
        return request({
            url,
            method:"POST",
            data,
            params,
            headers,
        }).then(res=>{
            resolve(res.data )
        }).catch(err=>{
            reject(err)
        })
    })
}


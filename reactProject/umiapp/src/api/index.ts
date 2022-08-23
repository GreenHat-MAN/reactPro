import {get,post } from './request';
// 接口的服务层
interface Log{
  username:string|number,
  password?:string|number,
  [propName:string]:any
}
export const Ajax = {
    testApi:(params:any)=>get("/api/test",params), //测试接口

    register:(data:any)=>post("/api/register",data), //注册接口
    //
    logins: (data: Log)=>post("/api/login",data), //登录接口

    bandpass:(data:any)=>post('/api/bandpass',data), //修改密码
    //
    userAll:(data:any)=>post("/api/getAll",data), //获取用户全部信息
    //
    getuser:(data:any)=>post('api/getUser',data), //获取整个数据库用户信息
    //
    updateAll:(data:any)=>post("/api/updateInfo",data), //修改用户信息
    //
    // updateRole:(data)=>post("/api/updateRole",data), //修改角色权限
    //
    getRole:(data:any)=>post("/api/getrole",data), //获取角色权限信息
    //
    getImgs:(data:any)=>post("/api/uploads",data),   //上传用户头像
    //
    delAll:(data:any)=>post("api/deleteInfo",data), //删除方法
    //
    updatePlus:(data:any)=>post("api/updatePlus",data), //修改方法
    //
    // addAuition:(data)=>post("/api/addAudition",data), //添加面试题
    //
    // searchAuition:(data)=>post("/api/searchAudition",data), //查询面试题
    //
    uploadfiles:(data:any)=>post("/api/uploads",data), //上传图片


    // // 学科
    addxueke:(data:any)=>post("/api/addxueke",data),
    updatexueke:(data:any)=>post("/api/updatexueke",data),
    removexueke:(data:any)=>post("/api/removexueke",data),
    findxueke:(data:any)=>post("/api/findxueke",data),
    //
    // // 班级
    addbanji:(data:any)=>post("/api/addbanji",data),
    findclass:(data:any)=>post("/api/findclass",data),
    removeclass:(data:any)=>post("/api/removeclass",data),
    updateclass:(data:any)=>post("/api/updateclass",data),
    //
    //
    // // 评论
    // adddis:(data)=>post("/api/addDis",data), //添加评论
    // finddis:(data)=>post("/api/findDis",data), //查询全部评论
    //
    //
    // // 通知
    addtongzhi:(data:any)=>post("/api/public",data), //添加公告记录

    sercherpublic:(data:any)=>post("/api/serPub",data), //查询通知
    //
    //
    // // 意见
    // addAdvise:(data)=>post("/api/addvise",data), //添加意见
    // findAdvise:(data)=>post("/api/findAddvise",data), //查询意见
    //
    //
    // // 成绩
    // addScore:(data)=>post("/api/addScore",data), //添加学生成绩
    // searchScore:(data)=>post("/api/findManyScore",data), //查询学生全部成绩
    // findScore:(data)=>post("/api/findScore",data), //查询单个学生成绩
    //
    //
    // // 考勤
    // addAttend:(data)=>post("/api/attend",data), //添加考勤记录
    // findAttend:(data)=>post("/api/allAttend",data), //查看全部考勤记录
    // searchAttend:(data)=>post("/api/myAttend",data), //查看单人考勤记录
    // upAttend:(data)=>post("/api/updAttend",data), //修改考勤记录


      // 面试题
      addms:(data:any)=>post("/api/addms",data),

      findms:(data:any)=>post("/api/findms",data),

      findmsone:(data:any)=>post("/api/findmsone",data),
}

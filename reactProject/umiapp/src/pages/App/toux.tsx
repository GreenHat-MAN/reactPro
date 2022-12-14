import React, { FC, useRef } from 'react'
import {Avatar, Tooltip} from "antd"
import { observer } from 'mobx-react'
import { UserOutlined } from '@ant-design/icons';
import { useStore } from '@/mobx/context';
import {Ajax} from "@/api";
import {baseURL} from "@/api/request";

const Toux:FC = () => {
  const {PublicDte:{userInfo,changeUserInfo}} = useStore()  // 自定义HOOKS
  const fileRef:any = useRef()
  const startUpload = ()=>{
    fileRef.current.click()
  }
  const uploadImage = async  ()=>{
    let file = fileRef.current.files[0]
    let data = new FormData()
    data.append("file",file)
    // 上传文件
    let res:any = await Ajax.uploadfiles(data)
    if(res.code==200){
      // 修改后台数据
      let value:any  = await Ajax.updateAll({
        avatar:res.path
      })
      if(value.code==200){
        // 修改本地的userInfo;
        userInfo.avatar = res.path;
        changeUserInfo(userInfo)
      }
    }
  }
  return (
    <Tooltip title="上传头像">
      <div style={{cursor:'pointer'}}>
        <input type="file" style={{display:'none'}} onChange={uploadImage}  ref={fileRef}  />
        {
          userInfo?<Avatar onClick={startUpload} src={userInfo[0]?.avatar?.replace(/public/,baseURL+'static')} />
            :<Avatar onClick={startUpload} icon={<UserOutlined />} />
        }

      </div>
    </Tooltip>
  )
}

export default observer(Toux)

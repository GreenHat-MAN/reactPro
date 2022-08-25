import React, {useEffect, useState} from 'react';
import {Row,Col,Typography, Carousel, Space, Dropdown, Menu, Tooltip, Button, Modal, Tag} from "antd";
import {ProBreadcrumb} from '@ant-design/pro-components';
import './heard.scss';
import {DownOutlined,SmileOutlined,PoweroffOutlined,ExclamationCircleOutlined} from '@ant-design/icons';
import {inject, observer} from 'mobx-react';
import {toJS} from "mobx";
import Toux from "@/pages/App/toux";
import {history} from "umi";
import { ModalForm, ProFormText } from '@ant-design/pro-components';
const Heard:React.FC<{publicDte?:any}>=({publicDte}) =>{
  const {userInfo,changeUserInfo,roleList} = publicDte
  const {Title} = Typography
  const [visible,setvisible] = useState<boolean>(false)
  const onMenuClick = (item:any)=>{
    if(item.key=='changepass'){
      // 弹框
      setvisible(true)
    }else{
      // 跳转页面
    }
  }
  const menu = (
    <Menu
      onClick={onMenuClick}
      items={[
        {
          key: '/app/home',
          label:"首页",
          icon: <SmileOutlined />,
        },
        {
          key: '/app/anno',
          label:"公告",
          icon: <SmileOutlined />,
        },
        {
          key: '/app/mine',
          label: "个人中心",
          icon: <SmileOutlined />,
        },
        {
          key: 'changepass',
          danger: true,
          label: '修改密码',
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
  const logoutAction = ()=>{
    Modal.confirm({
      title: '友情提示',
      icon: <ExclamationCircleOutlined />,
      content: '你真的要注销登录吗?',
      cancelText:"取消",
      okText:"确定",
      onOk:()=>{
        changeUserInfo(null)
        history.replace("/login")
      },
      onCancel() {},
    });
  }
  return (
    <>
      <ModalForm
        width={'40%'}
        title="修改密码"
        visible={visible}
        submitter={{
          searchConfig: {
            submitText: '确认',
            resetText: '取消',
          },
        }}
        onFinish={async (values) => {
                setvisible(false)
        }}
      >
        <ProFormText
          width="md"
          name="password"
          label="旧密码"
          disabled={true}
          initialValue={'123'}
        />

        <ProFormText width="md" name="newPassword" label="新密码" placeholder="请输入新密码" />
        <ProFormText width="md" name="dbNewPassword" label="确认新密码" placeholder="请输入新密码" />
      </ModalForm>
      <Row>
        <Col span={7}>
          <Title style={{margin:0}} className="title"> 后台管理系统 </Title>
        </Col>
        <Col span={8} offset={2}>
          <Carousel dotPosition={'right'} autoplay dots={false}>
            <div  style={{height:'46'}}>
              <h3 className="contentStyle">只要卷不死</h3>
            </div>
            <div  style={{height:'46'}}>
              <h3 className="contentStyle">就往死里卷</h3>
            </div>
            <div  style={{height:'46'}}>
              <h3 className="contentStyle">$$$$$$$$$</h3>
            </div>
          </Carousel>
        </Col>
        <Col span={7} className="right">
          {
            userInfo&&<Space className="info">

              <Tag color={
                roleList.find((item:any)=>item.value==userInfo[0]?.role)?.color}>
                {roleList.find((item:any)=>item.value==userInfo[0]?.role)?.text}
              </Tag>

              <Dropdown overlay={menu}>
                <Space>
                      <span >
                          {userInfo[0]?.stuName}
                      </span>
                  <DownOutlined />
                </Space>
              </Dropdown>
              <Toux></Toux>
              <Tooltip title="注销登录">
                <Button onClick={logoutAction} icon={<PoweroffOutlined/> } size={'middle'} shape="circle"  danger></Button>
              </Tooltip>
            </Space>
          }
        </Col>
      </Row>
      <ProBreadcrumb  style={{fontSize:20,marginBottom:20}} />
    </>

  );
}

export default inject('publicDte')(observer(Heard));

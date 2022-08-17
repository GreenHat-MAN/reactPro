import React from 'react';
import './login.scss'
import axios from 'axios';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input,message  } from 'antd';
import {history, NavLink} from "umi";
import {inject} from "mobx-react";
interface params{
  username:string|number,
  password:string|number
}
const Login:React.FC<{publicDte:any,props:any}> = ({props,publicDte}) => {
  //mobx数据
  const {userInfo,changeUserInfo} = publicDte
  // console.log(count)
  const onFinish = async (values: any) => {
    const value:params = {
      username:values.username,
      password:values.password
    }
    let res = await axios.get(
      'http://47.92.127.166:3233/login',
      {params:value}
    );
    if(res.data.length>0){
      changeUserInfo(res.data)
      history.push('/app/main')
    }else{
      message.error('用户名或密码错误');
    }
  };
  return (
    <div className="box">
      <div className="img">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>

            <NavLink className="login-form-forgot" to={'/bandpass'}>
              忘记密码?
            </NavLink>

          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            Or <NavLink to={'/register'}>
            去注册?
          </NavLink>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default inject('publicDte')(Login) ;

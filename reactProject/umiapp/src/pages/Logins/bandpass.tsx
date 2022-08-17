import React, {useEffect, useRef, useState} from 'react';
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  message
} from 'antd';
import {reg} from "@/utils/validate";
import axios from "axios";
import {history} from "umi";
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

const Bandpass:React.FC=(props:any)=> {
  const intervalHandle:any = useRef()
  const [form] = Form.useForm();
  const [disabled,setdisabled] =useState<boolean>(false)
  const [count,setcount] = useState<number>(60)
  const countRef = useRef(count)
  countRef.current=count

  //发送验证码
  const sendCap = ()=>{
    if(reg.phone.test(form.getFieldValue('phone'))){
        sendCapture()
        setdisabled(true)
        setcount(count-1)
      intervalHandle.current=setInterval(()=>{
          if (countRef.current>0){
            setcount(count=>count-1)
          }else{
            setcount(60)
            setdisabled(false)
            clearInterval(intervalHandle.current)
          }
      },1000)
    }else{
      message.error('请输入正确的手机号');
    }
  }

  //发送验证码具体方法
  const sendCapture = async ()=>{
    let data=await axios.get('http://47.92.127.166:3233/login',{params:{phone:form.getFieldValue('phone')}});
      if(data.data.length>0){
        let res= await axios.get('http://121.196.235.163:3000/captcha/sent',{
          params:{
            phone:form.getFieldValue('phone')
          }
        })
        message.success('验证码发送成功!!!');
      }else{
        message.error('该手机号未注册!!!');
      }
  }

  //销毁定时器
  useEffect(()=>{
    return()=>{
      clearInterval(intervalHandle.current)
    }
  },[])

  //找回密码方法
  const onFinish = async (values: any) => {
    // console.log('Received values of form: ', values);
    let res = await axios.get('http://121.196.235.163:3000/captcha/verify',{
      params:{
        phone:values.phone,
        captcha:values.captcha
      }
    })
    if(res.data.code==200){
        let data = await axios.patch('http://47.92.127.166:3233/login',{
          values
        }).then(r=>{
          message.success('找回成功!!!')
          history.replace('/login')
        })
    }else{
      message.error('验证码错误!!!')
    }
  };

  return (
    <div className="box">
      <div className="img">
          <Form
            form={form}
            onFinish={onFinish}
          >

            <Form.Item
              name="phone"
              label="手机号"
              rules={[
                { required: true, message: '请输入该账号绑定的手机号!', whitespace: true },
                {pattern:reg.phone ,message: '手机号格式不正确!' ,whitespace: true}
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label="新密码"
              rules={[
                {
                  required: true,
                  message: '请输入新的密码!',
                },
              ]}
              hasFeedback
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label="验证码" extra="我们得确保是您本人.">
              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    name="captcha"
                    noStyle
                    rules={[
                      { required: true, message: '请输入收到得验证码!' },
                      {pattern:reg.code,message: '请输入4位验证码'}
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Button onClick={sendCap}  disabled={disabled}> {disabled?count+`S后可重新发送`:'发送验证码'}</Button>
                </Col>
              </Row>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>

          </Form>
      </div>
    </div>
  );
}

export default Bandpass;

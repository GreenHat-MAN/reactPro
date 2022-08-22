import { Ajax } from '@/api';
import { ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import {history} from "umi";
import {Form, message} from "antd";
import {reg} from "@/utils/validate";
import { useStore } from '@/mobx/context';
import { observer } from 'mobx-react';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const UserAdd:React.FC=(props:any)=> {
  const {PublicDte:{roleList}} = useStore()
  return (
    <div>
      <ProForm
        onFinish={async (values) => {
          await waitTime(2000);
          let res = await Ajax.register(values) as any;
          if(res.code==200){
            history.push("/app/user/userlist")
          }
        }}
        onFinishFailed={()=>{
          message.error('请填写有效的用户数据信息')
        }}
        initialValues={{
          password: 'qwe123',
        }}
      >
        <ProFormText
          width="md"
          name="username"
          label="用户名"
          tooltip="不能为空"
          placeholder="请输入用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            }
          ]}
        />
        <ProFormText
          width="md"
          name={'password'}
          label="密码"
          placeholder="请输入密码"
          disabled
        />
        <ProFormText
          width="md"
          name={'phone'}
          label="手机号"
          placeholder="请输入手机号"
          rules={[
            {
              required: true,
              message: '请输入手机号！',
            },
            {
              pattern: reg.phone,
              message: '手机号格式错误！',
            },
          ]}
        />

        <Form.Item noStyle shouldUpdate>
          {(form) => {
            return (
              <ProFormSelect
                options={roleList.map((item:any)=> {
                  return {
                    label:item.text,
                    value:item.value
                  }
                })}
                width="md"
                name="role"
                label={'用户角色'}
                rules={[
                  {
                    required: true,
                    message: '请选择角色!',
                  }
                ]}
              />
            );
          }}
        </Form.Item>
      </ProForm>
    </div>
  );
}

export default observer(UserAdd);

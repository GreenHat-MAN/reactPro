import React from 'react';
import { Button, Form, Input, Mentions } from 'antd';
import {useStore} from "@/mobx/context";
import {Ajax} from "@/api";
import moment from "moment";
const Msgadd:React.FC=(props)=> {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const {PublicDte:{userInfo}} =useStore()
  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      let res = await Ajax.addAdvise({
        time:moment(new Date()).format('YYYY-MM-DD'),
        ...values
      }) as any
      if(res.code==200){
        form.resetFields();
      }
    } catch (errInfo) {
      console.log('Error:', errInfo);
    }
  };
  return (
    <div>
      <Form form={form} layout="horizontal" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="建议人"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          initialValue={userInfo[0].stuName}
        >
          <Input disabled={true}  />
        </Form.Item>
        <Form.Item
          name="advise"
          label="建议内容"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          rules={[{ required: true }]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 6 }}>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
          &nbsp;&nbsp;&nbsp;
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Msgadd;

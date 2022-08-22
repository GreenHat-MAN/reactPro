import React, {useEffect, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Col, DatePicker, Drawer, Form, Input, message, Row, Select, Space} from 'antd';
import { Collapse } from 'antd';
import {Ajax} from "@/api";
import {baseURL} from "@/api/request";
import '../App/heard.scss'

const AuutionList:React.FC=(props:any)=> {
  const [form] = Form.useForm();
  const { Option } = Select;
  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse;
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish= async (values:any) => {
    // console.log(values)
    let res= await Ajax.addtongzhi(values) as any
    if(res.code==200){
      form.resetFields();
      setVisible(false);
      getText()
    }
  }

  const onReset = () =>{
    form.resetFields();
  }

  const [text,setText] = useState<any>([])
  const getText = async () =>{
    let res=await Ajax.sercherpublic({}) as any
    if (res.code==200){
      setText(res.result)
    }
  }
  useEffect(()=>{
    getText()
  },[])

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  return (
    <div>
      <Button className="btn" type="primary" onClick={showDrawer} icon={<PlusOutlined />}>
        添加新的通知
      </Button>
      <Drawer
        title="Create a new account"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
          </Space>
        }
      >

        <Form {...layout} form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name='name' label="通知标题" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name='region' label="选择部门" rules={[{ required: true }]}>
            <Select defaultValue="教师办公室" style={{ width: 120 }}>
              <Option value="校长办公室">校长办公室</Option>
              <Option value="后勤">后勤</Option>
              <Option value="学生会">学生会</Option>
              <Option value="教师办公室">教师办公室</Option>
            </Select>
          </Form.Item>
          <Form.Item name='time' label="发布时间" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name='desc' label="通知详情" rules={[{ required: true }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>

            <Button htmlType="button" onClick={onReset}>
              Reset
            </Button>
          </Form.Item>
        </Form>


      </Drawer>
      <Collapse accordion>
        {
          text.map((item:any,index:number)=>{
            return(
              <Panel header={item.name} key={index}>
                <div>
                  <h1>{item.name}</h1>
                  <p>{item.content}</p>
                  <p><img src={item.image[0]?item.image[0].replace('public',baseURL+'static'):''} alt={''} />{item.region}发布于{item.time},望周知!!!</p>
                </div>
              </Panel>
            )
          })
        }
      </Collapse>
    </div>
  );
}

export default AuutionList;

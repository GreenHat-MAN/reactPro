import { Ajax } from '@/api';
import {ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Form, Input, message, Radio, Space, Tag} from 'antd';
import React, {useEffect, useRef, useState } from 'react';
import {reg} from "@/utils/validate";
import {useStore} from "@/mobx/context";
import {observer} from "mobx-react";
import './user.scss'
type userItem = {
  url:string;
  _id:string
  id:number;
  stuName:string;
  stuPassword:string;
  stuPhone:string;
  role:number;
  time:string;
  number:number
}
const UserList:React.FC=(props:any)=> {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [ulist, setUlist] = useState<any>([])
  const [form] = Form.useForm();
  const {PublicDte:{roleList}}=useStore()
  const getUserList = async (payload?: any) => {
    let res = await Ajax.getuser(payload) as any;
    if (res.code == 200) {
      setUlist(res.result)
    }
  }
  useEffect(() => {
    getUserList()
  }, [])


  //点击查看
  const viewUser = () =>{
    console.log('666')
  }

  //选择操作
  const options = async (value: any, row: userItem, index: number) =>{
      if(value=='delete'){
        // console.log(row,index)
        let res = await Ajax.delAll(row._id) as  any
        if(res.code==200){
          ulist.splice(row,1)
          message.success('删除成功!!')
        }
      }else if(value='copy'){
        console.log('复制操作')
      }else{
        message.error('选择有误!!!')
      }
  }

  //搜索
  const onFinish = async (values: any) => {
    let res=await Ajax.userAll(values) as any
    if (res.code==200){
        setUlist((ulist:any)=>{return res.result})
    }else{
      message.error('查无此人')
    }
  };

  //重置
  const onReset = () =>{
    form.resetFields()
    getUserList()
  }

  const column:ProColumns<userItem>[]=[
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title:'姓名',
      dataIndex:'stuName',
      copyable:true,
      ellipsis:true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title:'密码',
      dataIndex:'stuPassword',
      search:false
    },
    {
      title:'手机号',
      dataIndex:'stuPhone',
      copyable:true,
      ellipsis:true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
          {pattern:reg.phone,message: '请填写正确的手机号'}
        ],
      },
    },
    {
      disable: true,
      title: '用户权限',
      dataIndex: 'role',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
            <Tag color={roleList.find((item:any)=>item.value==record.role).color}>
              {roleList.find((item:any)=>item.value==record.role).text}
            </Tag>
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'time',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_,row,index,action) => [
        <a
          key={row.id}
          onClick={() => {
            action?.startEditable?.(row.id);
          }}
        >
          编辑
        </a>,
        <a onClick={viewUser}>
          查看
        </a>,
        <TableDropdown
          key={row._id}
          onSelect={(value:any) => {
            options(value,row,index)}}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];

  const actionRef = useRef<ActionType>();



  return (
    <div>

      <div className="search">
        <Form
          className="laySer"
          form={form}
          onFinish={onFinish}
        >
          <Form.Item label="用户名" name="stuName" rules={[{ required: true }]}>
            <Input placeholder="请输入用户名"  />
          </Form.Item>
          <Form.Item label="手机号" name="stuPhone" rules={[{ required: true },{pattern:reg.phone,message:"请输入正确手机号"}]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>
          <Form.Item className="btn">
            <Button className="btn1"  htmlType="button" onClick={onReset}>
              Reset
            </Button>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="table">
        <ProTable<userItem>
          columns={column}
          actionRef={actionRef}
          cardBordered
          request={async (params = {}, sort, filter) => {
            return {
              data:ulist,
              success:true
            }
          }}
          editable={{
            type: 'single',
            editableKeys,
            onSave: async (key,row)=>{
              let res = await Ajax.updateAll(row) as any
              if(res.code==200){
                message.success('保存成功!!!')
              }
            },
            onChange: setEditableRowKeys,
          }}
          columnsState={{
            onChange(value) {
              console.log('value: ', value);
            },
          }}
          rowKey="id"
          search={false}
          options={{
            setting: {
              listsHeight: 400,
            },
          }}
          form={{
            // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          }}
          pagination={{
            pageSize: 5,
            onChange: (page) => console.log(page),
          }}
          dateFormatter="string"
          headerTitle="高级表格"
          toolBarRender={() => [

          ]}
        />
      </div>
    </div>
  )
}

export default observer(UserList);

import React, {useState} from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import {Button, Dropdown, Menu, message, Popconfirm, Space, Tag} from 'antd';
import { useRef } from 'react';
import { request } from 'umi';
import {Ajax} from "@/api";
type GithubIssueItem = {
  url: string;
  _id: string;
  id:number;
  num: number;
  xueke: string;
  name: string;
  year: number;
  value:string;
};

const  Classlist:React.FC=(props:any) => {

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const confirm = async (row:any,action:any) => {
    let res = await Ajax.removeclass({_id:row._id}) as any
    if (res.code==200){
      message.success('Click on Yes');
      action.reload
    }
  };

  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '班级',
      dataIndex: 'xueke',
      copyable: true,
      ellipsis: true,
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
      title: '学年',
      dataIndex: 'year',
      search:false
    },
    {
      title: '班级编号',
      dataIndex: 'num',
      search:false
    },
    {
      title: '班级详情',
      dataIndex: 'name',
      search:false
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (_,row,index,action) => [
        <a
          onClick={() => {
            action?.startEditable?.(row._id);
          }}
        >
          编辑
        </a>,
        <Popconfirm
          title="确认删除嘛?"
          onConfirm={()=>confirm(row,action)}
          okText="Yes"
          cancelText="No"
        >
        <a key="delete">
          删除
        </a>
        </Popconfirm>,
      ],
    },
  ];

  const actionRef = useRef<ActionType>();
  return (
    <ProTable<GithubIssueItem>
      key="formkey"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        const res=await Ajax.findclass(params) as any;
        return {
          data: res.result,
          success:true
        }
      }}
      editable={{
        type: 'single',
        editableKeys,
        onSave: async (key,row)=>{
          let res = await Ajax.updateclass(row) as any
          if(res.code==200){
            message.success('保存成功!!!')
          }
        },
        onDelete:async (_id,type)=>{
          await Ajax.removeclass({_id:_id})
        },
        onChange: setEditableRowKeys,
      }}
      columnsState={{
        persistenceKey: 'xueke',
        persistenceType: 'localStorage',
        onChange(value) {
          // console.log('value: ', value);
        },
      }}
      rowKey={(key:any)=>key._id}
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="班级列表"
      toolBarRender={() => [
      // 底部
      ]}
    />
  );
}

export default Classlist;

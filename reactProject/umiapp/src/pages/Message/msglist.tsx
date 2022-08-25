import React, {useEffect, useRef, useState} from 'react';
import {Button, Form, Input, List, Modal, Skeleton, Typography} from 'antd';
import {Ajax} from "@/api";
import './index.scss'
import {useFetchData} from "@ant-design/pro-components";
import {useStore} from "@/mobx/context";
import {values} from "mobx";
const count = 1;
const Msglist:React.FC=(props)=> {
  const {PublicDte:{userInfo}} = useStore()
  const [form] = Form.useForm();
  const { TextArea } = Input;
  let [mess,setmess] = useState('')
  let messRef = useRef('')
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [list, setList] = useState<any[]>([]);
  const getmessage = async () =>{
    let res = await Ajax.findAdvise({}) as any
    setData(res.result);
    setList(res.result);
  }

  useEffect(()=>{
    setInitLoading(false);
    getmessage()
  },[])

  useEffect(()=>{
    messRef.current=mess;
  },[mess])


  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat([...new Array(count)].map(() => ({ loading: true, name: {}, advise: {} }))),
    );
    Ajax.findAdvise({}).then((res:any)=>{
      const newData = data.concat(res.result);
      setData(newData);
      setList(newData);
      setLoading(false);
      window.dispatchEvent(new Event('resize'));
    })
  };


  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

  const toEdit = (item:any,index:number) =>{
    form.resetFields()
    messRef.current=item.advise
    setIsModalVisible(true);
  }

  const toDel = async (item:any,index:number) =>{
    let res = Ajax.deladvise({_id:item._id}) as any
    if(res.code == 200){
      window.onload
    }
  }


  const onFinish = async (values:any) => {
    // let res = await Ajax.updateadvise({name:userInfo.stuName,advise:values})
    form.resetFields()
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalVisible(false);
  };

  return(
    <>

      <Modal title="修改意见" visible={isModalVisible} onOk={()=>onFinish(form.getFieldValue('advise'))} onCancel={handleCancel}>
          <Form form={form}>
            <Form.Item
              name="advise"
              label="意见"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
              rules={[{ required: true }]}
              initialValue={mess}
            >
              <TextArea  />
            </Form.Item>
          </Form>
      </Modal>

      <List
        className="demo-loadmore-list"
        header={<div>意见列表</div>}
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        bordered
        dataSource={list}
        renderItem={(item:any,index:number) => (

          <List.Item
            actions={[ userInfo[0].stuName==item.name&&<a key="list-loadmore-edit" onClick={()=>toEdit(item,index)}>edit</a>, userInfo[0].stuName==item.name&&<a key="list-loadmore-more" onClick={()=>toDel(item,index)}>delete</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                title={item.name}
                description={item.advise}
              />
              <div>content</div>
            </Skeleton>
          </List.Item>

        )}
      />
    </>
  )
}

export default Msglist;

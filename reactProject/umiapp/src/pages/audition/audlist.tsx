import { observer } from 'mobx-react';
import React,{ useEffect } from 'react';
import { useStore } from '@/mobx/context';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { ProList } from '@ant-design/pro-components';
import { Button, Tag ,Row,Col } from 'antd';
import { cateTypes, diffTypes } from '@/utils';
import { history } from 'umi';
const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <span>
      {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
    </span>
);
const Audlist:React.FC=(props:any)=> {
  const { PublicDte:{userInfo,msList, changeMsList}} = useStore()
  useEffect(() => {
    changeMsList()
  }, [])
  return (
    <div>
      <Row>
        <Col span={24}>
          <ProList<{ title: string }>
            toolBarRender={() => {
              return [
                <Button key="3" type="primary" onClick={()=>{
                  history.push("/app/audition/myaudition")
                }}>
                  新建
                </Button>,
              ];
            }}
            itemLayout="vertical"
            rowKey={
              (item:any)=>item._id
            }
            headerTitle="面试广场"
            dataSource={msList}
            metas={{
              title: {},
              description: {
                render: (text,item:any) => (
                  <>
                    <Tag color={diffTypes.find((v:any)=>v.value==item.type)?.color}>{diffTypes.find((v:any)=>v.value==item.type)?.label}</Tag>
                    <Tag color={cateTypes.find((v:any)=>v.value==item.cate)?.color}>{cateTypes.find((v:any)=>v.value==item.cate)?.label}</Tag>
                    <Tag>{item.cate}</Tag>
                  </>
                ),
              },
              actions: {
                render: (text,item:any) => [
                  <IconText icon={StarOutlined} text={item.collect || 0 } key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text={item.like || 0} key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text={item.ping || 0}    key="list-vertical-message" />,
                ],
              },
              extra: {
                render: (text:any,item:any) => (
                  <div>
                    <Button onClick={()=>history.push("/app/ms/detail/"+item._id)} danger size="small">查看详情</Button>
                    {item.author.stuName==userInfo?.username && <Button onClick={()=>history.push("/app/ms/update/"+item._id)} danger size="small">修改</Button>}
                  </div>

                ),
              },
              content: {
                render: (text,item:any) => {
                  return (
                    // <div>
                    //     {item.content}
                    // </div>
                    <div dangerouslySetInnerHTML={{__html:item.content}}>

                    </div>
                  );
                },
              },
            }}
          />
        </Col>
      </Row>
    </div>
  )
}

export default observer(Audlist);

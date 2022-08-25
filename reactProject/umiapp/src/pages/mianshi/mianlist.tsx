import React, {createElement, useEffect, useState} from 'react';
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import {Col, Layout, List, Menu, Row, Spin,Comment, Tooltip, Avatar, Form, Button, Input} from 'antd';
import './index.scss'
import {Ajax} from "@/api";
import moment from 'moment';
import {useStore} from "@/mobx/context";
import {observer} from "mobx-react";

interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}
interface EditorProps {
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
  submitting: boolean;
  value: string;
}

interface CommentItem {
  author: string;
  avatar: string;
  content: React.ReactNode;
  datetime: string;
}

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, submitting, value }: EditorProps) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentList = ({ comments }: { comments: CommentItem[] }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);


const { Header, Content, Footer, Sider } = Layout;

const Mianlist:React.FC=(props)=> {
  const {PublicDte:{userInfo}} = useStore()
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [data,setdata] = useState([])
  const [list,setlist] = useState<any>([])
  const [dissuss,setdiscuss] =useState<any>([])
  const getMian = async ()=>{
    let res = await Ajax.searchAuition({}) as any
    if (res.code = 200){
      setdata(res.result)
    }
  }

  const getDiss = async (id:any)=>{
    let data = await Ajax.finddis({titleId:id}) as any
    if (data.code == 200){
      setdiscuss(data.result)
    }
  }

  const getmianinfo =  async (id:any) =>{
    let res = await Ajax.seaaution({_id:id}) as any
    if(res.code == 200){
      setlist(res.result)
    }
  }

  const toinfo = async (id:any) =>{
    if (list.length>0){
          setlist([])
          setdata([])
    }else{
      getmianinfo(id)
      getDiss(id)
    }
  }

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  const handleSubmit = async (_id:any) => {
    if (!value) return;
    let res = await Ajax.adddis({
      content:value,
      name:userInfo[0].stuName,
      time:new Date(),
      titleId:_id,
      avater:'https://joeschmoe.io/api/v1/random'
    }) as any
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue('');
      setComments([
        ...comments,
        {
          author: userInfo[0].stuName,
          avatar: 'https://joeschmoe.io/api/v1/random',
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(()=>{
    getMian()
    getDiss('62ef309ff3d55fd4a0a26e6e')
    getmianinfo('62ef309ff3d55fd4a0a26e6e')
  },[])

  return(
    <div className="main">
        <Row style={{
          background: 'white'
        }}>
          <Col span="6">
            <List
              style={{cursor:'pointer'}}
              size="large"
              bordered
              dataSource={data}
              renderItem={(item:any) => <List.Item onClick={()=>toinfo(item._id)}>{item.subject}</List.Item>}
            />
          </Col>

          <Col style={{overflow: 'auto',maxHeight:'600px'}} span="17"  offset="1">
            <Content className="lazy">
                <p>{list.subject}</p>
                <p>
                  {list.content}
                </p>
              <br/>
            {/*  评论*/}
              <Editor onChange={handleChange}
                      onSubmit={()=>handleSubmit(list._id)}
                      submitting={submitting}
                      value={value}
              />
              {comments.length > 0 && <CommentList comments={comments} />}
              {
                dissuss.map((item:any,index:any)=>{
                  return(
                    <div key={item._id}>
                      <Comment
                        actions={actions}
                        author={<a>{item.name}</a>}
                        avatar={<Avatar src={item.avater} alt={item.name} />}
                        content={
                          <p>{item.content}</p>
                        }
                        datetime={
                          <Tooltip title={moment(item.time).format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment(item.time).fromNow()}</span>
                          </Tooltip>
                        }
                      />
                    </div>
                  )
                })
              }

            </Content>

          </Col>

        </Row>

    </div>
    )
}

export default observer(Mianlist);

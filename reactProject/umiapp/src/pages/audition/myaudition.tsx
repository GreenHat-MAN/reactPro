import React, {  useState , useRef  } from 'react';
import { Steps, Row, Col, Button } from 'antd';
import { ProForm, ProFormDependency, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { reg } from '@/utils/validate';
import { cateTypes, diffTypes } from '@/utils';
import RichEditor from './RichEditor';
import { observer } from 'mobx-react';
import { useStore } from '@/mobx/context';
import { Ajax } from '@/api/';
import { history } from 'umi';
const { Step } = Steps;
const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const Myaudition:React.FC=()=> {
  let [current, setCurrent] = useState<any>(0)
  let [obj,setObj ] = useState<any>({})   //
  let [content,setContent] = useState<any>('')
  let [answer,setAnswer] = useState<any>(null)
  let {PublicDte:{userInfo}} = useStore()

  let formRef:any = useRef()

  const list = [
    { title: "基本信息", description: "面试题题目的难易和分类" },
    { title: "题目内容", description: "可以发布你的面试题目或者截图" },
    { title: "设置答案", description: "你可以选择是否要设置答案" },
    { title: "提交", description: "谢谢你的分享" }
  ]

  // 上一步
  const goPrev = () => {
    if (current > 0) {

      setCurrent(--current)
    }
  }
  // 下一步
  const goNext = async () => {
    if (current !== list.length - 1) {
      if(current==0){
        console.log(formRef.current)
        let res = await formRef.current?.validateFields() as any;
        console.log(res)
        setObj(res)
        setCurrent(current+1)
      }
      if(current==1){
        if(content){
          console.log(content)
          setCurrent(current+1)
        }else{
          message.error("请务必填写面试题目内容")
        }
      }
      if(current==2){
        setCurrent(current+1)
      }
    }
  }

  const todoSubmit = async ()=>{
    let res = await Ajax.addms({
      author:userInfo,
      ...obj,
      answer:answer,
      content:content,
      score:answer?10:0
    }) as any;
    if(res.code ==200){
      history.push("/app/ms/list")
    }
  }
  return (
    <div>
      <Row>
        <Col span={23}>
          <Steps current={current}>
            {
              list.map((item: any, index) => {
                return (
                  <Step title={item.title} description={item.description} />
                )
              })
            }
          </Steps>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div style={{ width: '100%', minHeight: 360, background: '#fff', marginTop: 20 ,border:'1px solid #ddd'}}>
            {
              <div className="item one" style={{display:current==0?"block":'none'}} >
                <ProForm
                  formRef={formRef}
                  submitter={
                    {
                      resetButtonProps:{style:{display:'none'}},
                      submitButtonProps:{
                        style:{display:'none'}
                      }
                    }
                  }
                  onFinishFailed={
                    ()=>{
                      console.log("123")
                    }
                  }
                >
                  <ProFormText
                    width="md"
                    name="title"
                    label="题目"
                    placeholder="请输入"
                    rules={[
                      {
                        required: true,
                        message: '请输入题目',
                      }
                    ]}
                  />
                  <ProFormSelect
                    options={diffTypes}
                    width="md"
                    name="type"
                    label={'题目难度'}
                    rules={[
                      {
                        required: true,
                        message: '请选择',
                      }
                    ]}
                  />
                  <ProFormSelect
                    options={cateTypes}
                    width="md"
                    name="cate"
                    label={'分类'}
                    rules={[
                      {
                        required: true,
                        message: '请选择',
                      }
                    ]}
                  />
                </ProForm>
              </div>
            }
            {
              <div className="item one"  style={{display:current==1?"block":'none'}} >
                <RichEditor
                  getContent={(html:any)=>setContent(html)}
                />
              </div>
            }
            {
              <div className="item one"  style={{display:current==2?"block":'none'}}>
                <RichEditor
                  getContent={(html:any)=>setAnswer(html)}
                />
              </div>
            }
            {
              <div className="item one"  style={{display:current==3?"block":'none'}} >

              </div>
            }
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          {
            current != 0 && <Button type="primary" style={{ margin: 10 }} onClick={goPrev}>上一步</Button>
          }
          {
            current !== list.length - 1 && <Button danger onClick={goNext}>下一步</Button>
          }
          {
            current == list.length - 1 && <Button type="primary" onClick={todoSubmit}>提交面试题目</Button>
          }
        </Col>
      </Row>
    </div>
  )
}

export default Myaudition;

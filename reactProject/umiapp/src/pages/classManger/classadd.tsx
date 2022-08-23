import {ProFormDatePicker, ProFormInstance } from '@ant-design/pro-components';
import {
  ProFormDateRangePicker,
  ProFormSelect,
  ProFormText,
  StepsForm,
} from '@ant-design/pro-components';
import type { Moment } from 'moment';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {observer} from "mobx-react";
import {useStore} from "@/mobx/context";
import {Ajax} from "@/api";
import {values} from "mobx";
import {message} from "antd";

type FormValue = {
  jobInfo: {
    name: string;
    xueke: number;
  };
  syncTableInfo: {
    year: string;
    num: string;
  };
};

const Classadd:React.FC=(props:any)=> {
  const {PublicDte:{userInfo}} =useStore()
  const [nums,setnum] =useState<any>([])
  useEffect(()=>{
    getxueke()
  },[])
  const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
  const formValue: FormValue = {
    jobInfo: {
      name: userInfo[0]?.stuName,
      xueke: 1,
    },
    syncTableInfo: {
      year: moment(new Date()).format('YYYY'),
      num: '请选择班级序号',
    },
  };
  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formValue);
      }, time);
    });
  };

  const [xueke,setxueke] = useState<any>([])
  let obj:any=[]
  const getxueke = async ()=>{

    let res = await Ajax.findxueke({}) as any
    if (res.code==200){setxueke(res.result)}
    for (let i=1;i<20;i++){
      obj.push({value:i})
    }
    setnum(obj)
  }

  const num:any = nums

  const jobType:any = xueke


  useEffect(() => {
    waitTime(1000).then(() => {
      // 编辑场景下需要使用formMapRef循环设置formData
      formMapRef?.current?.forEach((formInstanceRef) => {
        formInstanceRef?.current?.setFieldsValue(formValue);
      });
    });
  }, []);

  return (
    <StepsForm
      formMapRef={formMapRef}
      onFinish={async (values) => {
        let res:any = await Ajax.addbanji({
          xueke:values.jobInfo.xueke,
          num:values.syncTableInfo.num,
          year:values.syncTableInfo.year
        })
        return Promise.resolve(true);
      }}
    >
      <StepsForm.StepForm name="step1" title="添加班级">
        <ProFormText label="执行人" disabled={true} name={['jobInfo', 'name']} />
        <ProFormSelect label="选择班级" name={['jobInfo', 'xueke']} options={jobType} />
      </StepsForm.StepForm>
      <StepsForm.StepForm name="step2" title={'班级详情'}>
        <ProFormDatePicker  label="选择班级年份" name={['syncTableInfo', 'year']} />
        <ProFormSelect label="班级序号" name={['syncTableInfo', 'num']} options={num} />
      </StepsForm.StepForm>
    </StepsForm>
  );
}

export default observer(Classadd);

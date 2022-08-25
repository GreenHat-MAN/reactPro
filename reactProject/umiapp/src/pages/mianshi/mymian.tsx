import React, {useEffect, useState} from 'react';
import { Carousel } from 'antd';
import {Ajax} from "@/api";
import {useStore} from "@/mobx/context";
import moment from 'moment';
import { observer } from 'mobx-react';
const contentStyle: React.CSSProperties = {
  color: 'black',
  background: 'white',
  height: '650px',
  display:'flex',
  flexDirection:'column',
  justifyContent:'center',
  alignItems:'center'
};


const Mymian:React.FC=(props) => {

  const {PublicDte:{userInfo}} = useStore()
  const [list,setList] =useState<any>([])

  const getMian = async () =>{
    let res = await Ajax.searchAuition({stuName:userInfo.stuName}) as any
    if (res.code == 200){
      setList(res.result)
    }
  }

  useEffect(()=>{
    getMian()
  },[])

  return (
    <div className="lunbo">
      <Carousel effect="fade" autoplay  >
        {
          list.map((item:any,index:any)=>{
            return(
              <div key={item._id} >
                <h3 style={contentStyle}>
                  <h1>{item.subject}</h1>
                  <p>{item.content}</p>
                  <p>{ moment(item.releaseTime).format('YYYY-MM') }</p>
                </h3>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
}

export default observer(Mymian);

import React, {FC, useRef,useState} from 'react';
import './index.scss'
import Img from '../../assets/images/none.png';
import { useEffect } from 'react';
import { history } from 'umi';
export interface SpanType {
  left:string,
  top:string,
  transform:string,
  animationDelay:string,
  background:string
}

const NotFound:FC<any>=()=>{
  const bgstar:any = useRef()  // useRef 类型定义
  let [count,setCount] = useState<number>(5)
  let timer:any  = null
  // let [spanNum,setSpanNum] = useState<Array<SpanType>>([])
  let [spanNum,setSpanNum] = useState<SpanType[]>([])
  const goBck = ()=>{
    history.replace('/login')
  }
  const state = {
    imgSrc:Img
  }
  const styles:{ box: {} }={
    box:{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}
  }

  const timeDown = ()=>{
    setCount(--count)
    timer = setInterval(()=>{
      if(count>0){
        setCount(--count)
      }else{
        clearInterval(timer)
        timer=null
        goBck()
      }
    },1000)
  }

  const spanNumInit = ()=>{
    var width = bgstar.current.clientWidth;
    var height:any  = document.getElementById("bgstar")?.clientHeight;
    console.log(width,height)

    for(var i=0;i<520;i++){
      var left = Math.round(width * Math.random())
      var top = Math.round(height * Math.random())
      var rate = Math.random() * 2.5 // 频率
      var scaler = Math.random() * 1.5
      var r = 255;
      var g = 255;
      var b = 255;
      var opacity = Math.random()

      spanNum.push({
        left:left+'px',
        top:top+'px',
        transform:`scale(${scaler})`,
        animationDelay:rate+'s',
        background:`rgba(${r},${g},${b},${opacity})`
      })
    }
    setSpanNum([...spanNum])
  }


  useEffect(()=>{
    timeDown()
    spanNumInit()


    return ()=>{
      clearInterval(timer)
      timer=null
    }
  },[])

  return (
  <div className="errorpage" ref={bgstar} id="bgstar">
    <div className="down" onClick={goBck}>剩余 { count } S </div>
    <img src={state.imgSrc} alt="" className="myimg tada1" />
    {
      spanNum.map((l,i)=>{
        return (
          <span key={i} className="spandot" style={l}> </span>
        )
      })
    }
  </div>
  );
}

export default NotFound;

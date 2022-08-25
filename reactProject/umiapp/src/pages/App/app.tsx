import {DefaultFooter, PageContainer, ProLayout,ProBreadcrumb} from '@ant-design/pro-components';
import React, {useEffect, useRef, useState} from 'react';
import defaultProps from '../../router/propRouter'
import Heard from "@/pages/App/heard";
import {Link} from "umi";
import {inject, observer} from "mobx-react";
import {Ajax} from "@/api";
const App=(props:any)=> {
  const {getRoleListAsync,roleList,userInfo} = props.publicDte;
  const [pathname, setPathname] = useState('/app/main');
  let {route:{routes}} = defaultProps

  // 根据role 返回 对应的用户路由数据
  const getRouterList = (arr:any,role:any)=>{
    let newList = arr.filter((it:any) =>role>=it.role);
    newList.forEach((it:any) => {
      if (it.routes) {
        return (it.routes = getRouterList(it.routes, role));
      }
    });
    return newList;
  }

  const getUser = async () =>{
    let res = await Ajax.userAll({}) as any
    if (res.code == 200){
      defaultProps.route.routes=getRouterList(routes,res.result[0].role)
    }
  }


  useEffect(()=>{
    getRoleListAsync()
    getUser()
  },[])


  return (
    userInfo&&<div>
      <ProLayout
        {...defaultProps}
        style={{
          minHeight: '100vh',
        }}

        breadcrumbRender={(defaultProps = []) => [
          {
            path: '/',
            breadcrumbName: '根',
          },
          ...defaultProps,
        ]}

        location={{
          pathname,
        }}



        menuItemRender={(item, dom)=>(
          <p onClick={() => {
            setPathname(item.path || '/app');
          }}>
            {item.icon}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {item.name}
            <Link to={item.path?item.path:'/app'}></Link>
          </p>
        )}

        headerContentRender={()=>(
            <Heard></Heard>
        )}

        footerRender={() => (
          <DefaultFooter
            copyright="华夏第一剑研究开发中心"
          />
        )}
      >


        <PageContainer
          style={{width:'100%',height:'100%',overflow:'hidden'}}
          header={{
            title:'',
          }}
          breadcrumbRender={false}
        >
          {props.children}
        </PageContainer>


      </ProLayout>
    </div>
  );
}

export default inject('publicDte')(observer(App));

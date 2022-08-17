import {DefaultFooter, PageContainer, ProLayout,ProBreadcrumb} from '@ant-design/pro-components';
import React, {useState} from 'react';
import defaultProps from '../../router/propRouter'
import Heard from "@/pages/App/heard";
import {Link, NavLink} from "umi";
const App:React.FC=(props:any)=> {
  const [pathname, setPathname] = useState('/app/main');
  return (
    <div>
      <ProLayout
        {...defaultProps}
        style={{
          height: '100vh',
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
            &nbsp;&nbsp;&nbsp;
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

export default App;

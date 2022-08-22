import { AntDesignOutlined, CrownOutlined, SmileOutlined, TabletOutlined } from '@ant-design/icons';
export default {
  route: {
    path: '/app',
    component:'@/pages/App/app',
    routes: [
      {
        path:'/app',
        redirect:'/app/main'
      },
      {
        path:'/app/main',
        name: '主页',
        breadcrumbName:'主页',
        icon: <SmileOutlined />,
        role:0,
        component:'@/pages/Home/main'
      },
      {
        path: '/app/user',
        name: '用户页',
        icon: <CrownOutlined />,
        redirect:'/app/user/userList',
        routes: [
          {
            path: '/app/user/userlist',
            name: '用户列表',
            breadcrumbName:'用户列表',
            role:5,
            icon: <CrownOutlined />,
            component: '@/pages/user/userList',
          },
          {
            path: '/app/user/useradd',
            name: '添加用户',
            role:4,
            breadcrumbName:'添加用户',
            icon: <CrownOutlined />,
            component: '@/pages/user/userAdd',
          },
        ],
      },
      {
        path: '/app/auution',
        name: '通知页',
        icon: <CrownOutlined />,
        redirect:'/app/auution/auutionlist',
        routes: [
          {
            path: '/app/auution/auutionlist',
            name: '通知列表',
            breadcrumbName:'通知列表',
            role:2,
            icon: <CrownOutlined />,
            component: '@/pages/auution/auutionList',
          },
          {
            path: '/app/auution/auutionadd',
            name: '通知数据',
            breadcrumbName:'通知数据',
            role:0,
            icon: <CrownOutlined />,
            component: '@/pages/auution/auutionAdd',
          },
        ],
      },
      {
        path: '/app/class',
        name: '班级页',
        icon: <TabletOutlined />,
        redirect:'/app/class/classlist',
        routes: [
          {
            path: '/app/class/classlist',
            name: '班级列表',
            breadcrumbName:'班级列表',
            icon: <TabletOutlined />,
            role:2,
            component: '@/pages/classManger/classlist',
          },
          {
            path: '/app/class/classadd',
            name: '添加班级',
            role:4,
            breadcrumbName:'添加班级',
            icon: <TabletOutlined />,
            component: '@/pages/classManger/classadd',
          },
        ],
      },
      {
        path:'/app/mine',
        name: '我的',
        breadcrumbName:'我的',
        role:0,
        icon: <AntDesignOutlined />,
        component: '@/pages/Home/mine'
      },
    ],
  },
  location: {
    pathname: '/app',
  },
};

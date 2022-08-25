import {
  AntDesignOutlined,
  CrownOutlined,
  SmileOutlined,
  TabletOutlined,
  WeiboOutlined,
  WindowsOutlined,
  TwitterOutlined,
AndroidOutlined,
ChromeOutlined
} from '@ant-design/icons';
export default {
  route: {
    path: '/app',
    component:'@/pages/App/app',
    routes: [
      {
        path:'/app',
        redirect:'/app/main',
        role:1,
      },
      {
        path:'/app/main',
        name: '主页',
        breadcrumbName:'主页',
        icon: <SmileOutlined />,
        role:1,
        component:'@/pages/Home/main'
      },
      {
        path: '/app/user',
        name: '用户页',
        icon: <CrownOutlined />,
        redirect:'/app/user/userList',
        role:4,
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
        role:1,
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
            role:1,
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
        role:2,
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
        path: '/app/message',
        name: '建议页',
        icon: <WeiboOutlined />,
        redirect:'/app/message/msglist',
        role:1,
        routes: [
          {
            path: '/app/message/msglist',
            name: '意见列表',
            breadcrumbName:'意见列表',
            icon: <WeiboOutlined />,
            role:1,
          },
          {
            path: '/app/message/msgadd',
            name: '添加建议',
            role:2,
            breadcrumbName:'添加建议',
            icon: <WeiboOutlined />,
          },
        ],
      },
      {
        path: '/app/audition',
        name: '面试广场',
        icon: <TwitterOutlined />,
        redirect:'/app/audition/audlist',
        role:1,
        routes: [
          {
            path: '/app/audition/audlist',
            name: '面试题列表',
            breadcrumbName:'面试题列表',
            icon: <TwitterOutlined />,
            role:1,
          },
          {
            path: '/app/audition/myaudition',
            name: '我的面试题',
            role:1,
            breadcrumbName:'我的面试题',
            icon: <TwitterOutlined />,
          },
        ],
      },
      {
        path: '/app/mianshi',
        name: '面试',
        icon: <ChromeOutlined />,
        redirect:'/app/mianshi/mianlist',
        role:1,
        routes: [
          {
            path: '/app/mianshi/mianlist',
            name: '面试中心',
            breadcrumbName:'面试中心',
            icon: <ChromeOutlined />,
            role:1,
          },
          {
            path: '/app/mianshi/mymian',
            name: '俺的面试',
            role:1,
            breadcrumbName:'俺的面试',
            icon: <ChromeOutlined />,
          },
        ],
      },
      {
        path: '/app/check',
        name: '考勤',
        icon: <AndroidOutlined />,
        redirect:'/app/check/mycheck',
        role:1,
        routes: [
          {
            path: '/app/check/mycheck',
            name: '我的考勤',
            breadcrumbName:'我的考勤',
            icon: <AndroidOutlined />,
            role:1,
          }
        ],
      },
      {
        path:'/app/mine',
        name: '我的',
        breadcrumbName:'我的',
        role:1,
        icon: <WindowsOutlined />,
        component: '@/pages/Home/mine'
      },
    ],
  },
  location: {
    pathname: '/app',
  },
};

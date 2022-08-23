export const AppRoute = [
  {
    path:'/app',
    component:'@/pages/App/app',
    routes:[
      //主页
      {
        path:'/app',
        redirect:'/app/main'
      },
      {
        path:'/app/main',
        component:'@/pages/Home/main'
      },

      //用户
      {
        path: '/app/user',
        redirect:'/app/user/userList',
      },
              {
                path: '/app/user/userlist',
                component: '@/pages/user/userList',
              },
              {
                path: '/app/user/useradd',
                component: '@/pages/user/userAdd',
              },

      //通知
      {
        path: '/app/auution',
        redirect:'/app/auution/auutionList',
      },
                {
                  path: '/app/auution/auutionlist',
                  component: '@/pages/auution/auutionList',
                },
                {
                  path: '/app/auution/auutionadd',
                  component: '@/pages/auution/auutionAdd',
                },

      //班级
      {
        path: '/app/class',
        redirect:'/app/class/classlist',
      },
      {
        path: '/app/class/classlist',
        component: '@/pages/classManger/classlist',
      },
      {
        path: '/app/class/classadd',
        component: '@/pages/classManger/classadd',
      },

      //建议
      {
        path: '/app/message',
        redirect:'/app/message/msglist',
      },
      {
        path: '/app/message/msglist',
        component: '@/pages/Message/msglist',
      },
      {
        path: '/app/message/msgadd',
        component: '@/pages/Message/msgadd',
      },

      //面试
      {
        path: '/app/audition',
        redirect:'/app/audition/audlist',
      },
      {
        path: '/app/audition/audlist',
        component: '@/pages/audition/audlist',
      },
      {
        path: '/app/audition/myaudition',
        component: '@/pages/audition/myaudition',
      },

      //我的
      {
        path:'/app/mine',
        component: '@/pages/Home/mine'
      }


    ]
  }
]

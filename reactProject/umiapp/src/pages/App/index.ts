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

      //我的
      {
        path:'/app/mine',
        component: '@/pages/Home/mine'
      }


    ]
  }
]

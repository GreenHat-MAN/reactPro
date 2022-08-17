export const AppRoute = [
  {
    path:'/app',
    component:'@/pages/App/app',
    routes:[
      {
        path:'/app',
        redirect:'/app/main'
      },
      {
        path:'/app/main',
        component:'@/pages/Home/main'
      },
      {
        path:'/app/mine',
        component: '@/pages/Home/mine'
      }
    ]
  }
]

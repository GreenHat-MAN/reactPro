import {LoginRoute} from "../pages/Logins";
import {ErrorPage} from "../pages/ErrorPage";
import {AppRoute} from "../pages/App";

export const routers = [
  {
    path:'/',
    component:'@/pages/index',
    routes:[ //子路由出口
      {
        path:'/',
        redirect:'/login'
      },
      {
        path:'/guide',
        component:'@/pages/Guide/guide'
      },
      ...LoginRoute,
      ...ErrorPage,
      ...AppRoute
    ],
  },
  {
    path:'*',
    redirect:'/404'
  }
]

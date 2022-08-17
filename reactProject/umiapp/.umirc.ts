import { defineConfig } from 'umi';
import {routers} from "./src/router/routers";

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  title:'千峰后台管理系统',
  links:[{rel: 'icon', href: '/img/favicon.ico'}],
  routes:routers,
  fastRefresh: {},
});

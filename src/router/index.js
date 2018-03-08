// 路由配置
import Vue from 'vue'
import VueRouter from 'vue-router'  //路由插件

import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'


import GoodsList from '../component/admin/goods/list/List.vue'
import GoodsDetail from '../component/admin/goods/detail/Detail.vue'
import GoodsComment from '../component/admin/goods/comment/Comment.vue'
Vue.use(VueRouter)

// 购物车页面配置
const goods =[
    {name:'goodsList',path:'goods/list',component:GoodsList},
    {name:'goodsDetail',path:'goods/detail/:id',component:GoodsDetail},
    {name:'goodComment',path:'goods/comment',component:GoodsComment},
];
// 导出路由实例
let router = new VueRouter({
    routes:[
        //登录
        {name:'login',path:'/login',component:Login},

        // 后台管理
        {name:'admin',path:'/admin',component:Admin,children:[...goods]},
    ]
});

// 注册一个全局守卫
router.beforeEach((to,from,next)=>{
    Vue.prototype.$http.get(Vue.prototype.$api.islogin).then(res=>{
        let isLogin = false;
        if(res.data.code=='logined'){
            isLogin = true;
        }
        if(to.name == 'login'){
            if(isLogin){
                next({name:'admin'})
            }else{
                next();
            }
        }
        if(to.name != 'login'){
            if(isLogin){
                next();
            }else{
                next({name:'login'})
            }
        }
    })
});
export default router;
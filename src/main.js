// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView  from 'iview'
import 'iview/dist/styles/iview.css'
import  Cookies from 'js-cookie'
import store from './store'
// import AxiosPlugin from './utils/axios.js'
// import './mock/index.js'

Vue.use(iView);
// Vue.use(AxiosPlugin,'$axios');
Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  iView.LoadingBar.start();
  // if(sessionStorage.getItem('token')){
  //   if(to.path=="login"){
  //     next('/')
  //   }else{
  //     next();
  //   }
  // }else{
  //   if(to.path=="/login"){
  //     next();
  //   }else{
  //     next('/login');
  //   }
  // }
  next();
});


router.afterEach((to,from)=>{
  iView.LoadingBar.finish();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/Home'
import Login from '@/views/login/index'
import NotFound from '@/components/404/index'

// 业务组件
import HomePage from '@/views/project/Home/index';                                                // 首页
import ApplyProject from '@/views/project/ApplyProject/index';                                    // 申请
import SetUpApporvalProject from '@/views/project/SetUpApporvalProject/index';                    // 立项待审批
import SetUpApporvalProjectDetails from '@/views/project/SetUpApporvalProject/details.vue';       // 审批详情页
import MyProject from '@/views/project/MyProject/index';                                          // 我的项目
import DevDetails from '@/views/project/MyProject/DevDetails';                                    // 开发中详情页
import TaskAssignDetails from '@/views/project/MyProject/TaskAssignDetails';                      // 任务分配详情页
import ChildTaskDetails from '@/views/project/MyProject/ChildTaskDetails';                        // 子任务详情页
import OnlineApporvalProject from '@/views/project/OnlineApporvalProject/index';                  // 上线待审批
import FileProject from '@/views/project/FileProject/index';                                      // 归档项目
import RefuseProject from '@/views/project/RefuseProject/index';                                  // 驳回项目
import RefuseProjectDetails from '@/views/project/RefuseProject/Details';                                // 驳回详情页 
import CountProject from '@/views/project/CountProject/index';                                    // 项目统计
import DayReport from '@/views/project/DayReport/index'; 
import FileProjectDetails from '@/views/project/FileProject/Details'                                         // 日报
import onlineapprovalprojectDetails from '@/views/project/OnlineApporvalProject/Details'
Vue.use(Router);


const constantRouteMap=[
    {path:'/Login',component:Login},
    {
      path:'/',
      component:Home,
      children:[{
        path:'/',
        name:'首页',
        component:HomePage
      },{
        path:'/applyproject',
        name:'申请',
        component:ApplyProject
      },{
        path:'/setupapprvalproject',
        name:'立项待审批',
        component:SetUpApporvalProject,
      },{
        path:'/setupapprvalproject/:id',
        name:'审批详情页',
        component:SetUpApporvalProjectDetails
      },{
        path:'/myproject',
        name:'我的项目',
        component:MyProject
      },{
        path:'/myproject/:id',
        name:'开发中详情页',
        component:DevDetails
      },{
        path:'/myproject/:id/:proId',
        name:'任务分配详情页',
        component:TaskAssignDetails
      },{
        path:'/myproject/:id/:proId/:taskId',
        name:'子任务详情',
        component:ChildTaskDetails
      },{
        path:'/onlineapprovalproject',
        name:'上线待审批',
        component:OnlineApporvalProject
      },{
        path:'/onlineapprovalproject/id',
        name:'上线待审批详情页',
        component:onlineapprovalprojectDetails
      },{
        path:'/fileproject',
        name:'归档项目',
        component:FileProject
      },{
        path:'/fileproject/:id',
        name:'归档项目详情页',
        component:FileProjectDetails
      },{
        path:'/collectionproject',
        name:'项目回收站',
        component:RefuseProject
      },{
        path:'/collectionproject/:id',
        name:'驳回详情页',
        component:RefuseProjectDetails
      },{
        path:'/countproject',
        name:'项目统计',
        component:CountProject
      },{
        path:'/dayreport',
        name:'日报',
        component:DayReport
      },{
        path:'*',
        name:'404',
        component:NotFound,
      }]
    }
];





export default new Router({
  routes: constantRouteMap,
  mode:'history'
})

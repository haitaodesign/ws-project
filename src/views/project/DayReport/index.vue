<template>
<div>
  <PageTitle :BreadData="breadData"></PageTitle>
    <Tabs value="name1">
        <TabPane label="项目日报" name="name1"> <Table border :columns="columns1" :data="proReports"></Table></TabPane>
        <TabPane label="任务日报" name="name2"> <Table border :columns="columns2" :data="selectTaskReport"></Table></TabPane>
        <TabPane label="子任务日报" name="name3"> <Table border :columns="columns3" :data="selectSubtaskRepor"></Table></TabPane>
    </Tabs>
</div>    
</template>
<script>
import PageTitle from '../../components/PageTitle'
import proLogs from './proLogs'
import taskLogs from './taskLogs'
import subtaskLogs from './subtaskLogs'
import {getselectTaskReport} from '../../../api/requestdata.js'
import {getproReports} from '../../../api/requestdata'
import {getselectSubtaskReport} from '../../../api/requestdata'
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'日报',
      }],
      button1:'项目日报',
      columns1:[
        {
          type: 'expand',
          width: 50,
          render: (h,obj) =>{
           const pro = this.proReports[obj.index].proLogs
            console.log(obj.row)
            // console.log(pro)
           return h(proLogs, {
              props: {
                row: obj.row
              }
            })
          }
                    
        }, 
        {
          title: '名称',
          key: 'proName'
        },
        {
          title: '负责人',
          key: 'creater'
        },
        {
          title: '状态',
          key: 'proState'
        },
        {
          title: '进度',
          key: 'proProgres'
        },
       
      ],
      columns2:[
        {
          type:"expand",
          width: 50,
          render:(h,obj) =>{
            const TaskReport = this.selectTaskReport[obj.index].taskLogs
            console.log(obj.row)
           
            // console.log(TaskReport);
            return h(taskLogs,{
              
              props:{
                row:obj.row
              }
            })
          }
        }, 
        {
          title: '名称',
          key: 'taskName'
        },
        {
          title: '负责人',
          key: 'handler'
        },
        {
          title: '状态',
          key: 'taskState'
        },
        {
          title: '进度',
          key: 'taskProgress'
        }
      ],
      columns3:[
        {
          type:'expand',
          width:50,
          render:(h,obj) =>{
            const SubtaskRepor = this.selectSubtaskRepor[obj.index].subtaskLogs
            console.log(obj.row)
            return h(subtaskLogs,{
              props:{
                row: obj.row
              }
            })
          }
        }, 
        {
          title: '名称',
          key: 'subtaskName'
        },
        {
          title: '负责人',
          key: 'subtaskHandler'
        },
        {
          title: '状态',
          key: 'subtaskState'
        },
        {
          title: '进度',
          key: 'subtaskProgress'
        }
      ],
      proReports:[],
      all:'',
      selectTaskReport:[],
      selectSubtaskRepor:[]
    }
  },
  created(){
     this.timerData();
  },
  methods:{
    timerData(){
      //项目日报
      getproReports().then(res => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.all = res.data;
          this.proReports = res.data.data;
          // this.proReports.forEach(function(element,index) {
          //   this.pro = element.proLogs[index].Emp;
          //   // console.log(this.pro)
          // }, this);
        }
      })
        //任务日报
      getselectSubtaskReport().then(res => {
        if (res.data.code === 200) {
          this.selectSubtaskRepor = res.data.data;
          //  console.log(this.selectSubtaskRepor)
        }
      })
      //子任务日报
      getselectTaskReport().then(res => {
        if (res.data.code === 200) {
          this.selectTaskReport = res.data.data;
          // console.log(this.selectTaskReport)
        }
      })
     },
    }
  }
</script>
<style scoped>
.home-push{
  margin: 10px 0;
}
</style>

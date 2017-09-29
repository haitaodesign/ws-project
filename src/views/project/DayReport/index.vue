<template>
<div>
  <PageTitle :BreadData="breadData"></PageTitle>
  <div class="home-push">
      <Row>
          <Col span="12">
              
          </Col>
      </Row>
      <RadioGroup v-model="button1" type="button" size='large' style='margin: 20px 0;'>
            <Radio label="项目日报"></Radio>
            <Radio label="任务日报"></Radio>
            <Radio label="子任务日报"></Radio>
      </RadioGroup>
      <Table border :columns="columns1" :data="data1"></Table>
  </div>
</div>    
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectTaskReport} from '../../../api/requestdata.js'
import {getproReports} from '../../../api/requestdata'
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'日报',
        to:"/"
      }],
      button1:'项目日报',
      columns1:[ 
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '负责人',
          key: 'age'
        },
        {
          title: '状态',
          key: 'address'
        },
        {
          title: '进度',
          key: 'address'
        },
        {
          title: '动态',
          key: 'address'
        }],
        data1:[{

        }]
    }
  },
  created(){
     this.timerData();
  },
  methods:{
    timerData(){
      //子任务日报
       getselectTaskReport().then(res=>{
         if(res.data.code === 200){
           console.log(res.data)

         }
       })
       //项目日报
       getproReports().then(res=>{
         console.log(res.data)
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

<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <div class="apply-baseinfo clearfix">
         <Form inline :label-width="90" :model='partInData'>
              <FormItem label="项目发起部门">
                     <Cascader :data="deptData" v-model="partInData.SquadName"></Cascader>
                </FormItem>
                <FormItem label="项目发起人">
                    <Select v-model="partInData.selectman" placeholder="请选择"  style="width:200px">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                    </Select>
                </FormItem>
                <FormItem label="项目发起时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime2"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="项目完成时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime3"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime4"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="上线时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="partInData.dateTime"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="">
                  <Input v-model="partInData.keys" placeholder="请输入关键字"></Input>
              </FormItem>
              <Button type="primary" style='margin-left: 30px;'>查询</Button>
            </Form>
      </div>  
      <div>
        <Table border :columns="columns8" :data="statistics" size="small" ref="table" height="670"></Table>
     </div>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectOnPro} from '../../../api/requestdata'
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
export default {
  components:{
    PageTitle,
  },
  data(){
   return{
      breadData:[{
        name:'项目统计',
      }],
      partInData:{
           keys:'',
           selectType:'',
           dateTime:'',
           dateTime2:'',
           dateTime3:'',
           dateTime4:'',
           selectman:'',
           selectpt:'',
           SquadName:[]
      },
   
      deptData:[],
      linst:[],
     
      columns8:[
       {
         title:"类型",
         key:"squad"
        },
        {
         title:"产品",
         key:"sum1"
        },
       {
         title:"活动",
         key:"sum2"
       }
      ],
      statistics:[
      ],
      }
   },
  created(){
    this.initDate();
    this.initDeptData();
    this.initGroupData()
   
    },
  methods:{
    initDate(){
      getselectOnPro().then(res=>{
        if(res.data.code === 200){
          this.statistics = res.data.data;
          console.log(this.statistics);
        }
      })
    },
    initGroupData(){
      getGroupData().then(res=>{
        let groupdata=res.data.data;
        console.log( groupdata)
        // this.linst.push(groupdata)
        // this.linst.forEach(function(value,index){
           
        // },this)
        console.log(this.linst);
        groupdata.forEach(function(element) {
         this.linst.push({
            value:element.squadid,
            label:element.squad
          })
        }, this);
        
      })
    },
    initDeptData(){
      getDeptData().then(res=>{
        let depdata=res.data.data;
        console.log(depdata)
        depdata.forEach(function(element,index) {
          this.deptData.push({
            value:element.departmentid,
            label:element.department,
            children: [],
           
          });
          console.log(this.deptData[index].children)
        // this.deptData[index].children.push({
        //     label:this.linst[index].squad
        // })
        this.deptData[index].children = this.linst
       
        },this);
      })
     
    },
  
  
  
   }
}
</script>
<style scoped>
.apply-baseinfo{
   margin-top: 10px;
   position: relative;
   z-index: 999999999;
}
</style>

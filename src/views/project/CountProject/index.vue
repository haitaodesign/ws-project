<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <div class="apply-baseinfo clearfix">
         <Form inline :label-width="90" :model='params'>
              <FormItem label="项目发起部门">
                     <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange"></Cascader>
                </FormItem>
                <FormItem label="项目发起人">
                    <Select v-model="params.creater" placeholder="请选择"  style="width:200px">
                        <Option v-for="item in createrData" :key="item.id" v-model:value="item.id">{{item.member}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="项目发起时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.createdate1"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.createdate2"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="项目完成时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.finishdate1"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.finishdate2"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
              <FormItem label="上线时间">
                  <Row>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.onlinedate1"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date" placeholder="选择日期" v-model="params.onlinedate2"></DatePicker>
                      </Col>
                  </Row>
              </FormItem>
             
              <FormItem label="">
                  <Input v-model="params.param" placeholder="请输入关键字"></Input>
              </FormItem>
              <Button type="primary" style='margin-left: 30px;' @click="searchForm">查询</Button>
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
import {getMembersBySquadId} from '../../../api/myproject'
export default {
  components:{
    PageTitle,
  },
  data(){
   return{
      breadData:[{
        name:'项目统计',
      }],

      params:{
        current:1,
        pageSize:10,
        createrSquadid:'',
        creater:'',
        createdate1:'',
        createdate2:'',
        finishdate1:'',
        finishdate2:'',
        onlinedate1:'',
        onlinedate2:'',
        param:'',
        
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
      statistics:[],
      createrData:[],
      
      }
   },
  created(){
    this.initDate();
   this.initDeptData();
   
    },
  methods:{
    initDate(){
      getselectOnPro(this.params).then(res=>{
        if(res.data.code === 200){
          this.statistics = res.data.data;
          console.log(this.statistics);
        }
      })
    },
       // 发起部门数据
    initDeptData(){
      getDeptData().then(res=>{
        let depdata=res.data.data;
        depdata.forEach(function(element) {
          this.deptData.push({
            value:element.departmentid,
            label:element.department,
            children: [],
            loading: false
          });
        },this);
      })
    },
    // 组数据
    initGroupData(params,item){
      getGroupData(params).then(res=>{
        let groupdata=res.data.data;
        groupdata.forEach(function(element) {
          item.children.push({
            value:element.squadid,
            label:element.squad
          })
        }, this);
        item.loading=false;
      })
    },
    // Cascader加载组数据
    loadGroupData(item,callback){
      item.loading=true;
      let deptId=item.value;
      let params = {
        id:item.value
      };
      this.initGroupData(params,item);
      callback();
    },
    // 监听Cascader组件数据
    deptChange(value,selectedData){
      // 通过小组id获取人
      this.params.createrSquadid = selectedData[1].value;
      this.initCreaterData();
    },
    // 点击查询请求数据
    searchForm(){
       this.initDate();
    },
    // 初始化项目发起人数据
    initCreaterData(){
      const params = {
        squadId:this.params.createrSquadid
      }
      getMembersBySquadId(params).then(res=>{
          this.createrData = res.data.data; 
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

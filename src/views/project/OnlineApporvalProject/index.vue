<template>
  <div class='clearfix'>
     <PageTitle :BreadData="breadData"></PageTitle>
      <Form inline :label-width="90" :model='parms'>
          <FormItem label="项目发起部门">
                
              <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange"></Cascader>
               
          </FormItem>
          <FormItem label="项目发起人">
                <Select v-model="parms.creater" placeholder="请选择"  style="width:200px">
                    <Option v-for="item in createrData" :key="item.id" v-model:value="item.id">{{item.member}}</Option>
                </Select>
          </FormItem>
      
          <FormItem label="项目发起时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.createdate1"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.createdate2"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="预计完成时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.plansdate1"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.plansdate2"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="项目类型">
                <Select v-model="parms.protype" placeholder="请选择"  style="width:200px">
                    <Option value="1">产品</Option>
                    <Option value="1">活动</Option>
                    
                </Select>
            </FormItem>
          <FormItem label="">
              <Input v-model="parms.param" placeholder="请输入关键字"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;' @click='searchForm'>查询</Button>

      </Form> 
      <Table :columns="columns10" :data="ProjectList"></Table>
      <Page :total="parms.pagesize" show-sizer show-elevator class='Pages'></Page>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'

import {getOnlinePro} from '../../../api/requestdata'
//审批通过
import {getselectInsertProPassLog} from '../../../api/requestdata'
//审批驳回
import {getselectInsertProReturnLog} from '../../../api/requestdata'
import { getMembersBySquadId } from '../../../api/myproject';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'上线待审批'
      }],
      columns10:[
        {
          title:'项目编号',
          key:'proid'
        },
        {
          title:'项目名称',
          key:'proname',
          render:(h,obj)=>{
            const proname = this.ProjectList[obj.index].proname
            const prodeclare = this.ProjectList[obj.index].prodeclare
            const id = this.ProjectList[obj.index].id;
            
            console.log(id)
           return h('div',[
              h('router-link',{
                props:{
                  to:'onlineapprovalproject/'+id
                }
              },proname),
              h('div', prodeclare)
              ])
            
          }
        },
        {
          title: '项目状态',
          key: 'prostate',
          render:(h,obj)=>{
            const row = obj.row;
            const status = row.prostate;
            let text =''
            if(status === '3'){
              text = "上线待审批"
            }
            return h('div',text);
          }
        },
        {
          title: '创建时间',
          key: 'createdate'
        },
        {
          title: '预计完成时间',
          key: 'planedate'
        },
        {
          title: '创建人',
          key: 'creater'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render:(h,obj)=>{
            return h('div',[
              h('Button',{
                props:{
                  type: 'primary',
                  size: 'small'
                },
                style:{
                  marginRight: '5px'
                },
                on:{
                  click:()=>{
                        getselectInsertProPassLog().then(res=>{
                          if(res.data.code === 200){
                            console.log(res.data)
                            
                            
                          }
                        })
                    // this.show(obj.index)
                  }
                }
                 
              },'通过'),
              h('Button',{
                props:{
                  type: 'error',
                  size: 'small'
                },
                on:{
                  click:()=>{
                    getselectInsertProReturnLog().then(res=>{
                      if(res.data.code === 200){
                        console.log(res.data)
                      }
                    })
                    // this.remove(obj.index)
                  }
                }
              },'驳回')
            ])
          }
        }
      ],
      parms:{
        current:1,
        pagesize:30,
        pages:0,
        total:0,
        creatersquadid:'',
        creater:'',
        createdate1:'',
        createdate2:'',
        plansdate1:'',
        plansdate2:'',
        protype:'',
        param:'',
        
      },
      data1:[],
      ProjectList:[],
      deptData:[],
      createrData:[]
    }
  },
  created(){
    this.initData();
    this.initDeptData();
  },
  methods:{
    initData(){
      getOnlinePro(this.parms).then(res=>{
         if(res.data.code === 200){
           console.log(res.data)
          this.ProjectList = res.data.data;
          // console.log(this.ProjectList)
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
    initGroupData(parms,item){
      getGroupData(parms).then(res=>{
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
      let parms = {
        id:item.value
      };
      this.initGroupData(parms,item);
      callback();
    },
    // 监听Cascader组件数据
    deptChange(value,selectedData){
      // 通过小组id获取人
      this.parms.createrSquadId = selectedData[1].value;
      this.initCreaterData();
    },
    // 初始化项目发起人数据
    initCreaterData(){
      const parms = {
        squadId:this.parms.createrSquadId
      }
      getMembersBySquadId(parms).then(res=>{
          this.createrData = res.data.data; 
      })
    },
    // 点击查询请求数据
    searchForm(){
      this.initData();
    },
  }
}
</script>
<style scoped>
.Pages{
 margin-top: 20px;
 float: right;
}
</style>


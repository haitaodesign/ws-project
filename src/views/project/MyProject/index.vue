<template>
  <div class="clearfix">
    <PageTitle :BreadData="breadData"></PageTitle>
     <Form ref="params" :model="params" inline :label-width="90" style="margin-top:10px;">
          <FormItem label="项目发起部门">
               <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange"></Cascader>
            </FormItem>
            <FormItem label="项目发起人">
                <Select placeholder="请选择"  style="width:200px" v-model="params.creater">
                    <Option v-for="item in createrData" :key="item.id" v-model:value="item.id">{{item.member}}</Option>
                </Select>
            </FormItem>
            <FormItem label="项目发起时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期"  v-model="params.createDateStart"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="params.createDateEnd"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="预计完成时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="params.planSDateStart"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="params.planSDateEnd"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="项目类型">
                <Select placeholder="请选择"  style="width:200px" v-model="params.proType">
                    <Option value="1">产品</Option>
                    <Option value="2">活动</Option>
                </Select>
            </FormItem>
           <FormItem label="项目状态">
                <Select placeholder="请选择"  style="width:200px" v-model="params.proState">
                    <Option value="1">立项待审批</Option>
                    <Option value="2">开发中</Option>
                    <Option value="3">上线待审批</Option>
                    <Option value="4">完成</Option>
                    <Option value="5">驳回</Option>
                    <Option value="6">作废</Option>
                </Select>
            </FormItem>
          <FormItem label="">
              <Input placeholder="请输入关键字" v-model="params.proName"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;' @click="searchForm">查询</Button>
          <!-- <Button type="ghost" style='margin-left: 30px;' @click="handleReset('params')">重置</Button> -->
      </Form> 
      <Table :columns="myprojectcolumns" :data="myprojectlist"></Table>
      <Page :total="total" show-sizer show-elevator class='Pages' placement="top" :show-total="true" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size-opts="pagesizeoption"></Page>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import { getprojectlist } from '../../../api/myproject';
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
        name:'开发中列表页',
        to:''
      }],
      myprojectcolumns:[{
        title:'项目编号',
        key:'proid'
      },{
        title:'项目名称',
        key:'proname',
        render:(h,params)=>{
          const row = params.row;
          const proname = row.proname;
          const prodeclare = row.prodeclare;
          const routeparams ={
            name:'开发中详情页',
            params:{
              id:row.id
            },
            query:{
              proId:row.proid
            }
          }
          return h('div',[
            h('h3',{
              style:{
                color:'#2d8cf0',
                cursor:'pointer'
              },
              on:{
                click:()=>{
                  this.$router.push(routeparams);
                }
              }
            },proname),
            h('div',prodeclare)
          ])

        }
      },{
        title:'项目状态',
        key:'prostate',
        render:(h,params)=>{
          const row = params.row;
          const status = row.prostate;
          let text =''
          switch(status){
            case '1':
            text = '立项待审批';
            break;
             case '2':
            text = '开发中';
            break;
             case '3':
            text = '上线待审批';
            break;
             case '4':
            text = '完成';
            break;
             case '5':
            text = '驳回';
            break;
             case '6':
            text = '作废';
            break;
            default:
            text = '状态数据异常';
          }
          return h('div',text);
        }
      },{
        title:'创建时间',
        key:'createdate'
      },{
        title:'预计完成时间',
        key:'plansdate'
      },{
        title:'创建人',
        key:'creater'
      }],
      myprojectlist:[],
      params:{
        current:1,
        pageSize:10,
        createrSquadId:'',
        creater:'',
        proState:'',
        createDateStart:'',
        createDateEnd:'',
        planSDateStart:'',
        planSDateEnd:'',
        proType:'',
        proName:'',
        
      },
      total:null,
      pagesizeoption:[10,20,30],
      deptData:[],
      createrData:[]
    }
  },
  created(){
    this.initListData();
    this.initDeptData();
  },
  methods:{
    // 初始化列表数据
    initListData(){
      getprojectlist(this.params).then(res=>{
          this.myprojectlist=res.data.data;
          this.total = res.data.page.total;
      }).catch(err=>{
          // 错误提示
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
      this.params.createrSquadId = selectedData[1].value;
      this.initCreaterData();
    },
    // 初始化项目发起人数据
    initCreaterData(){
      const params = {
        squadId:this.params.createrSquadId
      }
      getMembersBySquadId(params).then(res=>{
          this.createrData = res.data.data; 
      })
    },
    // 点击查询请求数据
    searchForm(){
      this.initListData();
    },
    // 重置功能暂时不做
    handleReset(name){
      this.$refs[name].resetFields();
    },
    // 页码改变时的数据
    pageChange(value){
      this.params.current=value;
      this.initListData();
    },
    // 页面条数改变时的事件
    pagesizeChange(value){
      this.params.pageSize = value;
      this.initListData();
    },
    onChange(date){
      console.log(date);
    }
  }
}
</script>
<style scoped>
.Pages{
  margin-top: 20px;
  float: right;
}
</style>


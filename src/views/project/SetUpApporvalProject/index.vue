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
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.createDateStart"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.createDateEnd"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="预计完成时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.planSDateStart"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="parms.planSDateEnd"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="项目类型">
                <Select placeholder="请选择"  style="width:200px" v-model="parms.protype">
                    <Option value="1">产品</Option>
                    <Option value="2">活动</Option>
                    
                </Select>
            </FormItem>
      
          <FormItem label="">
              <Input v-model="parms.param" placeholder="请输入关键字"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;' @click="searchForm">查询</Button>

      </Form> 
      <Table :columns="columns10" :data="ProjectList"></Table>
      <Page :total="total" show-sizer show-elevator class='Pages':show-total="true" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size-opts="pagesizeoption"></Page>
     
  <Modal v-model="isUpDown" :styles="{top: '200px'}" @on-ok="ok" @on-cancel="cancel" width="600">

    <h2 style='color:#000;margin-bottom:10px;'>项目驳回</h2>
    <Form  :model="objectId"  :label-width="110">
       <FormItem label="请输入驳回的原因" >
            <Input v-model="objectId.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}"  placeholder="请输入..."></Input>
        </FormItem>

    </Form>
  </Modal>

   
    
    
  <Modal v-model="isOk" :styles="{top: '200px'}" @on-ok="ok" @on-cancel="cancel" width="600">

    <h2 style='color:#000;margin-bottom:10px;'>项目通过</h2>
    <Form  :model="objectId"  :label-width="110">
       <FormItem label="请输入通过的原因">
            <Input v-model="objectId.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入..."></Input>
        </FormItem>

    </Form>
  </Modal>

  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getUpProjectList} from '../../../api/requestdata'
import { getMembersBySquadId } from '../../../api/myproject';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
import {getpassOrReject} from '../../../api/requestdata'
export default {
  components:{
    PageTitle
  },
  data(){
  
    return{
      breadData:[{
        name:'立项待审批'
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
            const row = obj.row;
            // const proname = this.ProjectList[obj.index].proname;
            // const prodeclare = this.ProjectList[obj.index].prodeclare;
            // const id = this.ProjectList[obj.index].id;
            const proname = row.proname;
            const prodeclare = row.prodeclare;
            const id = row.id
            const proId = row.proid
            const routeparams ={
              name:'立项待审批详情页',
              parms:{
                id:row.id
              },
              query:{
                proId:row.proid
              }
          } 
            console.log(id);
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
              h('div', prodeclare)
              ])
            // console.log(proname)
          }
        },
        {
          title: '项目状态',
          key: 'prostate',
      render:(h,parms)=>{
        const row = parms.row;
        const status = row.prostate;
        let text =''
        if(status === '1'){
          text='立项待审批'
        }else{
          text='状态数据异常'
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
                        this.isOk = true;
                  
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
                    this.isUpDown = true;
            
                 
                  }
                }
              },'驳回')
            ])
          }
        }
      ],
      parms:{
        planSDate:'',
        current:1,
        pageSize:30,
        pages:0,
        total:0,
        creatersquadId:'',
        creater:'',
        createDateStart:'',
        createDateEnd:'',
        planSDateEnd:'',
        planSDateStart:'',
        protype:'',
        param:'',
        proName:''
        
      },
      data1:[],
      objectId:{
       
        creatName:'小',
        explain:'',
        
      },
      total:null,
      ProjectList:[],
      deptData:[],
      createrData:[],
      pagesizeoption:[10,20,30],
      isUpDown: false,
      isOk: false,
    
    
    
      
  
    }
  },
  created(){
    this.initData();
    this.initDeptData()
  },
  methods:{
    initData(){
     getUpProjectList(this.parms).then(res=>{
         if(res.data.code === 200){
           console.log(res.data)
          this.ProjectList = res.data.data;
          this.total = res.data.page.total;
          console.log(res.data.data.proid)
          
          this.objectId = {
            proid: res.data.data.proid,
            id: res.data.data.id,
            prostate: res.data.data.prostate
          }
          // this.objectId.push({
          //    proid:res.data.data.proid,
          //    id: res.data.data.id,
          //   prostate: res.data.data.prostate
          // })
          console.log(this.objectId)
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
      console.log(parms.squadId)
      getMembersBySquadId(parms).then(res=>{
          this.createrData = res.data.data; 
          console.log(this.createrData)
      })
    },
    // 点击查询请求数据
    searchForm(){
      this.initData();
      
    },
      // 页码改变时的数据
    pageChange(value){
      this.parms.current=value;
      this.initData();
    },
    // 页面条数改变时的事件
    pagesizeChange(value){
      this.parms.pageSize = value;
      this.initData();
    },
     sure(name) {
      getpassOrReject(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          // console.log(this.objectId.proid)
          // if(this.objectId.proid === 1){
          //   this.$router.push('/setupapprvalproject');
          // }else{
          //   console.log("数据异常")
          // }
          // this.$router.push('/setupapprvalproject');
          // this.isOk = false;
          this.isUpDown = false;
          this.initData();
          this.$Message.info('已确定驳回');
        }
      })
    },
    del(name) {
      this.isUpDown = false;
      this.isOk = false
      this.$Message.info('点击了取消');
    },
    confirm(name) {
      getUpProjectList(this.objectId).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
        
          this.isOk = false;
          this.initData();
          this.$Message.info('已确定通过');
        }
      })
    },
    onclick(){
      
    },
    ok() {
      this.$Message.info('点击了确定');
      console.log(this.objectId)
      getpassOrReject(this.objectId).then(res => {
        console.log(res.data)
        console.log(this.objectId)
        if (res.data.code === 200) {
          // window.location.href = '/setupapprvalproject'
          // console.log(this.objectId.proid)
          // if(this.objectId.proid === 1){
          //   this.$router.push('/setupapprvalproject');
          // }else{
          //   console.log("数据异常")
          // }
          // this.$router.push('/setupapprvalproject');
          // this.isOk = false;
         
          this.initData();
        
        }
      })
    },
    cancel() {
      this.$Message.info('点击了取消');
    }
  },
 
}
</script>
<style scoped>
.Pages{
 margin-top: 20px;
 float: right;
}
</style>

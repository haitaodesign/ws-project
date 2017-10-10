<template>
  <div class='clearfix'>
     <PageTitle :BreadData="breadData"></PageTitle>
      <Form inline :label-width="90" :model='parms'>
          <FormItem label="项目发起部门">
               <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange"></Cascader>
            </FormItem>
            <FormItem label="项目发起人">
                <Select v-model="parms.creater" placeholder="请选择"  style="width:200px">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
            <FormItem label="项目状态">
                <Select v-model="parms.prostate" placeholder="请选择"  style="width:200px">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
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
                <Select placeholder="请选择"  style="width:200px" v-model="parms.protype">
                    <Option value="1">立项待审批</Option>
                    <Option value="2">开发中</Option>
                    <Option value="3">上线待审批</Option>
                    <Option value="4">完成</Option>
                    <Option value="5">驳回</Option>
                    <Option value="6">作废</Option>
                </Select>
            </FormItem>
          <FormItem label="">
              <Input v-model="parms.param" placeholder="请输入关键字"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;'>查询</Button>

      </Form> 
      <Table :columns="columns10" :data="selectFinPro"></Table>
      <Page :total="100" show-sizer show-elevator class='Pages' v-on:click='Onchange'></Page>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectRecPro} from '../../../api/requestdata'
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
        name:'项目回收站'
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
            const proname = this. selectFinPro[obj.index].proname
            const prodeclare = this.selectFinPro[obj.index].prodeclare
            const id = this.selectFinPro[obj.index].id
            console.log(prodeclare)
            return h('div',[
              h('router-link',{
                  props:{
                    to:'collectionproject/'+id
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
        },
        {
          title: '创建时间',
          key: 'createdate'
        },
        {
          title: '完成时间',
          key: 'planedate'
        },
        {
          title: '上线时间',
          key: 'onlineDate'
        },
        {
          title: '创建人',
          key: 'creater'
        }
      ],
      selectFinPro:[],
      pages:30,
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
      model:[],
      deptData:[]
    }
  },
  created(){
      this.initData();
      this.initDeptData();
  },
  methods:{
      initData(){
          getselectRecPro().then(res=>{
              if(res.data.code === 200){
                  this.selectFinPro = res.data.data;
                  this.pages = res.data.page.total
                  console.log(res.data)
                  console.log(this.pages)
              }
          })
      },
          // 发起部门数据
    initDeptData(){
      getDeptData(this.parms).then(res=>{
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
      Onchange(){
          this.initData();
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

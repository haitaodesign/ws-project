<template>
  <div class='clearfix'>
     <PageTitle :BreadData="breadData"></PageTitle>
      <Form inline :label-width="90" :model='parms'>
          <FormItem label="项目发起部门">
                <Select v-model="parms.creatersquadid" placeholder="请选择" style="width:200px;">
                    <Option value="beijing">3</Option>
                    <Option value="shanghai">1</Option>
                    <Option value="shenzhen">2</Option>
                </Select>
            </FormItem>
            <FormItem label="项目发起人">
                <Select v-model="parms.creater" placeholder="请选择"  style="width:200px">
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
                <Select v-model="parms.protype" placeholder="请选择"  style="width:200px">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
          <FormItem label="">
              <Input v-model="parms.param" placeholder="请输入关键字"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;'>查询</Button>

      </Form> 
      <Table :columns="columns10" :data="ProjectList"></Table>
      <Page :total="parms.pagesize" show-sizer show-elevator class='Pages'></Page>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getUpProjectList} from '../../../api/requestdata'

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
            const proname = this.ProjectList[obj.index].proname
            const prodeclare = this.ProjectList[obj.index].prodeclare
            const id = this.ProjectList[obj.index].id;
            console.log(id);
            return h('div',[
              h('router-link',{
                props:{
                  to:'setupapprvalproject/'+id
                }
              },proname),
              h('div', prodeclare)
              ])
            // console.log(proname)
          }
        },
        {
          title: '项目状态',
          key: 'prostate'
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
                        getUpProjectList().then(res=>{
                          if(res.data.code === 200){
                            console.log(res.data)
                            // this.ProjectList = res.data.data;
                            // console.log(this.ProjectList)
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
      ProjectList:[]
    }
  },
  created(){
    this.initData();
  },
  methods:{
    initData(){
     getUpProjectList().then(res=>{
         if(res.data.code === 200){
           console.log(res.data)
          this.ProjectList = res.data.data;
          // console.log(this.ProjectList)
         }
      })
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

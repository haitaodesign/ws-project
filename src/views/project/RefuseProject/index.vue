<template>
  <div class='clearfix'>
     <PageTitle :BreadData="breadData"></PageTitle>
      <Form inline :label-width="90">
          <FormItem label="项目发起部门">
                <Select v-model="selectpt" placeholder="请选择" style="width:200px;">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
            <FormItem label="项目发起人">
                <Select v-model="selectman" placeholder="请选择"  style="width:200px">
                    <Option value="beijing">北京市</Option>
                    <Option value="shanghai">上海市</Option>
                    <Option value="shenzhen">深圳市</Option>
                </Select>
            </FormItem>
            <FormItem label="项目发起时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime2"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="项目完成时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime3"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime4"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="上线时间">
              <Row>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime"></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                      <DatePicker type="date" placeholder="选择日期" v-model="dateTime"></DatePicker>
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="">
              <Input v-model="keys" placeholder="请输入关键字"></Input>
          </FormItem>
          <Button type="primary" style='margin-left: 30px;'>查询</Button>

      </Form> 
      <Table :columns="columns10" :data="selectFinPro"></Table>
      <Page :total="pages" show-sizer show-elevator class='Pages' v-on:click='Onchange()'></Page>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle'
import {getselectRecPro} from '../../../api/requestdata'

export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'项目回收站'
      }],
      keys:'',
      selectType:'',
      dateTime:'',
      dateTime2:'',
      dateTime3:'',
      dateTime4:'',
      selectman:'',
      selectpt:'',
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
            console.log(prodeclare)
            return h('div',[
              h('div',proname),
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
      pages:this.pages
    }
  },
  created(){
      this.initData();
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
      Onchange(){
          initData();
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

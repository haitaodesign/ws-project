<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <Form :label-width="80">
        <Tabs class="apply-baseinfo" >
            <TabPane label="基本信息" name="0">
            <FormItem label="项目名称：">
              <Input placeholder="请输入"></Input>
            </FormItem>
            <FormItem label="项目类型：">
              <Select placeholder="请选择产品类型">
                  <Option value="1">产品</Option>
                  <Option value="2">活动</Option>
              </Select>
            </FormItem>
             <FormItem label="上线时间：">
                  <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上线时间" :transfer="true"></DatePicker>
            </FormItem>
            <FormItem label="下线时间：">
                <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择下线时间" :transfer="true"></DatePicker>
            </FormItem>
            <FormItem label="项目概况：">
              <Input type="textarea" :rows="3" placeholder="请输入..."></Input>
            </FormItem>
            </TabPane>
        </Tabs>
        <Tabs class="apply-baseinfo">
            <TabPane label="参与部门" name="0">
              <Button type="primary" @click="addGroup">添加</Button>
              <Button type="primary">删除</Button>
              <Table :data="squadData" :columns="squadColumns" class="apply-squad">
              </Table>
              <FormItem label="上传附件：">
                  <Upload action="//jsonplaceholder.typicode.com/posts/">
                    <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                  </Upload>
              </FormItem>
            </TabPane>
        </Tabs>
        <Button type="primary">提交</Button>
      </Form>
      <Modal
        v-model="addshow"
        title="添加参与部门"
        @on-ok="ok('partInData')"
        @on-cancel="cancel"
        :loading="modalloading">
        <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="80">
          <FormItem prop="Taskname" label="任务名称：">
              <Input placeholder="请输入任务名称" v-model="partInData.Taskname"></Input>
          </FormItem>
          <FormItem prop="SquadName" label="参与部门：">
            <Cascader :data="deptData" :load-data="loadGroupData" v-model="partInData.SquadName"></Cascader>
          </FormItem>
           <FormItem prop="Sdate" label="开始时间：">
                <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上线时间" v-model="partInData.Sdate"></DatePicker>
          </FormItem>
          <FormItem prop="Edate" label="结束时间：">
              <DatePicker type="datetime" :options="dateOptions" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择下线时间"  v-model="partInData.Edate"></DatePicker>
          </FormItem>
           <FormItem label="总工时：">
              <InputNumber v-model="inputNumber"  placeholder="请手动计算工时"></InputNumber>
          </FormItem>
        </Form>
      </Modal>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
export default {
  components:{
    PageTitle
  },
  data(){
    return{
        breadData:[{
            name:'申请',
            to:''
        }],
        dateOptions:{
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
        },
        addshow:false,
        squadColumns:[{
          type:'index',
          title:'编号'
        },{
          title:'任务名称',
          key:'Taskname',
        },{
          title:'组名称',
          key:'SquadName',
        },{
          title:'开始时间',
          key:'Sdate',
        },{
          title:'结束时间',
          key:'Edate',
        }],
        squadData:[],
        deptData:[],
        inputNumber:0,
        partInData:{
          Taskname:'',
          SquadName:[],
          Sdate:'',
          Edate:''
        },
        partrules:{
          Taskname:[
            {required:true,message:'请填写任务名称',trigger:'blur'}
          ],
          SquadName:[
            {required:true,message:'请填写参与部门',trigger:'blur'}
          ],
          Sdate:[
            {required:true,type:'date',message:'请填开始时间',trigger:'change'}
          ],
          Edate:[
            {required:true,type:'date',message:'请填结束时间',trigger:'change'}
          ]
        },
        modalloading:true
    }
  },
  created(){
    this.initDeptData();
  },
  methods:{
    addGroup(){
      this.addshow=true;
    },
    ok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            //验证通过添加数据，重置表单
          }else{
            // 不关闭弹窗，提示错误信息
            this.modalloading=true;
          }
      })
    },
    cancel(){

    },
    loadGroupData(item,callback){
      item.loading=true;
      let deptId=item.value;
      let params = {
        id:item.value
      };
      this.initGroupData(params,item);
      callback();
    },
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
    }
  }
}
</script>
<style scoped>
.apply-baseinfo{
  margin-top: 10px;
}
.apply-squad{
  margin: 10px 0 10px 0;
}
</style>


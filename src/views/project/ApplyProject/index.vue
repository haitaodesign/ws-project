<template>
  <div>
      <PageTitle :BreadData="breadData"></PageTitle>
      <Form ref="applyData" :model="applyData" :rules="applyrules" :label-width="100">
            <h3>基本信息</h3>
            <hr>
            <FormItem prop="proName" label="项目名称：">
              <Input placeholder="请输入" v-model="applyData.proName"></Input>
            </FormItem>
            <FormItem prop="proType" label="项目类型：">
              <Select placeholder="请选择产品类型" v-model="applyData.proType">
                  <Option value="1">产品</Option>
                  <Option value="2">活动</Option>
              </Select>
            </FormItem>
             <FormItem prop="planSDate" label="上线时间：">
                  <DatePicker type="datetime" @on-change="applysdateChange" :options="dateOptions" v-model="applyData.planSDate" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上线时间"></DatePicker>
            </FormItem>
            <FormItem label="下线时间：">
                <DatePicker type="datetime" @on-change="applyedateChange" :options="dateOptions" v-model="applyData.planEDate" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择下线时间"></DatePicker>
            </FormItem>
            <FormItem prop="proDeclare" label="项目概况：">
              <Input type="textarea" :rows="3" v-model="applyData.proDeclare" placeholder="请输入项目概况"></Input>
            </FormItem>
            <h3>参与部门</h3>
            <hr>  
            <Button type="primary" @click="addshow=true">添加</Button>
            <Table border :data="applyData.myDomain" :columns="squadColumns" class="apply-squad">
            </Table>
            <FormItem label="上传附件：">
                <Upload action="http://192.168.22.46:5826/uploadFile">
                  <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                </Upload>
            </FormItem>
            <Button type="primary" @click="applyOk('applyData')" :loading="applyloading" size="large">提交</Button>
      </Form>
      <Modal
        v-model="addshow"
        title="添加参与部门"
        >
        <Form ref="partInData" :model="partInData" :rules="partrules" :label-width="100">
          <FormItem prop="Taskname" label="任务名称：">
              <Input placeholder="请输入任务名称" v-model="partInData.Taskname"></Input>
          </FormItem>
          <FormItem prop="SquadName" label="参与部门：">
            <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange" v-model="partInData.SquadName"></Cascader>
          </FormItem>
           <FormItem prop="Sdate" label="开始时间：">
            <DatePicker type="datetime" :options="dateOptions" v-model="partInData.Sdate" @on-change="sdateChange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择上线时间"></DatePicker>
          </FormItem>
          <FormItem prop="Edate" label="结束时间：">
              <DatePicker type="datetime" :options="dateOptions" v-model="partInData.Edate" @on-change="edateChange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择下线时间"></DatePicker>
          </FormItem>
           <FormItem label="总工时：" prop="workDate">
              <InputNumber v-model="partInData.workDate" :min="0" placeholder="请手动计算工时"></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="ok('partInData')" :loading="modalloading">提交</Button>
          <Button type="default" @click="cancel('partInData')">取消</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
import {submitApplyData} from '../../../api/requestdata';
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
          key:'taskname',
        },{
          title:'组名称',
          key:'SquadName',
        },{
          title:'开始时间',
          key:'sdate',
        },{
          title:'结束时间',
          key:'edate',
        },{
          title:'预计工期',
          key:'workDate'
        },{
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                            console.log(params);
                              this.remove(params.index)
                          }
                      }
                  }, '删除')
              ]);
          }
        }],
        squadData:[],
        deptData:[],
        inputNumber:0,
        partInData:{
          Taskname:'',
          SquadName:[],
          Sdate:'',
          Edate:'',
          workDate:0
        },
        showPartInData:{
          taskname:'',
          SquadName:'',
          sdate:'',
          edate:'',
          workDate:'',
          squadId:''
        },
        partrules:{
          taskname:[
            {required:true,message:'请填写任务名称',trigger:'blur'}
          ],
          SquadName:[
            {required:true,type:'array',message:'请填写参与部门',trigger:'change'}
          ],
          sdate:[
            {required:true,type:'date',message:'请填开始时间',trigger:'change'}
          ],
          edate:[
            {required:true,type:'date',message:'请填结束时间',trigger:'change'}
          ],
          workDate:[
            {required:true,type:'number',message:'请填写总工时',trigger:'change'}
          ]
        },
        modalloading:false,
        applyloading:false,
        applyData:{
          proName:'',
          proType:'',
          planSDate:'',
          planEDate:'',
          proDeclare:'',
          creatName:'',
          myDomain:[],
        },
        submitData:{
          proName:'',
          proType:'',
          planSDate:'',
          planEDate:'',
          proDeclare:'',
          creatName:'',
          myDomain:[]
        },
        applyrules:{
          proName:[
            {required:true,message:'请填写任务名称',trigger:'change'}
          ],
          proType:[
            {required:true,message:'请选择产品类型',trigger:'change'}
          ],
          planSDate:[
            {required:true,type:'date',message:'请填写上线时间',trigger:'change'}
          ],
          proDeclare:[
            {required:true,message:'请填写项目概况',trigger:'change'}
          ]
        }
    }
  },
  created(){
    this.initDeptData();
  },
  methods:{
    ok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            //验证通过添加数据，重置表单
            this.showPartInData.taskname = this.partInData.Taskname;
            this.showPartInData.workDate = this.partInData.workDate;
            const pushdata = this.copydata(this.showPartInData);
            this.applyData.myDomain.push(pushdata);
            this.addshow=false;
            this.$refs[name].resetFields();
          }else{
            // 不关闭弹窗，提示错误信息
            this.$Message.error('表单验证失败，请填写完整的信息！');
          }
      })
    },
    cancel(name){
      this.$refs[name].resetFields();
      this.addshow=false;
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
    },
    edateChange(date){
      this.showPartInData.sdate=date;
    },
    sdateChange(date){
      this.showPartInData.edate=date;
    },
    applyedateChange(date){
      this.submitData.planEDate=date;
    },
    applysdateChange(date){
      this.submitData.planSDate=date;
    },
    deptChange(value,selectedData){
      this.showPartInData.SquadName=selectedData[1].label;
      this.showPartInData.squadId=selectedData[1].value;
    },
    copydata(data){
      let obj = {};
      obj = JSON.parse(JSON.stringify(data));
      return obj;
    },
    applyOk(name){
      this.$refs[name].validate((valid)=>{
        if(valid){
          this.submitData.proName = this.applyData.proName;
          this.submitData.proType = this.applyData.proType;
          this.submitData.proDeclare = this.applyData.proDeclare;
          this.submitData.myDomain = JSON.stringify(this.applyData.myDomain);
          this.submitData.creatName = sessionStorage.getItem('userName');
          console.log(this.submitData);
          // this.applyloading=true;
          submitApplyData(this.submitData).then(res=>{
            
            this.applyloading=false;
          })
        }else{
          this.$Message.error('表单验证失败，请填写完整的信息！');
        }
      })
    },
    remove (index) {
        this.applyData.myDomain.splice(index, 1);
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
hr{
  margin:5px 0 5px 0;
  border: 1px solid #e9eaec;
}
</style>


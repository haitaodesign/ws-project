<template>
  <div class="clearfix">
      <PageTitle :BreadData="breadData"></PageTitle>
      <Row>
        <Col span="4" offset="8"><Button type="primary" @click="subTaskClick">提交子任务</Button></Col>
      </Row>
      <Row :gutter="20">
        <Col span="12" class="colmargin-top">
          <Card dis-hover>
             <Tabs class="home-push">
                <TabPane label="基本信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>处理组名称：<span>{{projectTask.squadId}}</span></li>
                    <li>任务标题：<span>{{projectTask.taskname}}</span></li>
                  </ul>    
                </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12" class="colmargin-top">
          <Card dis-hover>
             <Tabs class="home-push">
                <TabPane label="项目信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>子任务编号：<span>{{projectTask.taskId}}</span></li>
                    <li>创建时间：<span>{{projectTask.createDate}}</span></li>
                    <li>任务状态：
                      <span v-if="projectTask.taskstate==1">未开始</span>
                      <span v-else-if="projectTask.taskstate==2">开发中</span>
                      <span v-else-if="projectTask.taskstate==3">预验收</span>
                      <span v-else-if="projectTask.taskstate==4">完成</span>
                      <span v-else-if="projectTask.taskstate==5">逾期</span>
                      </li>
                    <li>开始时间：<span>{{projectTask.sDate}}</span></li>
                    <li>结束时间：<span>{{projectTask.eDate}}</span></li>
                    <li>预计工期：<span>{{projectTask.workDate}}</span></li>
                  </ul>     
                </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12">
          <Card dis-hover class="colmargin-top">
             <Tabs class="home-push">
                <TabPane label="日志记录" name="0" style="padding:10px;">
                  <Table border height="200" :data="logRecordList" :columns="logRecordColumn"></Table>
                  <div style="margin-top:10px;">
                    <Row style="margin-bottom:10px;">
                      <Col span="4">
                        <span>指定回复人：</span>
                      </Col>
                      <Col span="8">
                        <!-- <Cascader :data="deptData" placeholder="请选择部门" :load-data="loadGroupData" @on-change="deptChange" v-model="partInParams.SquadName"></Cascader> -->
                      </Col>
                      <Col span="8">
                      <Select placeholder="请选择项目发起人"  style="width:200px">
                          <!-- <Option v-for="item in createrData" :key="item.id" v-model:value="item.id">{{item.member}}</Option> -->
                      </Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col span="24">
                        <Input type="textarea" :rows="4" placeholder="请输入项目概况"></Input>
                      </Col>
                      <Col span="24" style="margin-top:10px;">
                          <Upload action="http://192.168.22.46:5826/uploadFile">
                            <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
                          </Upload>
                      </Col>
                      <Col span="6" style="margin-top:10px;">
                        <Button type="primary">回复</Button>
                      </Col>
                    </Row>
                  </div>    
                </TabPane>
                <TabPane label="开发日志" name="1" style="padding:10px;">
                    <div style="margin-top:10px;">
                    <Row style="margin-bottom:10px;">
                      <Col span="8">
                        <Select placeholder="类型："  @on-change="onTypeChange" style="width:200px">
                            <Option value="1">项目</Option>
                            <Option value="2">任务</Option>
                            <Option value="3">子任务</Option>
                        </Select>
                      </Col>
                      <Col span="8">
                        <Select placeholder="二级类型："  style="width:200px">
                            <!-- <Option v-for="item in secondLevelData" :key="item.taskId" v-model:value="item.taskName"></Option> -->
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                        <!-- <Table border height="500" :data="devLogList" :columns="devLogColums" class="apply-squad">
                        </Table> -->
                    </Row>
                  </div>    
                </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12" class="colmargin-top">
          <Card dis-hover >
             <Tabs class="home-push">
                <TabPane label="子任务列表" name="0" style="padding:10px;">
                    <Button type="primary" @click="addHandleClick" style="margin-bottom:10px;">添加</Button>
                    <Table border height="200" :data="SubTaskList" :columns="subTaskColumns" class="apply-squad">
                    </Table>
                </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <Modal
        v-model="addshow"
        :title="addmodaltitle"
        @on-cancel="cancel('subTaskParams')"
        >
        
        <Form ref="subTaskParams" :model="subTaskParams" :rules="subTaskRules" :label-width="100">
          <FormItem prop="subtaskName" label="任务名称：">
              <Input placeholder="请输入任务名称" v-model="subTaskParams.subtaskName"></Input>
          </FormItem>
          <FormItem prop="subtaskHandler" label="处理人：">
            <Select v-model="subTaskParams.subtaskHandler" style="width:200px">
              <Option v-for="item in handleUserList" :value="item.member" :key="item.id"></Option>
          </Select>
          </FormItem>
           <FormItem prop="sdate" label="开始时间：">
                <DatePicker type="datetime" v-model="subTaskParams.sdate" @on-change="sdateChange" :options="dateOptions"   format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间" ></DatePicker>
          </FormItem>
          <FormItem prop="edate" label="结束时间：">
              <DatePicker type="datetime" v-model="subTaskParams.edate" @on-change="edateChange" :options="dateOptions"   format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间" ></DatePicker>
          </FormItem>
           <FormItem label="总工时：" prop="workDate">
              <InputNumber v-model="subTaskParams.workDate" :min="0" placeholder="请手动计算工时" ></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="ok('subTaskParams')">提交</Button>
          <Button type="default" @click="cancel('subTaskParams')">取消</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import { getTaskDetails } from '../../../api/myproject';
import { getSubTaskList } from '../../../api/myproject';
import { handleSubTaskList } from '../../../api/myproject';
import { getMyProjectDetailsLog } from '../../../api/myproject';
import { commitTask } from '../../../api/myproject';
import { getMembersByLoginUser } from '../../../api/myproject';
import { getMembersBySquadId } from '../../../api/myproject';
import { getSecondLeverType } from '../../../api/myproject';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'任务分配详情页',
        to:''
      }],
      dateOptions:{
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
      },
      subTaskColumns:[{
          title:'编号',
          key:'subtaskId',
          width:65
        },{
          title:'任务名称',
          key:'subtaskName',
          width:100,
          render:(h,params)=>{
            const row = params.row;
            const routeparams ={
              name:'子任务详情页',
              params:{
                taskId:row.taskId
              },
              query:{
                subtaskId:row.subtaskId
              }
            }
            console.log(routeparams);
            return h('h5',{
                style:{
                color:'#2d8cf0',
                cursor:'pointer'
              },
              on:{
                click:()=>{
                  this.$router.push(routeparams);
                }
              }
            },row.subtaskName)
          }
        },{
          title:'处理人',
          key:'subtaskHandler',
        },{
          title:'开始时间',
          key:'sDate',
        },{
          title:'结束时间',
          key:'eDate',
        },{
          title:'预计工期',
          key:'workDate'
        },{
          title:'子任务状态',
          key:'subtaskState',
          render:(h,params)=>{
            const taskstate = params.row.subtaskState;
            let text =''
            switch(taskstate){
              case '1':
              text = '未开始';
              break;
              case '2':
              text = '开发中';
              break;
              case '3':
              text = '预验收';
              break;
              case '4':
              text = '完成';
              break;
              case '5':
              text = '逾期';
              break;
              default:
              text = '状态数据异常';
            }
            return h('div',text);
          }
        },{
          title:'任务进度',
          key:'subtaskProgress'
        },{
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
          fixed: 'right',
          render: (h, params) => {
              const row = params.row;
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                            this.addshow=true;
                            this.addmodaltitle = '修改子任务';
                            this.subTaskParams.type = 2;
                            this.subTaskParams.subtaskId = row.subtaskId;
                            this.subTaskParams.subtaskHandler = row.subtaskHandler;
                            this.subTaskParams.subtaskName = row.subtaskName;
                            this.subTaskParams.sdate = new Date(row.sDate);
                            this.subTaskParams.edate = new Date(row.eDate);
                            this.subTaskParams.sDate = row.sDate;
                            this.subTaskParams.eDate = row.eDate;
                            this.subTaskParams.workDate = parseInt(row.workDate);
                          }
                      }
                  }, '修改'),
                  h('Button', {
                      props: {
                          type: 'error',
                          size: 'small'
                      },
                      style:{
                        marginLeft:'5px'
                      },
                      on: {
                          click: () => {
                            let params = {
                              taskId:this.$route.params.id,
                              subtaskId:row.subtaskId,
                              type:3
                            }
                            this.deleteConfirm(params);
                          }
                      }
                  }, '删除')
              ]);
          }
        }],
        projectTask:{
          squadId:'',
          taskname:'',
          taskId:'',
          createDate:'',
          taskstate:'',
          sDate:'',
          eDate:'',
          workDate:''
        },
        SubTaskList:[],
   
        addshow:false,
        subTaskParams:{
          taskId:this.$route.query.taskId,
          subtaskId:1,
          type:1,
          subtaskHandler:'',
          subtaskName:'',
          sDate:'',
          eDate:'',
          sdate:'',
          edate:'',
          workDate:0,
          subtaskProgress:'',
          subtaskState:1
        },
        addmodaltitle:'',
        subTaskRules:{
          subtaskName:[
            {required:true,message:'请填写任务名称',trigger:'change'}
          ],
          subtaskHandler:[
            {required:true,message:'请选择处理人',trigger:'change'}
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
        handleUserList:[],
      //   deptData:[],
      //   deptData1:[],
      //   recordLogParams:{
      //     id:this.$route.params.id,
      //     proId:this.$route.query.proId,
      //     state:1,
      //     type:1,
      //     secondLevelId:''
      //   },
        devLogParams:{
          id:this.$route.params.id,
          proId:this.$route.params.proId,
          state:2,
          type:2,
          secondLevelId:''
        },
        logRecordColumn:[{
          title:'类型',
          key:'type',
          render:(h,params)=>{
            let type = params.row.type;
            let text =''
            switch(type){
              case '1':
              text = '创建';
              break;
              case '2':
              text = '立项待审批';
              break;
              case '3':
              text = '提交上线';
              break;
              case '4':
              text = '上线审批（完成）';
              break;
              case '5':
              text = '驳回';
              break;
               case '6':
              text = '作废';
              break;
              case '7':
              text = '分配';
              break;
              case '8':
              text = '修改';
              break;
              case '9':
              text = '删除';
              break;
              case '10':
              text = '回复逾期';
              break;
               case '11':
              text = '附件';
              break;
              default:
              text = '状态数据异常';
            }
            return h('div',text);
          }
        },{
          title:'时间',
          key:'date'
        },{
          title:'操作人',
          key:'emp'
        },{
          title:'说明',
          key:'explain'
        },{
          title:'附件',
          key:'filepath'
        }],
        logRecordList:[],
      //   createrData:[],
        devLogList:[],
      //   devLogColums:[{
      //     title:'类型',
      //     key:'type'
      //   },{
      //     title:'时间',
      //     key:'date'
      //   },{
      //     title:'操作部门/人',
      //     key:'emp'
      //   },{
      //     title:'说明',
      //     key:'explain'
      //   },{
      //     title:'附件',
      //     key:'filepath'
      //   }],
      //   secondLevelData:[],
        
    }    
  },
  created(){
      this.initDetailsData();
      this.initSubTaskData();
      this.initUserData();
      // this.initDeptData();
      // this.initLogRecordList();
      this.initDevLogList();
  },
  methods:{
    initDetailsData(){
      // 获取id 和 proid
      const params = {
        proId:this.$route.params.proId,
        taskId:this.$route.query.taskId,
      };
      console.log(this.$route);
      getTaskDetails(params).then(res=>{
        const data = res.data.data[0].projectTask;
        this.logRecordList = res.data.data[0].logRecordList;
        this.projectTask.squadId = data.squadId;
        this.projectTask.taskname = data.taskname;
        this.projectTask.createDate = data.createDate;
        this.projectTask.taskstate = data.taskstate;
        this.projectTask.sDate = data.sdate;
        this.projectTask.eDate = data.edate;
        this.projectTask.taskId = data.taskId;
        this.projectTask.workDate = data.workDate;
      }).catch(err=>{

      })
    },
    initSubTaskData(){
      let params = {
        taskId:this.$route.query.taskId
      };
      console.log(params);
      getSubTaskList(params).then(res=>{
        this.SubTaskList = res.data.data;
      });
    },
    ok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            handleSubTaskList(this.subTaskParams).then(res=>{
              if(res.data.code==200){
                 this.initSubTaskData();
                 this.$Message.success(res.data.msg);
              }else{
                 this.$Message.error(res.data.msg);
              }
              this.addshow=false;
              this.$refs[name].resetFields();
            }).catch(err=>{
              this.$Message.error('系统异常！');
            })
          }else{
            // 不关闭弹窗，提示错误信息
            this.$Message.error('表单验证失败，请填写完整的信息！');
          }
      })
    },
    cancel(name){
      this.addshow = false;
      this.$refs[name].resetFields();
    },
    addHandleClick(){
      this.addshow = true;
      this.addmodaltitle = '添加子任务列表';
      // this.partInParams.type=1;
    },
    initUserData(){
      getMembersByLoginUser().then(res=>{
        this.handleUserList = res.data.data[0].members;
      });
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
    loadGroupData(item,callback){
      item.loading=true;
      let deptId=item.value;
      let params = {
        id:item.value
      };
      this.initGroupData(params,item);
      callback();
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
    deptChange(value,selectedData){
      this.partInParams.squadId=selectedData[1].value;
      this.initCreaterData();
    },
    edateChange(date){
      this.subTaskParams.eDate=date;
    },
    sdateChange(date){
      this.subTaskParams.sDate=date;
    },
    initLogRecordList(){
      getMyProjectDetailsLog(this.recordLogParams).then(res=>{
        this.logRecordList = res.data.data[0].logRecordList;
      }).catch(err=>{

      })
    },
    initDevLogList(){
      getMyProjectDetailsLog(this.devLogParams).then(res=>{
        console.log(res);
        // this.devLogList = res.data.data[0].DevLogList;
      }).catch(err=>{

      })
    },
    onclick(){
      this.addshow = true;
    },
    initCreaterData(){
      const params = {
        squadId:this.partInParams.squadId
      }
      getMembersBySquadId(params).then(res=>{
          this.createrData = res.data.data; 

      })

    },
    deleteConfirm(params){
      this.$Modal.confirm({
          title: '删除对话框',
          content: '<p>是否确认删除子任务？</p>',
          onOk: () => {
              handleSubTaskList(params).then(res=>{
                let data = res.data;
                if(data.code == 200){
                  this.$Message.info(data.msg);
                  this.initSubTaskData();
                }else{
                   this.$Message.error(data.msg);
                }
              }).catch(err=>{
                this.$Message.error('系统异常！');
              })
          },
          onCancel: () => {
          }
      });
    },
    onTypeChange(value){
      let currvalue = value;
      let params = {
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          type:2
      };
      this.secondLevelData = [];
      switch(currvalue){
        case '1':
          this.initDevLogList();
        break;
        case '2':
          this.getSecondLeverList(params);
          this.devLogParams.type = 2;
          this.initDevLogList();
        break;
        case '3':
          params.type = 3;
          this.devLogParams.type = 2;
          this.getSecondLeverList(params);
          this.initDevLogList();
        break;
      }
    },
    getSecondLeverList(params){
      getSecondLeverType(params).then(res =>{
        console.log(res);
        if(res.data!=null){
          this.secondLevelData = res.data.data;
        }
      })
    },
    subTaskClick(){
      let params = {
        taskId:this.$route.query.taskId,
        userName:'ddd',
        explain:'',
        type:1
      };
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.value,
              autofocus: true,
              type: 'textarea',
              rows: 4,
              placeholder: '请输入上线意见...'
            },
            on: {
              input: (val) => {
                params.explain = val;
              }
            }
          })
        },
        loading:true,
        onOk:()=>{
            if(params.explain!==''){
              commitTask(params).then(res => {
                const data = res.data;
                if(data.code ==200){
                  this.$Message.success(res.data.msg);
                }else{
                  this.$Message.error(res.data.msg);
                }
                }).catch(err => {
                  this.$Message.error('系统异常！');
                })
                this.$Modal.remove();
              }else{
                 this.$Message.error('请输入审批意见');
                 this.$Modal.remove();
              }
           
        }
      })
    }
  }
}
</script>
<style scoped>
.wrap li{
  height: 30px;
  line-height: 30px;;
}
.colmargin-top{
  margin-top: 20px;
}
</style>

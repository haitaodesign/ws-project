<template>
  <div class="clearfix">
      <PageTitle :BreadData="breadData"></PageTitle>
      <Row>
        <Col span="4" offset="8"><Button type="primary">上线审批</Button></Col>
        <Col span="4"><Button type="primary" @click="onclick">项目作废</Button></Col>
      </Row>
      <Row :gutter="20">
        <Col span="12" class="colmargin-top">
          <Card dis-hover>
             <Tabs class="home-push">
                <TabPane label="基本信息" name="0" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目类型：
                      <span v-if="baseAndProList.protype==1">产品</span>
                      <span v-else>活动</span>
                    </li>
                    <li>项目标题：<span>{{ baseAndProList.proname }}</span></li>
                    <li>项目概况：<span>{{ baseAndProList.prodeclare}}</span></li>
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
                    <li>项目编号：<span>{{ baseAndProList.proid }}</span></li>
                    <li>创建时间：<span>{{ baseAndProList.createdate }}</span></li>
                    <li>发起人：<span>{{ baseAndProList.creater }}</span></li>
                    <li>项目状态：<span>{{ baseAndProList.prostate }}</span></li>
                    <li>预计上线时间：<span>{{ baseAndProList.plansdate }}</span></li>
                    <li>预计下线时间：<span>{{ baseAndProList.planedate }}</span></li>
                    <li>预计工期：<span>{{ baseAndProList.betweenDays }}</span></li>
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
                        <Cascader :data="deptData" placeholder="请选择部门" :load-data="loadGroupData" @on-change="deptChange" v-model="partInParams.SquadName"></Cascader>
                      </Col>
                      <Col span="8">
                      <Select placeholder="请选择项目发起人"  style="width:200px">
                          <Option v-for="item in createrData" :key="item.id" v-model:value="item.id">{{item.member}}</Option>
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
                      <Col span="4">
                        <Button type="primary" @click="addDevLogClick" style="margin-bottom:10px;">添加开发日志</Button>
                      </Col>
                      <Col span="8">
                        <Select placeholder="类型："  @on-change="onTypeChange" style="width:200px">
                            <Option value="1">项目</Option>
                            <Option value="2">任务</Option>
                            <Option value="3">子任务</Option>
                        </Select>
                      </Col>
                      <Col span="8">
                        <Select placeholder="二级类型："  style="width:200px">
                            <Option v-for="item in secondLevelData" :key="item.taskId" v-model:value="item.taskName"></Option>
                        </Select>
                      </Col>
                    </Row>
                    <Row>
                        <Table border height="500" :data="devLogList" :columns="devLogColums" class="apply-squad">
                        </Table>
                    </Row>
                  </div>    
                </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12" class="colmargin-top">
          <Card dis-hover >
             <Tabs class="home-push">
                <TabPane label="参与组" name="0" style="padding:10px;">
                    <Button type="primary" @click="addHandleClick" style="margin-bottom:10px;">添加</Button>
                    <Table border height="200" :data="devDetails.taskList" :columns="squadColumns" class="apply-squad">
                    </Table>
                </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <Modal
        v-model="addshow"
        :title="addmodaltitle"
        @on-cancel="cancel('partInParams')"
        >
        <Form ref="partInParams" :model="partInParams" :rules="partInRules" :label-width="100">
          <FormItem prop="taskName" label="任务名称：">
              <Input placeholder="请输入任务名称" v-model="partInParams.taskName"></Input>
          </FormItem>
          <FormItem prop="SquadName" label="参与组：">
            <Cascader :data="deptData" :load-data="loadGroupData" @on-change="deptChange" v-model="partInParams.SquadName"></Cascader>
          </FormItem>
           <FormItem prop="sdate" label="开始时间：">
                <DatePicker type="datetime" v-model="partInParams.sdate" @on-change="sdateChange" :options="dateOptions"   format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间" ></DatePicker>
          </FormItem>
          <FormItem prop="edate" label="结束时间：">
              <DatePicker type="datetime" v-model="partInParams.edate" @on-change="edateChange" :options="dateOptions"   format="yyyy-MM-dd HH:mm:ss" placeholder="请选择结束时间" ></DatePicker>
          </FormItem>
           <FormItem label="总工时：" prop="workDate">
              <InputNumber v-model="partInParams.workDate" :min="0" placeholder="请手动计算工时" ></InputNumber>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="ok('partInParams')">提交</Button>
          <Button type="default" @click="cancel('partInParams')">取消</Button>
        </div>
      </Modal>
      <Modal
        v-model="addlogshow"
        title="添加开发者日志"
        @on-cancel="logcancel('addDevLogList')"
        >
        <Form ref="addDevLogList" :model="addDevLogList" :rules="devLogRules" :label-width="100">
           <FormItem prop="type" label="日志类型：">
              <Select v-model="addDevLogList.type" placeholder="请选择">
                    <Option value="1">开始</Option>
                    <Option value="2">需求调整</Option>
                    <Option value="3">会议</Option>
                    <Option value="4">更新</Option>
                    <Option value="5">预验收</Option>
              </Select>
          </FormItem>
          <FormItem prop="progress" label="项目进度：">
              <InputNumber :max="100" :min="0" v-model="addDevLogList.progress"></InputNumber>
          </FormItem>
          <FormItem prop="explain" label="备注：">
              <Input type="textarea" :rows="3"  placeholder="请输入内容" v-model="addDevLogList.explain"></Input>
          </FormItem>
          <FormItem label="上传附件：">
              <Upload action="http://192.168.22.46:5826/uploadFile">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
          </FormItem>
        </Form>
        <div slot="footer">
          <Button type="primary" @click="logok('addDevLogList')">提交</Button>
          <Button type="default" @click="logcancel('addDevLogList')">取消</Button>
        </div>
      </Modal>
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import { getMyProjectDetails } from '../../../api/myproject';
import { groupHandle } from '../../../api/myproject';
import { getMyProjectDetailsLog } from '../../../api/myproject';
import { getMembersBySquadId } from '../../../api/myproject';
import { getSecondLeverType } from '../../../api/myproject';
import { addProDeveLog } from '../../../api/myproject';
import {getDeptData} from '../../../api/requestdata';
import {getGroupData} from '../../../api/requestdata';
export default {
  components:{
    PageTitle
  },
  data(){
    return{
      breadData:[{
        name:'开发中详情页',
        to:''
      }],
      dateOptions:{
          disabledDate (date) {
              return date && date.valueOf() < Date.now() - 86400000;
          }
      },
      squadColumns:[{
          title:'编号',
          key:'taskId',
          width:65
        },{
          title:'任务名称',
          key:'taskName',
          width:100,
          render:(h,params)=>{
            const row = params.row;
            const routeparams ={
              name:'任务分配详情页',
              params:{
                proId:row.proId
              },
              query:{
                taskId:row.taskId
              }
            }
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
            },row.taskName)
          }
        },{
          title:'组名称',
          key:'squad',
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
          title:'任务状态',
          key:'taskState',
          render:(h,params)=>{
            const taskstate = params.row.taskState;
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
          title: '操作',
          key: 'action',
          width: 150,
          align: 'center',
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
                            // 初始化修改弹窗
                            this.addshow=true;
                            this.addmodaltitle = '修改参与组';
                            this.partInParams.type=2;
                            this.partInParams.taskName = row.taskName;
                            this.partInParams.squadId = row.squadId;
                            this.partInParams.taskId = row.taskId;
                            this.partInParams.SquadName.push(row.departmentId);
                            this.partInParams.SquadName.push(row.squadId);
                            this.partInParams.sdate = new Date(row.sDate);
                            this.partInParams.edate = new Date(row.eDate);
                            this.partInParams.sDate = row.sDate;
                            this.partInParams.eDate = row.eDate;
                            this.partInParams.workDate = parseInt(row.workDate);
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
                              id:this.$route.params.id,
                              taskId:row.taskId,
                              proId:row.proId,
                              handler:'测试人',
                              type:3
                              // handler:row.handler,
                            }
                            this.deleteConfirm(params);
                          }
                      }
                  }, '删除')
              ]);
          }
        }],
        devDetails:{
        },
        baseAndProList:{
            protype:'',
            proname:'',
            prodeclare:'',
            proid:'',
            createdate:'',
            creater:'',
            prostate:'',
            plansdate:'',
            planedate:'',
            betweenDays:''
        },
        addshow:false,
        addlogshow:false,
        partInParams:{
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          type:0,
          taskName:'',
          sDate:'',
          eDate:'',
          sdate:'',
          edate:'',
          handler:'',
          squadId:'',
          workDate:0,
          idd:0,
          taskId:0,
          SquadName:[]
        },
        addmodaltitle:'',
        partInRules:{
          taskName:[
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
        deptData:[],
        deptData1:[],
        recordLogParams:{
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          state:1,
          type:1,
          secondLevelId:''
        },
        devLogParams:{
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          state:2,
          type:1,
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
        createrData:[],
        devLogList:[],
        devLogColums:[{
          title:'类型',
          key:'type'
        },{
          title:'时间',
          key:'date'
        },{
          title:'操作部门/人',
          key:'emp'
        },{
          title:'说明',
          key:'explain'
        },{
          title:'附件',
          key:'filepath'
        }],
        secondLevelData:[],
        addDevLogList:{
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          type:'',
          progress:0,
          explain:'',
          filePath:'fff',
          userName:'fff',
          taskId:1,
          subtaskId:1,
          addType:1
        },
        devLogRules:{
          type:[
            {required:true,message:'请填写项目类型',trigger:'blur'}
          ],
          explain:[
            {required:true,message:'请填写备注信息',trigger:'change'}
          ]
        }
    }    
  },
  created(){
      this.initDetailsData();
      this.initDeptData();
      this.initLogRecordList();
      this.initDevLogList();
  },
  methods:{
    initDetailsData(){
      // 获取id 和 proid
      const params = {
        id:this.$route.params.id,
        proId:this.$route.query.proId
      };
      getMyProjectDetails(params).then(res=>{
        this.devDetails = res.data.data[0];
        this.baseAndProList.protype= this.devDetails.projectInfo.protype;
        this.baseAndProList.proname= this.devDetails.projectInfo.proname;
        this.baseAndProList.prodeclare= this.devDetails.projectInfo.prodeclare;
        this.baseAndProList.proid= this.devDetails.projectInfo.proid;
        this.baseAndProList.createdate= this.devDetails.projectInfo.createdate;
        this.baseAndProList.creater= this.devDetails.projectInfo.creater;
        this.baseAndProList.prostate= this.devDetails.projectInfo.prostate;
        this.baseAndProList.planedate= this.devDetails.projectInfo.planedate;
        this.baseAndProList.betweendays= this.devDetails.projectInfo.betweendays;
      }).catch(err=>{

      })
    },
    ok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            groupHandle(this.partInParams).then(res=>{
              if(res.data.code==200){
                 this.initDetailsData();
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
      this.addmodaltitle = '添加参与组';
      this.partInParams.type=1;
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
      this.partInParams.eDate=date;
    },
    sdateChange(date){
      this.partInParams.sDate=date;
    },
    initLogRecordList(){
      getMyProjectDetailsLog(this.recordLogParams).then(res=>{
        this.logRecordList = res.data.data[0].logRecordList;
      }).catch(err=>{

      })
    },
    initDevLogList(){
      getMyProjectDetailsLog(this.devLogParams).then(res=>{
        this.devLogList = res.data.data[0].DevLogList;
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
          content: '<p>是否确认删除参与组？</p>',
          onOk: () => {
              groupHandle(params).then(res=>{
                let data = res.data;
                if(data.code == 200){
                  this.$Message.info(data.msg);
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
    addDevLogClick(){
      this.addlogshow = true;
    },
    logok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            addProDeveLog(this.addDevLogList).then(res=>{
              if(res.data.code==200){
                 this.initDevLogList();
                 this.$Message.success(res.data.msg);
              }else{
                 this.$Message.error(res.data.msg);
              }
              this.addlogshow=false;
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
    logcancel(name){

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

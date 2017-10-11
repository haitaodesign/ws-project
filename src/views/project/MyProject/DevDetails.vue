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
                    <li>项目类型：</li>
                    <li>项目标题：</li>
                    <li>项目概况：</li>
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
                    <li>项目编号：</li>
                    <li>创建时间：</span></li>
                    <li>发起人：</li>
                    <li>项目状态：</li>
                    <li>预计上线时间：</li>
                    <li>预计下线时间：</li>
                    <li>预计工期：</li>
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
                      <Col span="6" style="margin-top:10px;">
                        <Button type="primary">回复</Button>
                      </Col>
                    </Row>
                  </div>    
                </TabPane>
                <TabPane label="开发日志" name="1" style="padding:10px;">
                  <ul class='wrap'>
                    <li>项目类型：</li>
                    <li>项目标题：</li>
                    <li>项目概况：</li>
                  </ul>    
                </TabPane>
            </Tabs>
          </Card>
        </Col>
        <Col span="12" class="colmargin-top">
          <Card dis-hover >
             <Tabs class="home-push">
                <TabPane label="参与组" name="0" style="padding:10px;">
                    <Button type="primary" @click="addHandleClick">添加</Button>
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
  </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import { getMyProjectDetails } from '../../../api/myproject';
import { groupHandle } from '../../../api/myproject';
import { getMyProjectDetailsLog } from '../../../api/myproject';
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
          key:'taskname',
          width:100,
          render:(h,params)=>{
            const row = params.row;
            const routeparams ={
              name:'任务分配详情页',
              params:{
                proId:row.proid
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
            },row.taskname)
          }
        },{
          title:'组名称',
          key:'squadId',
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
          title:'任务状态',
          key:'taskstate',
          render:(h,params)=>{
            const taskstate = params.row.taskstate;
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
              return h('div', [
                  h('Button', {
                      props: {
                          type: 'primary',
                          size: 'small'
                      },
                      on: {
                          click: () => {
                            this.addshow=true;
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
                            console.log(params);
                            
                          }
                      }
                  }, '删除')
              ]);
          }
        }],
        devDetails:{
        },
        addshow:false,
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
        logParams:{
          id:this.$route.params.id,
          proId:this.$route.query.proId,
          state:1,
          type:0,
          secondLevelId:''
        },
        logRecordColumn:[{
          title:'类型',
          key:'type'
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
        createrData:[]
    }
    
  },
  created(){
      this.initDetailsData();
      this.initDeptData();
      this.initLogRecordList();
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
      }).catch(err=>{

      })
    },
    ok(name){
      this.$refs[name].validate((valid) => {
          if(valid){
            console.log(this.partInParams);
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
      this.partInParams.sDate=date;
    },
    sdateChange(date){
      this.partInParams.eDate=date;
    },
    initLogRecordList(){
      getMyProjectDetailsLog(this.logParams).then(res=>{
        this.logRecordList = res.data.data[0].logRecordList;
        console.log(this.logRecordList);
      }).catch(err=>{

      })
    },
    onclick(){
      
    },
    initCreaterData(){
      const params = {
        squadId:this.partInParams.squadId
      }
      getMembersBySquadId(params).then(res=>{
          this.createrData = res.data.data; 
          
      })

    },

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

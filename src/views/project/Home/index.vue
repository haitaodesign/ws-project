<template>
    <div>
        <PageTitle :BreadData="breadData"></PageTitle>
        <Tabs class="home-push">
            <TabPane label="项目推送" name="0" style="padding:10px;">
                <Row :gutter="20">
                    <Col span="4">
                        <Card>
                            <p slot="title" class="home-center">我申请的项目</p>
                            <div class="home-center">
                                <span>{{homeData.applyProject}}</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span="4"  >
                        <Card>
                            <p slot="title" class="home-center">我参与的项目</p>
                            <div class="home-center">
                                <span>{{homeData.applyProject}}</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span="4"  v-show="homeData.dutyName === 'CEO'">
                        <Card>
                            <p slot="title" class="home-center">立刻待审批</p>
                            <div class="home-center">
                                <span>{{homeData.applyProject}}</span>
                            </div>
                        </Card>
                    </Col>
                    <Col span="4"  v-show="homeData.dutyName === 'CEO'">
                        <Card>
                            <p slot="title" class="home-center">上线待审批</p>
                            <div class="home-center">
                                <span>{{homeData.applyProject}}</span>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
        <Tabs class="home-tip">
            <TabPane label="逾期提醒" name="0">
                <Row>
                    <!-- 每个表格一个Col -->
                    <Col >
                     <!--  项目列表渲染 -->
                        <Table border :columns="project" :data="this.homeData.infoList"></Table>
                    </Col>
                     <Col style='margin: 20px 0;'>
                     <!-- 任务渲染 -->
                        <Table border :columns="task" :data="this.homeData.taskList"></Table>
                    </Col>
                    <Col>
                    <!-- 子任务渲染 -->
                        <Table border :columns="subtask" :data="this.homeData.subtaskList"></Table>
                    </Col>
                </Row>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
import PageTitle from '../../components/PageTitle';
import { getHomeData } from '../../../api/requestdata';
export default {
    components: {
        PageTitle
    },
    data() {
        return {
            breadData: [{
                name: '首页',
                to: '/'
            }],
            homeData:[],
            // 项目列表渲染
            project: [{
                title: "项目名称",
                key: "proname"
            }, {
                title: '预计完成时间',
                key: "plansdate"
            }, {
                title: '负责人',
                key: "creater"
            }, {
                title: '进度',
                key: "proprogress"
            }, {
                title: "逾期时间",
                key: "betweenDays"
            }
            ],
            // 任务渲染
            task: [{
                title: "项目名称",
                key: "taskname"
            }, {
                title: '预计完成时间',
                key: "edate"
            }, {
                title: '负责人',
                key: "handler"
            }, {
                title: '进度',
                key: "taskprogress"
            }, {
                title: "逾期时间",
                key: "betweenDays"
            }
            ],
            // 子任务渲染
            subtask: [{
                title: "项目名称",
                key: "subtaskname"
            }, {
                title: '预计完成时间',
                key: "edate"
            }, {
                title: '负责人',
                key: "subtaskhandler"
            }, {
                title: '进度',
                key: "subtaskprogress"
            }, {
                title: "逾期时间",
                key: "betweenHours"
            }
            ],
        }
    },
    created() {
        getHomeData().then(res => {
            if (res.data.code == 200) {
                this.homeData = res.data.data[0];
                console.log(res.data)
            }
        })
        .catch(res=>{
            // 抛出异常跳入登录界面
            console.log(res);
        })
    }
}
</script>
<style scoped>
.home-push {
    margin-top: 10px;
}

.home-center {
    text-align: center;
}
</style>


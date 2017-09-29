<template>
    <div>
        <Row class="expand-row">
            
            <Col> 
                <span class="expand-key">活动:</span>
            </Col> 
            <Col span="24" v-for='item in row.proLogs' :key='item.index'>
                <span class="expand-value">{{ item.Emp }}</span>
                <span class="expand-value">{{ item.type }}</span>
            </Col>
        </Row>
    </div>
</template>

<style scoped>
.expand-row{
    margin-bottom: 16px;
}
</style>
<script>
export default {
    props: {
        row: Object
    }
};
</script>
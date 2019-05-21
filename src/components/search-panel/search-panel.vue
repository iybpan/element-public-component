<template>
    <el-form class="form">
        <div class="form-item" v-for="c of config">
            <span class="label">{{c.label}}</span>
            <template v-if="c.type === 'input'">
                <el-input v-model="form[c.name]" :placeholder="c.placeholder || ''"></el-input>
            </template>
            <template v-else-if="c.type === 'select'">
                <el-select v-model="form[c.name]" size="small" :placeholder="c.placeholder || ''">
                    <el-option
                            v-for="(item,index) in c.options"
                            :key="index.toString()"
                            :label="item.label"
                            :value="item.value">
                    </el-option>
                </el-select>
            </template>
        </div>
        <div class="form-item-btn">
            <!--<el-button @click="resetQuery">重置</el-button>-->
            <el-button @click="queryPersonData" :disabled="loading" type="primary">查询</el-button>
        </div>
    </el-form>
</template>

<script>

    export default {
        name: "search-panel",
        props: ['config', 'loading'],
        data() {
            return {
                form: {}
            }
        },
        created() {
            this.config.forEach(item => {
                this.$set(this.form, item.name, item.defaultValue || '');
            })
        },
        methods: {
            queryPersonData() {

            }
        }
    }
</script>

<style scoped>

</style>
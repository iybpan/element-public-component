<template>
  <el-form class="form-box">
    <div v-for="(c,index) of config"
         :key="index.toString()"
         class="form-item">
      <span v-if="c.label"
            class="label">{{ c.label }}</span>
      <template v-if="c.templateName">
        <slot :name="c.templateName"
              :item="c"/>
      </template>
      <template v-else-if="c.type === 'input'">
        <el-input v-model="form[c.name]"
                  size="small"
                  :placeholder="c.placeholder || ''"/>
      </template>
      <template v-else-if="c.type === 'select'">
        <el-select v-model="form[c.name]"
                   size="small"
                   :placeholder="c.placeholder || ''">
          <el-option v-for="(item,i) in c.options"
                     :key="i.toString()"
                     :label="item.label"
                     :value="item.value"/>
        </el-select>
      </template>
      <template v-else>
        <el-input v-model="form[c.name]"
                  size="small"
                  :placeholder="c.placeholder || ''"/>
      </template>
    </div>
    <div class="form-btn-box">
      <!--<el-button @click="resetQuery">重置</el-button>-->
      <el-button :disabled="loading"
                 type="primary"
                 size="small"
                 @click="queryPersonData">
        查询
      </el-button>
    </div>
  </el-form>
</template>

<script>

  export default {
    name: 'SearchPanel',
    props: {
      config: {
        type: Array,
        default: function () {
          return []
        }
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {}
      }
    },
    created() {
      this.config.forEach(item => {
        this.$set(this.form, item.name, item.defaultValue || '')
      })
    },
    methods: {
      queryPersonData() {

      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./search-panel";
</style>

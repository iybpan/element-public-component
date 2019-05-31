<template>
  <el-form :disabled="disabled"
           class="form-box">
    <div v-for="c of config"
         :key="c.name"
         :prop="c.name">
      <div v-show="isShow(c)"
           :style="{padding: padding}"
           class="form-item">
        <span v-if="c.label"
              :style="{width: c.labelWidth || labelWidth || null}"
              class="label">{{ c.label }}</span>
        <template v-if="c.templateName">
          <div :style="{width: c.width || width || null}">
            <slot :name="c.templateName"
                  :item="c"/>
          </div>
        </template>
        <template v-else-if="c.type === 'input'">
          <el-input v-model="form[c.name]"
                    size="small"
                    :style="{width: c.width || width || null}"
                    :placeholder="c.placeholder || ''"
                    @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'inputNumber'">
          <el-input-number v-model="form[c.name]"
                           :style="{width: c.width || width || null}"
                           :min="c.min === undefined ? 0 : c.min "
                           :max="c.max === undefined ? 10 : c.max"
                           :step="c.step === undefined ? 1 : c.step"
                           controls-position="right"
                           :controls="!!c.controls"
                           size="small"
                           @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'inputNumberRange'">
          <my-input-number-range v-model="form[c.name]"
                                 :style="{width: c.width || width || null}"
                                 :min="c.min === undefined ? 0 : c.min "
                                 :max="c.max === undefined ? 10 : c.max"
                                 :precision="c.precision"
                                 :start-placeholder="c.startPlaceholder"
                                 :end-placeholder="c.endPlaceholder"
                                 @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'select'">
          <el-select v-model="form[c.name]"
                     :style="{width: c.width || width || null}"
                     size="small"
                     :placeholder="c.placeholder || ''"
                     @change="formItemValueChangeFn(c.name)">
            <el-option v-for="(item,i) in c.options"
                       :key="i.toString()"
                       :label="item.label"
                       :value="item.value"/>
          </el-select>
        </template>
        <template v-else-if="c.type === 'cascader'">
          <el-cascader v-model="form[c.name]"
                       :style="{width: c.width || width || null}"
                       :options="c.options"
                       :props="c.props"
                       size="small"
                       @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'time'">
          <el-time-picker v-model="form[c.name]"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :picker-options="{selectableRange:c.selectableRange}"
                          :value-format="c.valueFormat || 'HH:mm:ss'"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'timeSelect'">
          <el-time-select v-model="form[c.name]"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :picker-options="{start: c.start, end: c.end, step: c.step, minTime: c.minTime, maxTime: c.maxTime}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'timeRange'">
          <el-time-picker v-model="form[c.name]"
                          size="small"
                          :style="{width: c.width || width || null}"
                          range-separator="至"
                          :is-range="true"
                          :start-placeholder="c.startPlaceholder"
                          :end-placeholder="c.endPlaceholder"
                          :value-format="c.valueFormat || 'HH:mm:ss'"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'date'">
          <el-date-picker v-model="form[c.name]"
                          type="date"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateWithShortcut'">
          <el-date-picker v-model="form[c.name]"
                          type="date"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate, shortcuts: c.shortcuts || defaultDateShortcut}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'month'">
          <el-date-picker v-model="form[c.name]"
                          type="month"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'year'">
          <el-date-picker v-model="form[c.name]"
                          type="year"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateRange'">
          <el-date-picker v-model="form[c.name]"
                          type="daterange"
                          size="small"
                          :style="{width: c.width || width || null}"
                          range-separator="至"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :start-placeholder="c.startPlaceholder"
                          :end-placeholder="c.endPlaceholder"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          :default-time="['00:00:00', '23:59:59']"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateRangeWithShortcut'">
          <el-date-picker v-model="form[c.name]"
                          type="daterange"
                          size="small"
                          :style="{width: c.width || width || null}"
                          align="right"
                          range-separator="至"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :start-placeholder="c.startPlaceholder"
                          :end-placeholder="c.endPlaceholder"
                          :picker-options="{disabledDate: c.disabledDate, shortcuts: c.shortcuts || defaultDateRangeShortcut}"
                          :placeholder="c.placeholder"
                          :default-time="['00:00:00', '23:59:59']"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateTime'">
          <el-date-picker v-model="form[c.name]"
                          type="datetime"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateTimeWithShortcut'">
          <el-date-picker v-model="form[c.name]"
                          type="datetime"
                          size="small"
                          :style="{width: c.width || width || null}"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :picker-options="{disabledDate: c.disabledDate, shortcuts: c.shortcuts || defaultDateShortcut}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateTimeRange'">
          <el-date-picker v-model="form[c.name]"
                          type="datetimerange"
                          size="small"
                          :style="{width: c.width || width || null}"
                          range-separator="至"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :start-placeholder="c.startPlaceholder"
                          :end-placeholder="c.endPlaceholder"
                          :picker-options="{disabledDate: c.disabledDate}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else-if="c.type === 'dateTimeRangeWithShortcut'">
          <el-date-picker v-model="form[c.name]"
                          type="datetimerange"
                          size="small"
                          :style="{width: c.width || width || null}"
                          align="right"
                          range-separator="至"
                          :format="c.format"
                          :value-format="c.valueFormat"
                          :start-placeholder="c.startPlaceholder"
                          :end-placeholder="c.endPlaceholder"
                          :picker-options="{disabledDate: c.disabledDate, shortcuts: c.shortcuts || defaultDateRangeShortcut}"
                          :placeholder="c.placeholder"
                          @change="formItemValueChangeFn(c.name)"/>
        </template>
        <template v-else>
          <el-input v-model="form[c.name]"
                    :placeholder="c.placeholder || ''"
                    size="small"
                    :style="{width: c.width || width || null}"
                    @change="formItemValueChangeFn(c.name)"/>
        </template>
      </div>
    </div>
    <div class="form-btn-box">
      <el-row :gutter="20" type="flex" justify="space-between">
        <el-col :span="10">
          <slot name="left"/>
        </el-col>
        <el-col :span="4">
          <div v-if="!hiddenAdvanceSearch">
            <span class="btn-box-fold"
                  @click="isAdvancedSearch = !isAdvancedSearch">
            <span> {{ isAdvancedSearch?'收起':'展开' }} </span>
            <i :class="isAdvancedSearch?'el-icon-arrow-up':'el-icon-arrow-down'"/>
            </span>
          </div>
        </el-col>
        <el-col :span="10">
          <slot name="right">
            <div class="btn-box">
              <el-button :loading="loading"
                         type="primary"
                         size="small"
                         @click="queryForm">
                查询
              </el-button>
              <el-button size="small"
                         @click="resetQuery()">
                重置
              </el-button>
            </div>
          </slot>
        </el-col>
      </el-row>
    </div>
  </el-form>
</template>

<script>

  import MyInputNumberRange from './my-input-number-range'

  export default {
    name: 'SearchPanel',
    components: {
      MyInputNumberRange
    },
    props: {
      config: {
        type: Array,
        default: function () {
          return []
        }
      },
      // 是否是高级搜索
      searchType: {
        type: Boolean,
        default: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      // 标签宽度
      labelWidth: {
        type: String,
        default: '100px'
      },
      // 搜索项宽度
      width: {
        type: String,
        default: '230px'
      },
      padding: {
        type: String,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 隐藏展开高级搜索
      hiddenAdvanceSearch: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        form: {},
        isAdvancedSearch: false,
        // 默认的日期快捷方式组
        defaultDateShortcut: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }],
        // 默认的日期区域快捷方式组
        defaultDateRangeShortcut: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      }
    },
    created() {
      this.isAdvancedSearch = !!this.searchType;
      this.config.forEach(item => {
        if (item.customized) {
          for (let c in item.customized) {
            item[c] = item[c] || item.customized[c];
          }
        }
        this.$set(this.form, item.name, item.defaultValue || '')
      })
    },
    methods: {
      // 是否展示项
      isShow(item) {
        if (item.isAdvancedSearch === undefined) {
          return true;
        }
        return !!item.isAdvancedSearch === this.isAdvancedSearch;
      },
      // 搜索按钮，根据当前所在的搜索类型，返回展示在页面的项的值
      queryForm() {
        const data = {};
        this.config.forEach((item) => {
          if (this.isShow(item)) {
            data[item.name] = this.form[item.name];
          }
        });
        this.$emit('formSubmit', data);
      },
      // 重置按钮，触发所有的项为默认值
      resetQuery() {
        this.config.forEach((item) => {
          if (this.isShow(item)) {
            this.form[item.name] = item.defaultValue || '';
          }
        });
        this.$emit('formReset');
      },
      // 触发每一项值修改的事件
      formItemValueChangeFn(name) {
        this.$emit('itemChange', {
          name,
          value: this.form[name]
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "./search-panel";
</style>

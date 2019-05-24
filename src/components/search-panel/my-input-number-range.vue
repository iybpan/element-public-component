<template>
  <div class="input-number-range">
    <el-input-number :value="number1"
                     :min="min"
                     :max="number1Max"
                     :precision="precision"
                     :controls="false"
                     :style="{width:'45%'}"
                     :placeholder="startPlaceholder"
                     size="small"
                     class="number-left"
                     @change="onNumber1Change"/>
    <div class="split">
      ~
    </div>
    <el-input-number :value="number2"
                     :min="number2Min"
                     :max="max"
                     :precision="precision"
                     :controls="false"
                     :style="{width:'45%'}"
                     :placeholder="endPlaceholder"
                     size="small"
                     class="number-right"
                     @change="onNumber2Change"/>
  </div>
</template>

<script>
  export default {
    name: 'MyInputNumberRange',
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: Array,
        default: function () {
          return []
        }
      },
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 0
      },
      // 数字小数点位数精度
      precision: {
        type: Number,
        default: 0
      },
      startPlaceholder: {
        type: String,
        default: ''
      },
      endPlaceholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {}
    },
    computed: {
      // 起始值为传入双向值的数组第一个值
      number1() {
        if (this.value) {
          if (Array.isArray(this.value)) {
            return this.value[0];
          }
          return ''
        }
        return '';
      },
      // 终止值为传入双向值的数组第二个值
      number2() {
        if (this.value) {
          if (Array.isArray(this.value)) {
            return this.value[1] || '';
          }
          return ''
        }
        return '';
      },
      // 左边数值的可允许最大值
      number1Max() {
        if (this.number2 !== undefined && this.number2 !== '') {
          return this.number2;
        }
        return this.max;
      },
      // 右边数值的可允许最小值
      number2Min() {
        if (this.number1 !== undefined && this.number1 !== '') {
          return this.number1;
        }
        return this.min;
      }
    },
    methods: {
      // 修改起始值的双向数据回调事件
      onNumber1Change(value) {
        this.$emit('change', [value, this.number2]);
      },
      // 修改终止值的双向数据回调事件
      onNumber2Change(value) {
        this.$emit('change', [this.number1, value]);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-number-range {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .split {
      width: 12%;
      text-align: center;
      height: 32px;
      line-height: 32px;
      border: 1px solid #DCDFE6;
      box-sizing: border-box;
      border-left: none;
      border-right: none;
      background: #fff;
      z-index: 10;
    }
  }

  .number-left /deep/ {
    .el-input__inner {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  }

  .number-right /deep/ {
    .el-input__inner {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

</style>

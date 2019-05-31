import Vue from 'vue'

// https://cn.vuejs.org/v2/guide/render-function.html
export default Vue.component('table-column-render', {
  functional: true,
  props: {
    // 表格配置项
    item: {
      type: Object,
      default: () => {
      }
    },
    // 渲染模板slot对象，内部包含已定义的模板
    scopedSlotsObj: {
      type: Object,
      default: () => {
      }
    }
  },
  render: (h, context) => renderColumnNode(h, context.props.item || {}, context)
})

// 渲染整个column节点
const renderColumnNode = function (h, item = {}, context) {
  // 判断是否需要添加筛选器
  let filterMethod = null;
  if (item.filters) {
    filterMethod = item.filterMethod || (() => true);
  }
  return h(
    'el-table-column',
    {
      props: {
        label: item.label,
        prop: item.prop,
        formatter: item.formatter,
        sortable: item.sortable ? 'custom' : false,
        width: item.width,
        minWidth: item.minWidth,
        filters: item.filters || null,
        filterPlacement: 'bottom-end',
        filterMethod: filterMethod
      },
      // 模板渲染
      scopedSlots: {
        'default': scope => {
          return renderDefaultSlotNode(h, item, context, scope);
        },
        'header': scope => {
          return h('span', {
            style: {
              display: 'inline-block',
              color: 'black'
            }
          }, renderHeaderSlotNode(h, item, context, scope));
        }
      }
    },
    renderChildrenNode(h, item, context)
  )
};

// 渲染header模板
const renderHeaderSlotNode = function (h, item, context, scope) {
  const scopedSlots = context.props.scopedSlotsObj;
  const slot = scopedSlots[item.labelTemplateName];
  // 若表格头有模板，则根据模板渲染表头
  if (slot) {
    return slot({
      ...scope
    });
  }
  // 否则直接展示表头标题
  return item.label
};

// 渲染单元格内容模板
const renderDefaultSlotNode = function (h, item, context, scope) {
  const scopedSlots = context.props.scopedSlotsObj;
  const slot = scopedSlots[item.propTemplateName];
  // 若表头存在分栏，则不处理
  if (item.columns) {
    return null;
  } else if (slot) {
    // 若表头存在内容模板，则根据传入的模板渲染内容
    return slot({
      ...scope
    });
  }
  // 否则根据字段名prop在数据列表中解析展示数据
  return resolveProp(scope.row, item)
};

// 递归渲染子column
const renderChildrenNode = function (h, item, context) {
  if (item.columns && item.columns.length) {
    return item.columns.map(column => {
      return renderColumnNode(h, column, context);
    })
  }
  return []
};

// 解析在表格展示单元格内容
function resolveProp(row, column) {
  if (column.formatter) {
    return column.formatter(row, column);
  }
  let key = column.prop;
  let arr;
  let data = row;
  try {
    arr = key.split('.');
    while (arr.length > 1) {
      data = data[arr.shift()];
    }
  } catch (e) {
    return '';
  }
  const result = data[arr[0]];
  if(typeof result === 'object'){
    return JSON.stringify(result);
  }
  return data[arr[0]];
}

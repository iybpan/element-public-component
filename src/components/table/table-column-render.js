import Vue from 'vue'

// https://cn.vuejs.org/v2/guide/render-function.html
export default Vue.component('table-column-render', {
  functional: true,
  props: {
    item: {
      type: Object,
      default: () => {
      }
    },
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
  return h(
    'el-table-column',
    {
      props: {
        label: item.label,
        prop: item.prop,
        formatter: item.formatter,
        sortable: item.sortable ? 'custom' : false,
        width: item.width
      },
      scopedSlots: {
        'default': scope => {
          return h('span', renderDefaultSlotNode(h, item, context, scope));
        },
        'header': scope => {
          return renderHeaderSlotNode(h, item, context, scope);
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
  if (slot) {
    return slot({
      ...scope
    });
  }
  return item.label
};

// 渲染单元格内容模板
const renderDefaultSlotNode = function (h, item, context, scope) {
  const scopedSlots = context.props.scopedSlotsObj;
  const slot = scopedSlots[item.propTemplateName];
  if (item.columns) {
    return null;
  } else if (slot) {
    return slot({
      ...scope
    });
  }
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
  return data[arr[0]];
}

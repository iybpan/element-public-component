以下为搜索面板的配置项说明

# 属性

|属性配置项|说明|默认值|
|---|---|---|
|width|统一设置每一个搜索项的宽度，若需要修改特定的搜索项的宽度，可以在config的该项中添加width配置|`230px`|
|labelWidth|统一设置每一个搜索项的标签宽度，若需要修改特定的搜索项的标签宽度，可以在config的该项中添加labelWidth配置|`100px`|
|padding|统一设置每一个搜索项的padding|`0 15px`|
|loading|搜索按钮的加载状态|`false`|
|disabled|每个搜索项都处于被禁用状态|`false`|
|hiddenAdvanceSearch|是否隐藏展开进行高级搜索按钮|`false`|
|config|搜索面板中的具体搜索项配置，详情看下表|`[]`|

## config

`config`的配置对象如下：

|参数|说明|类型|可选值|
|:---|:---|:---:| :---: |
|label|搜索项的标签名|string|自定义名称|
|templateName|搜索项自定义模板名称，具体看注意事项下表说明|string|自定义名称|
|type|搜索项的类型，若存在templateName时，将被忽略，具体看注意事项下表说明|string|`input`,`inputNumber`,`select`等|
|name|该项所对应的名称，用于绑定搜索项到该值上|string|自定义名称|
|defaultValue|该搜索项的默认值，type不同其值不同，具体可看注意事项中的`type`|string/Date/array|-|
|customized|根据搜索项类型type不同，该项可配置的值不同，具体看注意事项|object|-|
|labelWidth|可定制化配置每一个标签项的宽度|string|'100px'|
|width|可定制化配置每一个搜索项的宽度|string|'200px'|
|isAdvancedSearch|用于设置每一项是否是高级展开搜索时才展示，默认不设置是展开收起都显示；若true则只有展开才展示；false则收起简单搜索时才展示，展开不展示|boolean|true,false,undefined|


### 注意事项  
#### `templateName`

此项为搜索项自定义模板名称，若配置该项时，则type项的配置内容会被忽略，并且需要配置模板。
  
  配置代码如下：
  ```vue
  <template>
    <i-search-p :config="config">
      <template #myTemplate="{item}">
        <div>这里是自定义的模板内容，可编写任意代码</div>
      </template>
    </i-search-p>
  </template>
  
  export default {
    data(){
      return {
        config: [{
          name:'name',
          templateName:'myTemplate'
        }] 
      }
    }
  }
  ```
  
  其中，`myTemplate`的名字为自定义名称，该名称需要与`config`中设置`templateName`的内容一致，也就是在`config`配置项设置了`templateName`时，必须可以在模板中找到对应的模板。


#### `type`

搜索项的类型，若存在templateName时，将被忽略。

配置项内容如下：

|配置值|说明|对应其可设置的默认值`defaultValue`|
|---|---|---|
|`input`|文本输入框|`string`类型|
|`inputNumber`|数字选择|`number`类型|
|`select`|下拉选择框|对应其options中项的value|
|`time`|可任意时间选择|如：`'18:00:01'`|
|`timeSelect`|某个时间点下拉框选择|如：`'18:00'`|
|`timeRange`|时间区间段选择|如：`[new Date(), new Date()]`
|`date`|某一天的日期选择，尽量与设置的valueFormat一致|如：`'2018-11-11'`或`new Date()`
|`dateWithShortcut`|带有快捷项的某一天的日期选择，尽量与设置的valueFormat一致|如：`'2018-11-11'`或`new Date()`
|`dateRange`|日期区间段选择，尽量与设置的valueFormat一致|如：`[new Date(), new Date()]`
|`dateRangeWithShortcut`|带快捷项的日期区间段选择，尽量与设置的valueFormat一致|如：`[new Date(), new Date()]`
|`dateTime`|日期时间选择，尽量与设置的valueFormat一致|如：`'2011-10-09 00:00:00'`或`new Date()`
|`dateTimeWithShortcut`|带有快捷项的日期时间选择，尽量与设置的valueFormat一致|如：`'2011-10-09 00:00:00'`或`new Date()`
|`dateTimeRange`|日期时间区间段选择，尽量与设置的valueFormat一致|如：`[new Date(), new Date()]`
|`dateTimeRangeWithShortcut`|带有快捷项的日期时间区间段选择，尽量与设置的valueFormat一致|如：`[new Date(), new Date()]`
|`month`|某一月的月份选择，尽量与设置的valueFormat一致|如：`'2019-05'`或`new Date()`
|`year`|某一年的年份选择，尽量与设置的valueFormat一致|如：`'2006'`或`new Date()`

若上述情况不满足要求，可通过`templateName`来自定义模板实现。


#### `customized`

根据搜索项类型type不同，该项可配置的值不同

##### type为`select`  

|参数|说明|类型|实例|
|---|---|---|---|
|options|可选择的项|array|`[{label:'选项一',value:'option1'}]`|
  

##### type为`inputNumber`

|参数|说明|类型|实例|
|---|---|---|---|
|min|最小值|number|0|
|max|最大值|number|100|
|step|步数|number|1|
|controls|是否带控制按钮|boolean|false|
|precision|可带小数点位数|number|2|


##### type为`inputNumberRange`

|参数|说明|类型|实例|
|---|---|---|---|
|min|最小值|number|0|
|max|最大值|number|100|
|precision|可带小数点位数|number|2|
|startPlaceholder|数字范围起始的文字提示|string|`请输入`|
|endPlaceholder|数字范围结束的文字提示|string|`请输入`|


##### type为`cascader`

|参数|说明|类型|实例|
|---|---|---|---|
|options|可选项数据源，呈树型结构，键名可通过 props 属性配置|array|`[{label:'1',value:'1',children:[{label:'1-1',value:'1-1'}]}]`|
|props|配置选项|object|`{value:'value',label:'label',children:'children',disabled:'disabled'}`|


##### type为`time`

|参数|说明|类型|实例|
|---|---|---|---|
|valueFormat|点击搜索后所获取该选择项的值的格式，按照日期格式|string|`HH:mm:ss`|
|selectableRange|可选的时间段|string/array|`如'18:30:00 - 20:30:00'或者传入数组['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']`|


##### type为`timeSelect`

|参数|说明|类型|实例|
|---|---|---|---|
|start|可选的开始时间|string|`09:00`|
|end|可选的结束时间|string|`18:00`|
|step|时间在开始与结束时间的每一项的间隔时间|string|如，每30分钟为一项`00:30`|
|minTime|最小时间，小于该时间的时间段将被禁用|string|如8点前的时间不能选择`08:00`|
|maxTime|最大时间，大于该时间的时间段将被禁用|string|如8点后的时间不能选择`08:00`|


##### type为`timeRange`

|参数|说明|类型|实例|
|---|---|---|:---:|
|startPlaceholder|未选中时间提示|string|-|
|endPlaceholder|未选中时间提示|string|-|


##### type为`date`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|


##### type为`dateWithShortcut`

|参数|说明|类型|实例|
|---|---|---|:---:|
|shortcuts|时间快捷选项|array|`[{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}}]`|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|


##### type为`month`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|


##### type为`year`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|


##### type为`dateRange`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|
|startPlaceholder|未选中时间提示|string|-|
|endPlaceholder|未选中时间提示|string|-|


##### type为`dateRangeWithShortcut`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|
|startPlaceholder|未选中时间提示|string|-|
|endPlaceholder|未选中时间提示|string|-|
|shortcuts|时间快捷选项|array|`[{text: '最近一周',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}}]`|


##### type为`dateTime`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|


##### type为`dateTimeWithShortcut`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|
|shortcuts|时间快捷选项|array|`[{text: '今天',onClick(picker) {picker.$emit('pick', new Date());}}]`|


##### type为`dateTimeRange`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|
|startPlaceholder|未选中时间提示|string|-|
|endPlaceholder|未选中时间提示|string|-|


##### type为`dateTimeRangeWithShortcut`

|参数|说明|类型|实例|
|---|---|---|:---:|
|disabledDate|根据函数返回状态，设置日期禁用状态|Function|-|
|format|显示在输入框中的格式|string|-|
|valueFormat|绑定值的格式。不指定则绑定值为 Date 对象|string|-|
|startPlaceholder|未选中时间提示|string|-|
|endPlaceholder|未选中时间提示|string|-|
|shortcuts|时间快捷选项|array|`[{text: '最近一周',onClick(picker) {const end = new Date();const start = new Date();start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);picker.$emit('pick', [start, end]);}}]`|




# 事件

### itemChange
配置项中的内容修改时都会触发该事件，回调的事件参数为一个对象
```text
export default{
  methods:{
    onItemChange: function(obj) {
      // {name:'xxx', value:'xxxx'}
      console.log(obj);
    }
  }
}
```

### formSubmit
点击搜索后，触发回调事件，
```vue
export default{
  methods:{
    onFormSubmit: function(obj) {
      // 输出的是一个对象
      console.log(obj);
    }
  }
}
```




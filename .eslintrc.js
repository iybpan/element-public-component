// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'standard'
  ],  // required to lint *.vue files
  plugins: ['vue'],
  /*
     下面这些rules是用来设置从插件来的规范代码的规则，https://github.com/vuejs/eslint-plugin-vue/tree/master/docs/rules
      主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
      "off" -> 0 关闭规则
      "warn" -> 1 开启警告规则
      "error" -> 2 开启错误规则
    */
  rules: {
    "no-undef": 0, //不允许未声明的变量
    "no-unused-vars": [0, {"vars": "all", "args": "after-used"}], //不允许有声明后未使用的变量或者参数
    "no-tabs": 0, //不允许tabs

    "no-mixed-spaces-and-tabs": [0, "smart-tabs"], //不允许混用tab和空格
    "indent": [0, 4],//缩进风格
    "camelcase": [0, {"properties": "never"}], //强制驼峰命名规则
    "space-before-function-paren": [0, {"anonymous": "always", "named": "never"}], //函数定义时括号前的空格

    // 错误
    "comma-dangle": [2, "never"], // 对象字面量项尾不能有逗号
    "no-debugger": 2, // 禁止使用debugger
    "no-constant-condition": 2, // 禁止在条件中使用常量表达式 if(true) if(1)
    "no-dupe-args": 2, // 函数参数不能重复
    "no-dupe-keys": 2, // 在创建对象字面量时不允许键重复 {a:1,a:1}
    "no-duplicate-case": 2, // switch中的case标签不能重复
    "no-empty-character-class": 2, // 正则表达式中的[]内容不能为空
    "no-invalid-regexp": 2, // 禁止无效的正则表达式
    "no-func-assign": 2, // 禁止重复的函数声明
    "valid-typeof": 2,  // 必须使用合法的typeof的值
    "no-unreachable": 2, // 不能有无法执行的代码
    "no-unexpected-multiline": 2, // 避免多行表达式
    "no-sparse-arrays": 2, // 禁止稀疏数组， [1,,2]
    "no-shadow-restricted-names": 2, // 严格模式中规定的限制标识符不能作为声明时的变量名使用
    "no-cond-assign": 2, // 禁止在条件表达式中使用赋值语句
    "no-native-reassign": 2, // 不能重写native对象

    // 代码风格
    "no-else-return": 1, // 如果if语句里面有return,后面不能跟else语句
    "no-multi-spaces": 1, // 不能用多余的空格
    "key-spacing": [1, {  // 对象字面量中冒号的前后空格
      "beforeColon": false,
      "afterColon": true
    }],
    "block-scoped-var": 2, // 块语句中使用var
    "consistent-return": 2, // return 后面是否允许省略
    "accessor-pairs": 2, // 在对象中使用getter/setter
    "dot-location": [2, "property"], // 对象访问符的位置，换行的时候在行首还是行尾
    "no-lone-blocks": 2, // 禁止不必要的嵌套块
    "no-labels": 2, // 禁止标签声明
    "no-extend-native": 2, // 禁止扩展native对象
    "no-floating-decimal": 2, // 禁止省略浮点数中的0 .5 3.
    "no-loop-func": 2, // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    "no-new-func": 2,  // 禁止使用new Function
    "no-self-compare": 2, // 不能比较自身
    "no-sequences": 2, // 禁止使用逗号运算符
    "no-throw-literal": 2, // 禁止抛出字面量错误 throw "error";
    "no-return-assign": [2, "always"], // return 语句中不能有赋值表达式
    "no-redeclare": [2, {   // 禁止重复声明变量
      "builtinGlobals": true
    }],
    "no-unused-expressions": [2, {  // 禁止无用的表达式
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-useless-call": 2, // 禁止不必要的call和apply
    "no-useless-concat": 2,
    "no-void": 2, // 禁用void操作符
    "no-with": 2, // 禁用with
    "space-infix-ops": 2, // 中缀操作符周围要不要有空格
    "valid-jsdoc": [2, { // jsdoc规则
      "requireParamDescription": true,
      "requireReturnDescription": true
    }],
    "no-warning-comments": [2, {  // 不能有警告备注
      "terms": ["todo", "fixme", "any other term"],
      "location": "anywhere"
    }],
    "curly": 1, // 必须使用 if(){} 中的{}
    "semi": 0,

    // common js
    "no-duplicate-imports": 1,
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "never"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": {
        "max": 1,
        "allowFirstLine": true
      }
    }]
  }
}

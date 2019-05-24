import SearchPanel from './components/search-panel/search-panel'
import MyInputNumberRange from './components/search-panel/my-input-number-range'

const components = {
  PublicSearchPanel: SearchPanel,
  PublicInputNumberRange: MyInputNumberRange
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;

  Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
  });
};

// auto install 用于script标签引入
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
  ...components
};

export default API;

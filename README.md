# nodeblog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## 完整的basic-auth 加密形式
>Authorization:Basic base64(account:password)


## 安装依赖
### dependencies
* axios
* element-ui
* base64
* vue
* vue-router

### devDependencies
* babel-plugin-component -- 按需引入element-ui 组件

>配置文件：build > webpack.base.conf.js > 


### 使用本地图片资源列表渲染时，要放在static目录下
### 为路由添加transition动画界面抖动处理： transition标签添加mode先进后出或者先出后进
### v-html 识别\n \s
### 如何使用vuex 安装 -- 建立store -- main.js配置引入使用

## 页面
* 首页 -- /
* 注册 -- /register
* 登录 -- /login
* 详情 -- /detail
* 个人中心 -- /my
* 新建博客 -- /new

## bug
* 出现滚动条时页面的抖动 -- 在容器上添加规则 padding-left: calc(100vw - 100%);

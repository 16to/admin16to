/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
// 动态路由
const loadRoute = {
  path: path.join(__dirname, './routes/'),
  app: null,
  // 遍历目录
  listDir(dir) {
    const fileList = fs.readdirSync(dir, 'utf-8');
    for (let i = 0; i < fileList.length; i += i) {
      const stat = fs.lstatSync(dir + fileList[i]);
      // 是目录，需要继续
      if (stat.isDirectory()) {
        this.listDir(`${dir + fileList[i]}/`);
      } else {
        this.loadRoute(dir + fileList[i]);
      }
    }
  },
  // 加载路由
  loadRoute(routeFile) {
    const tmpFile = routeFile;
    const tmp = tmpFile.substring(0, tmpFile.lastIndexOf('.'));
    const route = require(tmp);
    console.log(route);
    // 在路由文件中定义了一个basePath变量，设置路由路径前缀
    if (route.basePath) {
      this.app.use(route.basePath, route);
    } else {
      this.app.use(route);
    }
  },
  // 初始化入口
  init(app, newPath) {
    if (!app) {
      console.error('系统主参数App未设置');
      return false;
    }
    this.app = app;
    this.path = newPath || this.path;
    this.listDir(this.path);
    return true;
  },
};

module.exports = loadRoute;

<!--
 * @Descripttion:
 * @Author: ganbowen
 * @Date: 2020-07-16 18:28:40
 * @LastEditors: ganbowen
 * @LastEditTime: 2020-07-17 14:56:45
-->

node + express 项目

```bash
node + express + Redis 初学实现项目

1. 全局安装 express-generator  npm install express-generator -g
2. express [项目名称] 生成项目
3. 使用Redis作为项目数据库
    brew install redis             # 安装Redis
    redis-server                   # 启动默认端口
4. 调试 DEBUG=express:* node ./bin/www

# Project architecture
-- bin                             # 启动入口文件
-- middleware                      # 自定义中间件文件
-- models                          # 数据模型
-- public                          # 静态资源文件
    -- images                      # 静态图片
    -- javascripts                 # 静态脚本
    -- stylesheets                 # 静态样式表
-- routes                          # 路由文件
    -- index                       # 入口文件
-- views                           # HTML模板
-- app.js                          # 服务中间件配置文件

```

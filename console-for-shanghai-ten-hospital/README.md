# 随访管理平台

## 开始

### 安装

```bash
yarn install
```

#### 开发环境

```bash
yarn run dev
```

### 静态部署

静态资源需要部署到服务器中，部署的目录为`/data/console/console-for-shanghai-ten-hospital`，同时需要添加用户权限`chmod 755 /data/console/console-for-shanghai-ten-hospital`以避免 `Nginx` 等服务无权限访问到目录。

测试环境
```bash
yarn run build:stage
```

生产环境
```bash
yarn run build:prod
```

### 脚本部署

#### 测试环境

目前在测试环境的服务器`/data/console/`目录已添加部署脚本，脚本名称为`deploy-console-for-shanghai-ten-hospital.sh`，脚本的内容主要进行测试环境静态资源部署。如果本机已配置和服务器的免密登录，直接在终端执行一下内容即可

```bash
ssh txtkeji-dev-console "/data/console/deploy-console-for-shanghai-ten-hospital.sh"
```

或者`ssh`登录到服务器，执行脚本命令

```bash
/data/console/deploy-console-for-shanghai-ten-hospital.sh
```

#### 正式环境

由于正式环境添加了`yunwei`用户，脚本调用`nginx -t`和`nginx -s reload`命令需要使用`root`权限。所以在正式环境的脚本执行之后需要自行登录到`root`用户，执行
```bash
# 查看脚本的配置是否有问题
nginx -t 
# 重加载配置文件
nginx -s reload
```

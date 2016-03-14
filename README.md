# nodeblog
myblog

第一步：安装express
npm install -g express  
npm install -g express-generator 

第二步：搭建项目
进入目录之后运行命令：express
或者用这个命令来创建：express -t ejs newsproject

第三步：增加ignore文件
touch .gitignore

第四步：运行
npm start

-------------------------
2016\1\28 
模版引擎使用ejs
前端框架使用react
启动程序使用nodemon

坑一：安装react之后，app.js中设置模版引擎之后发现依然不认识，所以要先安装node-jsx
坑二：安装node-jsx之后，还是报错，好吧，app.js中要在设置模版引擎之前加入代码：require("node-jsx").install({ extension: ".js" });
坑三：文件路径找不到。。。少了"/"

-------------------------
2016\1\29
启动程序使用gulp，so easy～
安装包："gulp"、"gulp-nodemon"
需要在根目录下新建gulpfile.js文件，然后新建gulp.task

############
做了error页的路由、将／routes/index.js ---> /routes/serverrouter.js
安装：
  browserify、vinyl-source-stream
静态资源的加载：app.use(express.static(path.join(__dirname, 'assets')));／／这里要设置好目录

为了实现isomophic、客户端事件，加入客户端路由（待完成）

-------------------------
2016\02\01
实现了客户端路由
坑一、jsx需要编译，transform(reactify)//jsx编译成正常的js
坑二、clientrouter中：var Testpage = require('../pages/testpage');//一定要大写啊亲～～～～～～～react对大小写是敏感的
坑三、react在0.14版本后有一些东西发生了变化，比如渲染，需要先安装react-dom，然后客户端需要引入var ReactDOM = require('react-dom'); －－－> ReactDOM.render(<Testpage />, reactBodyContainer);//客户端直接引入testpage，所以要用<>这种标签形式的写法
    而服务端的写法是引入：var ReactDOMServer = require('react-dom/server'); －－－> var reactHtml = ReactDOMServer.renderToString(testpage());//服务端引入js文件为：var testpage = React.createFactory(require('../pages/testpage'));有了factory，所以可以用testpage()这种写法


-------------------------
2016\02\02
用了老大（陈国兴）写的框架evoflux

哇塞哇塞，哥好牛(wu)逼(chi)啊，直接将同事姜卧龙的想法以及程序拷贝了过来，实现了发起请求的功能，标记以下几点使用注意事项：
  1、首先使用evoflux创建了apiaction、apistore用于发起客户端请求和用于注册客户端获取数据之后的处理方法注册；
  2、使用supperagent发起请求，客户端发请求的url一定是"/api"开头，然后将请求抛给服务器；
  3、建立用于接收客户端发送过来请求的路由：/routes/api.js，同样适用apiaction发起请求(这里通过设置不同的global.ajaxSet实现不同的跳转)，然后将返回的数据通过res.json(body)返回给客户端；
  4、客户端接收到数据之后根据注册的方法，然后通过url来区分之后的处理逻辑。

好处:
  发起请求的路径有了统一的保存地方: ./config/config.js
  不用每个action都要写一个文件
  不用每个store都要写一个文件
  不用每个服务端接收的路由都要写一个方法
  客户端和服务端共用action
  代码及其简单
坏处：
  智商低的理解起来很费劲啊，比如我。。。。。。

ps：明天晚上就要出发回家过年了，感觉心要飞了，呵呵呵～～～

TODO: 解决每次修改之后保存文件，然后gulp监听change、restart的死循环问题，简单来说就是在不停的掉gulp的task


-------------------------
2016\02\03
gulp.task('s', function(){
  nodemon({
    script:'./bin/www',
    ignore: ['./assets/']//添加这句话就可以解决不停的重启问题啦啦啦啦啦～～～～
  })
  .on('start',['packagejs'])
  .on('change',['packagejs'])
  .on('restart',['packagejs'])
})












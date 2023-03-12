const koa = require('koa'),
  route = require('koa-route'),
  websockify = require('koa-websocket'),
  http = require('http'),
  app = websockify(new koa());
 
app.ws.use(route.all('/', ctx => {
 // websocket作为“ctx.websocket”添加到上下文中。
 ctx.websocket.on('message', message => {
  startrequest(message, ctx);
 });
}));
 
function startrequest(message, ctx) {
 // 采用http模块向服务器发起一次get请求  
 http.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encodeuri(message)}`, res => {
  // 防止中文乱码
  res.setencoding('utf-8');
  // 监听data事件，每次取一块数据
  res.on('data', chunk => {
   ctx.websocket.send(json.parse(chunk).content);
  });
 }).on('error', err => {
  ctx.websocket.send('对不起，网络故障了');
 });}
 
// 监听端口、启动程序
app.listen(3000, err => {
 if (err) throw err;
 console.log('websocket服务器启动在3000端口');
})
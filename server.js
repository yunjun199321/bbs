// const koa = require('koa'),
//   route = require('koa-route'),
//   websockify = require('koa-websocket'),
//   http = require('http'),
//   app = websockify(new koa());

// app.ws.use(route.all('/', ctx => {
//  // websocket作为“ctx.websocket”添加到上下文中。
//  ctx.websocket.on('message', message => {
//   startrequest(message, ctx);
//  });
// }));

// function startrequest(message, ctx) {
//  // 采用http模块向服务器发起一次get请求  
//  http.get(`http://api.qingyunke.com/api.php?key=free&appid=0&msg=${encodeuri(message)}`, res => {
//   // 防止中文乱码
//   res.setencoding('utf-8');
//   // 监听data事件，每次取一块数据
//   res.on('data', chunk => {
//    ctx.websocket.send(json.parse(chunk).content);
//   });
//  }).on('error', err => {
//   ctx.websocket.send('对不起，网络故障了');
//  });}

// // 监听端口、启动程序
// app.listen(3000, err => {
//  if (err) throw err;
//  console.log('websocket服务器启动在3000端口');
// })

const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;
const wss = new WebSocketServer({
    port: 3000
});

wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.send('Welcome! 我是智能导游，能帮你回答香港旅游相关问题。我支持多种语言。');
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        ws.send('Got your message: ' + message);

        // ChatGPT code
        // const { Configuration, OpenAIApi } = require("openai");

        // const configuration = new Configuration({
        //     apiKey: "rrs3SgvHdH8iGgUIdlwPT3BlbkFJ7t6lkIrRdviNEU0KrXNw",
        // });
        // const openai = new OpenAIApi(configuration);

        // const completion = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages: [{ role: "user", content: "Hello world" }],
        // });
        // console.log(completion.data.choices[0].message);

        setTimeout(() => {
            ws.send(`What's your name?`, (err) => {
                if (err) {
                    console.log(`[SERVER] error: ${err}`);
                }
            });
        }, 1000);
    })
});

console.log('ws server started at port 3000...');
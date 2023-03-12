let submit = document.getelementbyid("submit"),
 pl = document.getelementbyid("pl");
// 很重要 必须写，判断浏览器是否支持websocket
let createwebsocket = (() => {
 return (urlvalue) => {
  if (window.websocket) return new websocket(urlvalue);
  if (window.mozwebsocket) return new mozwebsocket(urlvalue);
  return false;
 }
})()
// 实例化websoscket websocket有两种协议ws(不加密)和wss(加密)
let websocket = createwebsocket(`ws://127.0.0.1:3000`);
websocket.onopen = evt => {
 addmsg(1, '你好，欢迎进入实时聊天室！')
}
websocket.onmessage = evt => {
 // 这是服务端返回的数据
 addmsg(1, evt.data);
 submit.innerhtml = '发送';
}
// input事件发送数据
submit.onclick = (e) => {
 if (e.target.innerhtml == '回复中...') {
  return false
 }
 e.target.innerhtml = '回复中...';
 const str = document.getelementbyid("pl").value;
 websocket.send(str);
 addmsg(2, str);
}
// 绑定回车事件
function keyenter() {
 if (event.keycode == 13) {
  document.getelementbyid("submit").click();
 }
}
// 添加消息
function addmsg(type, msg) {
 let li = document.createelement('li');
 // 1机器人/2自己
 if (type == 1) {
  li.classlist.add('computer-say');
  li.innerhtml = `<span class="sayman">机器人</span><span class="computer say">${msg}</span>`;
 } else {
  li.classlist.add('my-say');
  li.innerhtml = `<span class="computer say">${msg}</span><span class="sayman">我</span>`;
  pl.value = '';
 }
 document.getelementbyid('view').appendchild(li);
 document.getelementbyid('ulview').scrollto(0, document.getelementbyid('view').clientheight);
}